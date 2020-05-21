import { combineReducers } from 'redux';
import disregards from './disregardReducer';
import user from './userReducer';




const rootReducer = combineReducers({
    disregards,
    user,
});
  
export default rootReducer;
