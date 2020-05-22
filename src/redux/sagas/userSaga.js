import axios from 'axios'
import { takeEvery, takeLatest, put } from "redux-saga/effects";

// these sagas take the dispatch and runs them before they get to the reducers
function* userSaga() {
    yield takeEvery('LOGIN_USER', loginUser);
    yield takeEvery('LOGOUT', logoutUser);
    yield takeLatest('REGISTER_USER', registerUser);
   
};

function* loginUser(user) {
    // console.log('in user login with ', user);
    try {
        yield put({ type: 'CLEAR_LOGIN_ERROR' });
        const loginIn = yield axios.post(`/login`, { email: user.payload.email, password: user.payload.password });
        yield put({ type: 'SET_USER', payload: loginIn.data });
        localStorage.setItem('FBIdToken', `Bearer ${loginIn.data.token}`);
        user.history.push('/');
    } catch (error) {
        console.log('Error with user login:', error);
        if (error.response.data) {
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

function* registerUser(action) {
    console.log('in register new user saga', action)
    try {
        const history = action.history
        yield put({ type: 'CLEAR_REGISTRATION_ERROR' });
        yield axios.post('/signup', 
            { email: action.payload.email, password: action.payload.password, 
            confirmPassword: action.payload.confirmPassword, handle: action.payload.handle });
        // automatically log a user in after registration
        yield put({ type: 'LOGIN_USER', payload: action.payload, history });
    } catch (error) {
        console.log('Error with user registration:', error);
        if (error.response.data) {
            yield put({ type: 'REGISTRATION_FAILED', payload: error.response.data });
        } else {
            yield put({ type: 'REGISTRATION_FAILED_EMAIL' });
        }
    }
  }


export default userSaga;