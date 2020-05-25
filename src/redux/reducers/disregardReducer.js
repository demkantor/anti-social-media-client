import { combineReducers } from 'redux';


// stores all disregards
const allDisregards = (state = [], action) => {
    switch (action.type) {
        case 'SET_ALL_DISREGARDS':
            return state = action.payload;
        default:
            return state;
    }
};

// stores single disregard
const singleDisregard = (state = {}, action) => {
    switch (action.type) {
        case 'SET_THIS_DISREGARD':
            return state = action.payload;
        default:
            return state;
    }
};

export default combineReducers({
    allDisregards,
    singleDisregard
});
