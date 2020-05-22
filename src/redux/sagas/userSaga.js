import axios from 'axios'
import { takeEvery, takeLatest, put } from "redux-saga/effects";





// these sagas take the dispatch and runs them before they get to the reducers
function* userSaga() {
    yield takeEvery('LOGIN_USER', loginUser);
    yield takeEvery('LOGOUT', logoutUser);
    yield takeLatest('REGISTER_USER', registerUser);
    yield takeEvery('GET_THIS_USER', getThisUser);
   
};

function* loginUser(user) {
    // console.log('in user login with ', user);
    try {
        yield put({ type: 'CLEAR_LOGIN_ERROR' });
        const loginIn = yield axios.post(`/login`, { email: user.payload.email, password: user.payload.password });
        yield put({ type: 'SET_TOKEN', payload: loginIn.data.token });
        setAuthorizationHeader(loginIn.data.token);
        yield put({ type: 'GET_THIS_USER' });
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
        delete axios.defaults.headers.common['Authorization'];
        yield put({ type: 'UNSET_TOKEN' });
        yield put({ type: 'UNSET_USER' });
        localStorage.removeItem('FBIdToken');
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
};

//gets the current user info from firebase
function* getThisUser(user){
    yield put({ type: 'LOADING_UI' });
    console.log("We are here in user GET info saga", user.payload);
    // const thisUser = yield axios.get(`/user/${user.payload}`);
    const thisUser = yield axios.get(`/user`);
    console.log('in saga - this user GET back with:', thisUser.data);
    yield put({ type: 'SET_USER', payload: thisUser.data });
    yield put({ type: 'STOP_LOADING_UI' });
};

// holds current user's firebase token to be used in api headers
const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
};

export default userSaga;
