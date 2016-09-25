import { takeLatest } from 'redux-saga';
import {
  take,
  call,
  put,
  fork,
  cancel
} from 'redux-saga/effects';

import {
  getCompanyTypes,
  getCompanyProvinces,
  getCompanyCitys,
  getCompanyRegion
} from '../services/global';

import {
  message
} from 'antd';


function* getTypes() {
  try {
    const {jsonResult} = yield call(getCompanyTypes);
    if (jsonResult.success) {
      yield put({
        type: 'global/company/types/success',
        payload: jsonResult.data
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

function* getRegion(){
  try {
    const {jsonResult} = yield call(getCompanyRegion);
    if (jsonResult.success) {
      yield put({
        type: 'global/company/regions/success',
        payload: jsonResult.data
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

function* getProvinces() {
  try {
    const {jsonResult} = yield call(getCompanyProvinces);
    if (jsonResult.success) {
      yield put({
        type: 'global/company/provinces/success',
        payload: jsonResult.data
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

function* getCitys(...args) {
  const province = args[0].query;
  try {
    const {jsonResult} = yield call(getCompanyCitys,province);
    if (jsonResult.success) {
      yield put({
        type: 'global/company/citys/success',
        payload: jsonResult.data
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



function* watchGlobalTypes() {
  yield takeLatest('global/company/types', getTypes)
}

function* watchGlobalProvinces() {
  yield takeLatest('global/company/provinces', getProvinces)
}

function* watchGlobalCitys() {
  yield takeLatest('global/company/citys', getCitys)
}

function* watchGlobalRegions(){
  yield takeLatest('global/company/regions', getRegion)

}

export default function*() {
  yield fork(watchGlobalTypes);
  yield fork(watchGlobalProvinces);
  yield fork(watchGlobalCitys);
  yield fork(watchGlobalRegions);

  yield put({
    type: 'global/company/types',
  });

  yield put({
    type: 'global/company/provinces',
  });

  yield put({
    type: 'global/company/regions',
  });


}
