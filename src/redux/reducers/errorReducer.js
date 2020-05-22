import { combineReducers } from 'redux';

// holds the string that will display on the login screen if there's an error
const loginMessage = (state = '', action) => {
    switch (action.type) {
        case 'CLEAR_LOGIN_ERROR':
            return '';
        case 'LOGIN_INPUT_ERROR':
            return { general: 'Enter valid email and password!' };
        case 'LOGIN_FAILED':
            return action.payload;
        case 'LOGIN_FAILED_NO_CODE':
            return 'Oops! Something went wrong! Is the server running?';
        default:
            return state;
    };
};

// holds the string that will display on the registration screen if there's an error
const registrationMessage = (state = '', action) => {
    switch (action.type) {
        case 'CLEAR_REGISTRATION_ERROR':
            return '';
        case 'REGISTRATION_INPUT_ERROR':
            return { general: 'Please fill out all fields!' };
        case 'REGISTRATION_FAILED_EMAIL':
            return { email: 'Oops! The email is already in use!' };
        case 'REGISTRATION_FAILED':
            return action.payload;
        default:
            return state;
    };
};

// holds the string that will display on the registration screen if there's an error
const ui = (state = { loading: false }, action) => {
    switch (action.type) {
        case 'LOADING_UI':
            return state = { loading: true };
        case 'STOP_LOADING_UI':
            return state = { loading: false };
        default:
            return state;
    };
};


export default combineReducers({
  loginMessage,
  registrationMessage,
  ui
});