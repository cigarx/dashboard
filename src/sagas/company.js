import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { getAll ,getIndustry} from '../services/company';
import { message } from 'antd';

function* getAllCompany() {
  try {
    const { jsonResult } = yield call(getAll);
    if (jsonResult.companys) {
      yield put({
        type: 'company/getAllCompany/success',
        payload: jsonResult.companys,
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

function* getIndustrys() {
  try {
    const { jsonResult } = yield call(getIndustry);
    if (jsonResult.industries) {
      yield put({
        type: 'company/getIndustrys/success',
        payload: jsonResult.industries,
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

function* watchCompanyGet() {
  yield takeLatest('company/getAllCompany', getAllCompany)
}

function* watchIndustryGet() {
  yield takeLatest('company/getIndustrys', getIndustrys)
}

export default function* () {
  yield fork(watchCompanyGet);
  yield fork(watchIndustryGet);
  // Load companies.
  yield put({
    type: 'company/getAllCompany',
  });
  yield put({
    type: 'company/getIndustrys',
  });


}
