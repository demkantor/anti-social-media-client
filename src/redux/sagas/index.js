import { all } from 'redux-saga/effects';
import disregardSaga from './disregardSaga';
import userSaga from './userSaga';



export default function* rootSaga() {
    yield all([
      disregardSaga(),
      userSaga(),

    ]);
};
