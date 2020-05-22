import { combineReducers } from 'redux';

const initialState = {
    authenticated: false,
    credentials: {},
    likes: [],
    notifications: []
};


// stores logged in user
const currentUser = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return { authenticated: true, ...action.payload };
        case 'SET_AUTHENTICATED':
            return { ...state, authenticated: true };
        case 'UNSET_USER':
            return initialState;
        default:
            return state;
    };
};


// stores logged in user's token
const token = (state = '', action) => {
    switch (action.type) {
        case 'SET_TOKEN':
            return state = action.payload;
        case 'UNSET_TOKEN':
            return state = '';
        default:
            return state;
    };
};


export default combineReducers({
    currentUser,
    token
});