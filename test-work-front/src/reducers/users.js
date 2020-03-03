const initialState = {
    isLogged: false,
    username: null,
    id: null,
    myPosts: []
};
export default function users(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_LOGIN_SUCCESS':
            return {
                ...state,
                isLogged: true,
                username: action.username,
                id: action.id
            };

        case 'FETCH_LOGOUT_SUCCESS':
            return {
                ...state,
                isLogged: false,
                username: null,
                id: null
            };

        default:
            return state
    }
}