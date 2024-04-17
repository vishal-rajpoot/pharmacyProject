export const reducer = (state, action) => {
    if (action.type === "GET_CHAT_USER") {
        return {
            ...state, chatuser: action.payload
        };
    }
    return state;
};

