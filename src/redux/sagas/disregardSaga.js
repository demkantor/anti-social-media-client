import axios from 'axios'
import { takeEvery, put } from "redux-saga/effects";

// these sagas take the dispatch and runs them before they get to the reducers
function* disregardSaga() {
    yield takeEvery('GET_ALL_DISREGARDS', getAllDisregards);
    yield takeEvery('RESPECT_DISREGARD', respectDisregard);
    yield takeEvery('DISRESPECT_DISREGARD', disrespectDisregard);
    yield takeEvery('DELETE_DISREGARD', deleteDisregard);
    yield takeEvery('POST_DISREGARD', postDisregard);
};


// gets all disregards from firebase db
function* getAllDisregards(){
    yield put({ type: 'LOADING_UI' });
    console.log("We are here in saga GET all disregards");
    const allDisregards = yield axios.get(`/disregards`);
    console.log('in saga - all disregards GET back with:', allDisregards.data);
    yield put({ type: 'SET_ALL_DISREGARDS', payload: allDisregards.data });
    yield put({ type: 'STOP_LOADING_UI' });
};

// send plus one respect to a disregard
function* respectDisregard(respect) {
    console.log('in respect disregard saga', respect.payload);
    yield put({ type: 'LOADING_UI' });
    try {
        yield axios.get(`/disregards/${respect.payload}/respect`);
        yield put({ type: 'GET_ALL_DISREGARDS' });
        yield put({ type: 'GET_THIS_USER' });
    } catch (error) {
        console.log('Error with respect disregard:', error);
        yield put({ type: 'STOP_LOADING_UI' });
    }
};

// sends minus one respect to a disregard
function* disrespectDisregard(respect) {
    console.log('in disrespect disregard saga', respect.payload);
    yield put({ type: 'LOADING_UI' });
    try {
        yield axios.get(`/disregards/${respect.payload}/disrespect`);
        yield put({ type: 'GET_ALL_DISREGARDS' });
        yield put({ type: 'GET_THIS_USER' });
    } catch (error) {
        console.log('Error with disrespect disregard:', error);
        yield put({ type: 'STOP_LOADING_UI' });
    }
};

// posts a new disregard to firebase
function* postDisregard(dis) {
    console.log('in POST new disregard saga', dis);
    yield put({ type: 'LOADING_UI' });
    try {
        yield axios.post('/disregards', dis.payload);
        yield put({ type: 'GET_ALL_DISREGARDS' });
        yield put({ type: 'GET_THIS_USER' });
    } catch (error) {
        console.log('Error with POST disregard:', error);
        yield put({ type: 'STOP_LOADING_UI' });
    }
};

// remove a disregard
function* deleteDisregard(remove) {
    console.log("in saga disregard DELETE with: ", remove.payload);
    try {
        yield axios.delete(`/disregards/${remove.payload}/`);
        yield put({ type: 'GET_ALL_DISREGARDS' });
        yield put({ type: 'GET_THIS_USER' });
    } catch(error){
        console.log(error);
    }
};


export default disregardSaga;
