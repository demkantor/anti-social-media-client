import axios from 'axios'
import { takeEvery, put } from "redux-saga/effects";

// these sagas take the dispatch and runs them before they get to the reducers
function* userSaga() {
    yield takeEvery('LOGIN_USER', loginUser);
   
}

// gets all disregards from firebase db
function* loginUser(user){
    console.log("We are here in saga login user POST");
    const loginIn = yield axios.post(`/login`, { email: user.payload.email, password: user.payload.password });
    console.log('in saga - all disregards GET back with:', loginIn.data);
    yield put({ type: 'SET_USER', payload: loginIn.data });
}






export default userSaga;