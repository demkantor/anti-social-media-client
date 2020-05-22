import axios from 'axios'
import { takeEvery, put } from "redux-saga/effects";

// these sagas take the dispatch and runs them before they get to the reducers
function* userSaga() {
    yield takeEvery('LOGIN_USER', loginUser);
    yield takeEvery('LOGOUT', logoutUser);
   
};

function* loginUser(user) {
    // console.log('in user login with ', user);
    try {
        yield put({ type: 'CLEAR_LOGIN_ERROR' });
        const loginIn = yield axios.post(`/login`, { email: user.payload.email, password: user.payload.password });
        yield put({ type: 'SET_USER', payload: loginIn.data });
        user.history.push('/');
    } catch (error) {
        console.log('Error with user login:', error);
        if (error) {
            yield put({ type: 'LOGIN_FAILED', payload: error.response.data });
        } else {
            yield put({ type: 'LOGIN_FAILED_NO_CODE' });
        }
    }
};

function* logoutUser() {
    try {
        // yield axios.post('/logout');
        yield put({ type: 'UNSET_USER' });
    } catch (error) {
      console.log('Error with user logout:', error);
    }
};



export default userSaga;