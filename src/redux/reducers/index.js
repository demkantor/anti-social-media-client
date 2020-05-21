import { combineReducers } from 'redux';
import disregards from './disregardReducer';




const rootReducer = combineReducers({
    disregards,
});
  
export default rootReducer;
