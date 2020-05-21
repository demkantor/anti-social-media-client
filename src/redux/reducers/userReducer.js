import { combineReducers } from 'redux';

// stores logged in user
const currentUser = (state = {}, action) => {
    switch (action.type) {
        case 'SET_USER':
            return state = action.payload;
        default:
            return state;
    }
};




export default combineReducers({
    currentUser,

});