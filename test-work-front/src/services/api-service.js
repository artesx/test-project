import store from '../store';
import { logout, login } from '../actions';

export default class ApiService {
    _baseApi = process.env.REACT_APP_BASE_API;

    getResource = async (url, options) => {
        const init = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': localStorage.accessToken
            },
        };
        const response = await fetch(this._baseApi + url, init);
        const result = await response.json();

        if (result.errors && result.errors.message === 'jwt expired') {
            const refreshResponse = await this.getResource('/user/refresh', {
                ...init,
                method: 'PUT',
                body: JSON.stringify({ refreshToken: localStorage.refreshToken })
            });

            if (refreshResponse.errors && refreshResponse.errors.refreshToken === 'not found') {
                return store.dispatch(logout());
            }
            if (refreshResponse.accessToken) {
                const { username, _id, accessToken, refreshToken } = refreshResponse;
                store.dispatch(login(username, _id, accessToken, refreshToken));
                const newInit = {
                    ...options,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': localStorage.accessToken
                    },
                };
                const response = await fetch(this._baseApi + url, newInit);
                return await response.json();
            }
        }

        return result;
    };

    getPosts = async (author = false) => {
        const options = {
            method: 'GET'
        };

        return await this.getResource(author ? `/post?author=${author}` : '/post', options);
    };

    getPost = async (id) => {
        const options = {
            method: 'GET'
        };

        return await this.getResource(`/post/${id}`, options);
    };

    register = async (username, password) => {
        const options = {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            })
        };
        return await this.getResource('/user', options);
    };

    addPost = async (userId, title, text) => {
        const options = {
            method: 'POST',
            body: JSON.stringify({
                userId,
                title,
                text
            })
        };

        return await this.getResource('/post', options);
    };

    updatePost = async (postId, title, text) => {
        const options = {
            method: 'PUT',
            body: JSON.stringify({
                title,
                text
            })
        };
        return await this.getResource(`/post/${postId}`, options);
    };

    deletePost = async postId => {
        const options = {
            method: 'DELETE',
        };
        return await this.getResource(`/post/${postId}`, options);
    };

    login = async (username, password) => {
        const options = {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            })
        };
        return await this.getResource('/user/login', options);
    }

    addComment = async (postId, text) => {
        const options = {
            method: 'POST',
            body: JSON.stringify({
                text,
                postId
            })
        };

        return await this.getResource('/post/add-comment', options);
    };

}