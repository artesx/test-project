const login = (username, id, accessToken, refreshToken) => {
    localStorage.accessToken = accessToken;
    localStorage.refreshToken = refreshToken;
    localStorage.id = id;
    localStorage.username = username;

    return {
        type: 'FETCH_LOGIN_SUCCESS',
        username,
        id
    }
};

const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('id');
    localStorage.removeItem('username');
    return {
        type: 'FETCH_LOGOUT_SUCCESS',
        username: null,
        id: null
    }
};

const openNotify = payload => {
    return {
        type: 'OPEN_NOTIFY',
        payload: payload
    }
};

const closeNotify = () => {
    return {
        type: 'CLOSE_NOTIFY',
    }
};


export {
    login,
    logout,
    openNotify,
    closeNotify
}