import { all } from 'redux-saga/effects';
import disregardSaga from './disregardSaga';



export default function* rootSaga() {
    yield all([
      disregardSaga(),

    ]);
};
