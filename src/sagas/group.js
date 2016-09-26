import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { groupDataByQuery } from '../services/group';
import { message } from 'antd';

function* getGroup(...args) {
  const query = args[0].query;
  let queryStr = '';
  if (query && query.byDate && query.byDate.startValue) {
    const year = query.byDate.startValue.getFullYear();
    const month = query.byDate.startValue.getMonth() + 1;
    queryStr += `&startDate=${year},${month}`
  }
  if (query && query.byDate && query.byDate.endValue) {
    const year = query.byDate.endValue.getFullYear();
    const month = query.byDate.endValue.getMonth() + 1;
    queryStr += `&endDate=${year},${month}`
  }
  if (query && query.byPage) {
    const start = (query.byPage.current - 1) * query.byPage.pageSize;
    const limit = query.byPage.pageSize;
    queryStr += `&start=${start}&limit=${limit}`
  }
  if (query && query.byIndustry && query.byIndustry.industry) {
    const industry = query.byIndustry.industry;
    queryStr += `&industry=${industry}`
  }
  if (query && query.keyword) {
    const keyword = query.keyword;
    queryStr += `&keyword=${keyword}`
  }
  try {
    const { jsonResult } = yield call(groupDataByQuery, queryStr);
    if (jsonResult.group && jsonResult.byPage && jsonResult.industryFilter) {
      yield put({
        type: 'group/get/list/success',
        payload: jsonResult.group,
        total: jsonResult.byPage.total,
        industryFilter: jsonResult.industryFilter,
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

function* watchGetGroup() {
  yield takeLatest('group/get/list', getGroup)
}

export default function*() {
  yield fork(watchGetGroup);
  // Load companies.
  // yield put({
  //   type: 'group/get/list',
  // });
}
