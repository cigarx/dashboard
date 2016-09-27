import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { versionData, summarlData, lineData, toptenData } from '../services/chartdata';
import { message } from 'antd';

const parseQuery = (query) => {
  let queryStr = '';
  if (query && query.date) {
    queryStr += `&query=${query.date}`
  }
  if (query && query.type) {
    if (query.type !== 'all') {
      queryStr += `&type=${query.type}`
    }
  }
  if (query && query.order) {
    queryStr += `&order=${query.order}`
  }
  return queryStr;
}


function* getTopTenData(...args) {
  const query = args[0].query;
  try {
    const { jsonResult } = yield call(toptenData, parseQuery(query));
    if (jsonResult.success) {
      yield put({
        type: 'chart/get/toptenData/success',
        payload: jsonResult.data,
      });
    }
  } catch (err) {
    message.error(err);
    //yield put({
    //  type: 'todos/get/failed',
    //  err,
    //});
  }
}

function* getVersionData(...args) {
  const query = args[0].query;
  try {
    const { jsonResult } = yield call(versionData, parseQuery(query));
    if (jsonResult.success) {
      yield put({
        type: 'chart/get/versionData/success',
        payload: jsonResult.data,
      });
    }
  } catch (err) {
    message.error(err);
    //yield put({
    //  type: 'todos/get/failed',
    //  err,
    //});
  }
}

function* getSummarlData(...args) {
  const query = args[0].query;
  try {
    const { jsonResult } = yield call(summarlData, parseQuery(query));
    if (jsonResult.success) {
      yield put({
        type: 'chart/get/summarlData/success',
        nowdata: jsonResult.nowdata,
        predata: jsonResult.predata,
      });
    }
  } catch (err) {
    message.error(err);
    //yield put({
    //  type: 'todos/get/failed',
    //  err,
    //});
  }
}

function* getLineData(...args) {
  const query = args[0].query;
  try {
    const { jsonResult } = yield call(lineData, parseQuery(query));
    if (jsonResult.success) {
      yield put({
        type: 'chart/get/linedata/success',
        payload: jsonResult.data,
      });
    }
  } catch (err) {
    message.error(err);
    //yield put({
    //  type: 'todos/get/failed',
    //  err,
    //});
  }
}


function* watchVersionData() {
  yield takeLatest('chart/get/versionData', getVersionData)
}

function* watchLineData() {
  yield takeLatest('chart/get/linedata', getLineData)
}

function* watchSummarlData() {
  yield takeLatest('chart/get/summarlData', getSummarlData)
}

function* watchTopTenData() {
  yield takeLatest('chart/get/toptenData', getTopTenData)
}


export default function*() {
  yield fork(watchVersionData);
  yield fork(watchSummarlData);
  yield fork(watchLineData);
  yield fork(watchTopTenData);

  yield put({
    type: 'chart/get/summarlData',
  });
  yield put({
    type: 'chart/get/linedata',
  });
  yield put({
    type: 'chart/get/versionData',
  });

  yield put({
    type: 'chart/get/toptenData',
  });
}
