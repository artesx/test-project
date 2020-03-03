const initialState = {
    text: "",
    open: false
};
export default function notify(state = initialState, action) {
    switch (action.type) {
        case 'OPEN_NOTIFY':
            return {
                ...state,
                text: action.payload.text,
                open: true,
                type: action.payload.type
            };

        case 'CLOSE_NOTIFY':
            return {
                ...state,
                text: "",
                open: false
            };

        default:
            return state
    }
}