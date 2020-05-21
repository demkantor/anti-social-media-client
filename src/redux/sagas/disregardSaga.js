import axios from 'axios'
import {takeEvery, put} from "redux-saga/effects";

// these sagas take the dispatch and runs them before they get to the reducers
function* disregardSaga() {
    yield takeEvery('GET_ALL_DISREGARDS', getAllDisregards);
   
}

// gets all disregards from firebase db
function* getAllDisregards(){
    console.log("We are here in saga GET all disregards");
    const allDisregards = yield axios.get(`/disregards`);
    console.log('in saga - all disregards GET back with:', allDisregards.data);
    yield put({ type: 'SET_ALL_DISREGARDS', payload: allDisregards.data });
}






export default disregardSaga;
