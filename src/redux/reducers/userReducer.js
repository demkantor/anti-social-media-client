import { combineReducers } from 'redux';

// stores logged in user
const currentUser = (state = {}, action) => {
    switch (action.type) {
        case 'SET_USER':
            return action.payload;
        case 'UNSET_USER':
            return {};
        default:
            return state;
    };
};




export default combineReducers({
    currentUser,

});