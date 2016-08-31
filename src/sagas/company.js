import { takeLatest } from 'redux-saga';
import {
  take,
  call,
  put,
  fork,
  cancel
} from 'redux-saga/effects';
import {
  getIndustry,
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
    queryStr = queryStr + `&startDate=${year},${month}`
  }
  if(query && query.byPage){
    let start = (query.byPage.current - 1) * query.byPage.pageSize ;
    let limit = query.byPage.pageSize;
    queryStr += `&start=${start}&limit=${limit}`
  }
  if(query && query.byIndustry && query.byIndustry.industry){
    let industry = query.byIndustry.industry;
    queryStr += `&industry=${industry}`
  }
  if(query && query.sorter && query.sorter.order){
    if(query.sorter.order == 'descend'){
      queryStr +=`&order=descend`
    }
    queryStr += `&field=${query.sorter.field}`
  }
  if(query && query.keyword){
    let keyword = query.keyword;
    queryStr += `&keyword=${keyword}`
  }
  
  try {
    const {jsonResult} = yield call(companysByQuery,queryStr);
    if (jsonResult.success) {
      yield put({
        type: 'company/get/companies/success',
        payload: jsonResult.companylist,
        total : jsonResult.byPage.total
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
    const {
      jsonResult
    } = yield call(getIndustry);
    if (jsonResult.success) {
      yield put({
        type: 'company/queryOpt/set/industrys/success',
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
  yield takeLatest('company/get/companies', getCompanys)
}

function* watchIndustryGet() {
  yield takeLatest('company/queryOpt/set/industrys', getIndustrys)
}

function* watchGetLineData() {
  yield takeLatest('company/get/linedata', getLineData)
}


export default function*() {
  yield fork(watchIndustryGet);
  yield fork(watchCompanyGetByQuery);
  yield fork(watchGetLineData);

  yield put({
    type: 'company/queryOpt/set/industrys',
  });

  yield put({
    type: 'company/get/companies',
  });

}
