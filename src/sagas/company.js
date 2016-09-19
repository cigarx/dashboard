import { takeLatest } from 'redux-saga';
import {
  take,
  call,
  put,
  fork,
  cancel
} from 'redux-saga/effects';
import {
  getType,
  companysByQuery,
  getLineDataByCompany
} from '../services/company';
import {
  message
} from 'antd';


function* getLineData(...args) {

  const companyId = args[0].query;
  if(companyId){
    try {
      const {jsonResult} = yield call(getLineDataByCompany,companyId);
      console.log(jsonResult);
      if (jsonResult.success) {
        yield put({
          type: 'company/get/linedata/success',
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
}
function* getCompanys(...args) {

  const query = args[0].query;
  let queryStr = "";
  if(query && query.byDate){
    let year = query.byDate.getFullYear();
    let month = query.byDate.getMonth() + 1;
    queryStr = queryStr + `&startDate=${year}-${month}`
  }
  if(query && query.byPage){
    let start = (query.byPage.current - 1) * query.byPage.pageSize ;
    let limit = query.byPage.pageSize;
    queryStr += `&start=${start}&limit=${limit}`
  }

  if(query && query.byType && query.byType.type){
    let type = query.byType.type;
    queryStr += `&type=${type}`
  }

  if(query && query.sorter && query.sorter.order){
    if(query.sorter.order == 'descend'){
      queryStr +=`&order=descend`
    }
    queryStr += `&field=${query.sorter.field}`
  }

  if(query && query.byRegion){
    if( query.byRegion.length > 0){
      console.log( query.byRegion);
      queryStr += `&region=${query.byRegion.toString() }`
    }
  }

  if(query && query.keyword){
    let keyword = query.keyword;
    queryStr += `&keyword=${keyword}`
  }
  if(query && query.isImportant){
    console.log("is important");
    let isImportant = query.isImportant;
    queryStr += `&important=true`
  }

  try {
    const {jsonResult} = yield call(companysByQuery,queryStr);
    if (jsonResult.success) {
      yield put({
        type: 'company/get/companies/success',
        payload: jsonResult.data,
        total : jsonResult.length
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


function* getTypes() {
  try {
    const {
      jsonResult
    } = yield call(getType);
    if (jsonResult.success) {
      yield put({
        type: 'company/queryOpt/set/types/success',
        payload: jsonResult.types,
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
  yield takeLatest('company/get/companies', getCompanys)
}

function* watchTypeGet() {
  yield takeLatest('company/queryOpt/set/types', getTypes)
}

function* watchGetLineData() {
  yield takeLatest('company/get/linedata', getLineData)
}


export default function*() {
  yield fork(watchTypeGet);
  yield fork(watchCompanyGetByQuery);
  yield fork(watchGetLineData);

  yield put({
    type: 'company/queryOpt/set/types',
  });

  yield put({
    type: 'company/get/companies',
  });

}
