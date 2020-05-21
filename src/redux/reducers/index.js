import { combineReducers } from 'redux';
import disregards from './disregardReducer';
import user from './userReducer';
import errors from './errorReducer';




const rootReducer = combineReducers({
    disregards,
    user,
    errors,
    
});
  
export default rootReducer;
