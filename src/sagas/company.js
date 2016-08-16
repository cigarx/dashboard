import { takeLatest } from 'redux-saga';
import {
  take,
  call,
  put,
  fork,
  cancel
} from 'redux-saga/effects';
import {
  getAll,
  getIndustry,
  getAllCompanybyQuery
} from '../services/company';
import {
  message
} from 'antd';

function* getAllCompany() {
  try {
    const {
      jsonResult
    } = yield call(getAll);
    if (jsonResult.companys) {
      yield put({
        type: 'company/get/companies/success',
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

function* getAllbyQuery() {
  const {query} = arguments[0];
  try {
    const {
      jsonResult
    } = yield call(getAllCompanybyQuery, query);
    if (jsonResult.companys) {
      yield put({
        type: 'company/get/companiesByquery/success',
        payload: jsonResult.companys,
      });
    }
  } catch (err) {
    message.error(err);
    cancel
    //yield put({
    //  type: 'todos/get/failed',
    //  err,
    //});
  }
}


function* getIndustrys() {
  try {
    const {
      jsonResult
    } = yield call(getIndustry);
    if (jsonResult.industries) {
      yield put({
        type: 'queryOpt/get/industrys/success',
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

function* watchCompanyGetByQuery() {
  // const action =  yield take('company/get/companiesByquery');
  // console.log(action);
  // const test = [].concat(action);
  // console.log(test);
  yield takeLatest('company/get/companiesByquery', getAllbyQuery)
}

function* watchCompanyGet() {
  yield takeLatest('company/get/companies', getAllCompany)
}

function* watchIndustryGet() {
  yield takeLatest('queryOpt/get/industrys', getIndustrys)
}

export default function*() {
  yield fork(watchCompanyGet);
  yield fork(watchIndustryGet);
  yield fork(watchCompanyGetByQuery);
  // Load companies.
  yield put({
    type: 'company/get/companies',
  });
  yield put({
    type: 'queryOpt/get/industrys',
  });


}
