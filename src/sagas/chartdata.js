import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { versionData, summarlData, lineData, toptenData } from '../services/chartdata';
import { message } from 'antd';

function* getTopTenData(...args) {
  const query = args[0].query;
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

  try {
    const { jsonResult } = yield call(toptenData, queryStr);
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

  try {
    const { jsonResult } = yield call(versionData, queryStr);
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
  let queryStr = '';
  if (query && query.date) {
    queryStr += `&query=${query.date}`
  }
  if (query && query.type) {
    if (query.type !== 'all') {
      queryStr += `&type=${query.type}`
    }
  }

  try {
    const { jsonResult } = yield call(summarlData, queryStr);
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
  let queryStr = '';
  if (query && query.date) {
    queryStr += `&query=${query.date}`
  }
  if (query && query.type) {
    if (query.type !== 'all') {
      queryStr += `&type=${query.type}`
    }
  }
  try {
    const { jsonResult } = yield call(lineData, queryStr);
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
