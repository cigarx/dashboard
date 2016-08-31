import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { getMapdata,installByIndustry,buyforIndustry,summarlData,lineData} from '../services/chartdata';
import { message } from 'antd';

function* getMap() {
  try {
    const {jsonResult} = yield call(getMapdata);
    if (jsonResult.mapdata) {
      yield put({
        type: 'chart/get/salesMapdata/success',
        payload: jsonResult.mapdata,
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
  let queryStr = "";
  if(query){
    let year = query.getFullYear();
    let month = query.getMonth() + 1;
    queryStr = queryStr + `&Date=${year},${month}`
  }
  try {
    const {jsonResult} = yield call(summarlData,queryStr);
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

function* getInstallByIndustry() {
  try {
    const {jsonResult} = yield call(installByIndustry);
    if (jsonResult.success) {
      yield put({
        type: 'chart/get/InstallByIndustry/success',
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

function* getBuyByIndustry() {
  try {
    const {jsonResult} = yield call(buyforIndustry);
    if (jsonResult.success) {
      yield put({
        type: 'chart/get/BuyByIndustry/success',
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

function* getLineData(...args) {
  const query = args[0].query;
  let queryStr = "";
  if(query){
    let year = query.getFullYear();
    let month = query.getMonth() + 1;
    queryStr = queryStr + `&Date=${year},${month}`
  }
  try {
    const {jsonResult} = yield call(lineData,queryStr);
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


function* watchGetMapData() {
  yield takeLatest('chart/get/salesMapdata', getMap)
}

function* watchLineData() {
  yield takeLatest('chart/get/linedata', getLineData)
}

function* watchGetInstallByIndustry() {
  yield takeLatest('chart/get/InstallByIndustry', getInstallByIndustry)
}

function* watchGetBuyByIndustry() {
  yield takeLatest('chart/get/BuyByIndustry', getBuyByIndustry)
}

function* watchSummarlData() {
  yield takeLatest('chart/get/summarlData', getSummarlData)
}


export default function*() {
  yield fork(watchGetMapData);
  yield fork(watchGetInstallByIndustry);
  yield fork(watchGetBuyByIndustry);
  yield fork(watchSummarlData);
  yield fork(watchLineData);

  yield put({
    type: 'chart/get/salesMapdata',
  });
  yield put({
    type: 'chart/get/InstallByIndustry',
  });
  yield put({
    type: 'chart/get/BuyByIndustry',
  });
  yield put({
    type: 'chart/get/summarlData',
  });
  yield put({
    type: 'chart/get/linedata',
  });
}
