import { takeLatest } from 'redux-saga';
import {
  take,
  call,
  put,
  fork,
  cancel,
} from 'redux-saga/effects';
import {
  companysByQuery,
  getLineDataByCompany,
  exportData,
} from '../services/companies';
import {
  message,
} from 'antd';


function createQuery(query) {
  let queryStr = '';

  if (query && query.byDate) {
    const year = query.byDate.getFullYear();
    const month = query.byDate.getMonth() + 1;
    queryStr += `&startDate=${year}-${month}`
  }
  if (query && query.byPage) {
    const start = (query.byPage.current - 1) * query.byPage.pageSize;
    const limit = query.byPage.pageSize;
    queryStr += `&start=${start}&limit=${limit}`
  }

  if (query && query.queryBy === 'byRegion') {
    if (query && query.byRegion) {
      if (query.byRegion.length > 0) {
        queryStr += `&region=${query.byRegion.toString()}`
      }
    }
  } else if (query && query.queryBy === 'byProvince') {
    if (query && query.byCity) {
      const city = query.byCity;
      if (city === 'all') {
        if (query && query.byProvince) {
          const province = query.byProvince;
          queryStr += `&province=${province}`
        }
      } else {
        queryStr += `&city=${city}`
      }
    }
  }
  if (query && query.byType) {
    const type = query.byType;
    queryStr += `&type=${type}`
  }

  if (query && query.sorter && query.sorter.order) {
    if (query.sorter.order === 'descend') {
      queryStr += '&order=descend'
    }
    queryStr += `&field=${query.sorter.field}`
  }


  if (query && query.keyword) {
    const keyword = query.keyword;
    queryStr += `&keyword=${keyword}`
  }

  if (query && query.isImportant) {
    const isImportant = query.isImportant;
    queryStr += '&important=true'
  }
  return queryStr;
}

function convert4JSONToCSV(JSONData, ReportTitle, ShowLabel) {
  const arrData = typeof JSONData !== 'object' ? JSON.parse(JSONData) : JSONData;
  let CSV = '';
  CSV += ` ${ReportTitle}\r\n\n`;
  if (ShowLabel) {
    let row = '';
    /* eslint no-restricted-syntax: ["error", "FunctionExpression", "WithStatement"] */
    for (const index in arrData[0]) {
      if ({}.hasOwnProperty.call(arrData[0], index)) {
        row += `${index} , `;
      }
    }
    row = row.slice(0, -1);
    CSV += `${row} \r\n `;
  }

  for (let i = 0; i < arrData.length; i++) {
    let row = '';
    for (const index in arrData[i]) {
      if ({}.hasOwnProperty.call(arrData[i], index)) {
        row += `"${arrData[i][index]}" , `;
      }
    }

    row.slice(0, row.length - 1);
    CSV += `${row} \r\n `;
  }

  if (CSV === '') {
    return;
  }

  const fileName = `${ReportTitle.replace(/ /g, '_')}_${Date.now()}`;
  const uri = `data:text/csv;charset=utf-8,,\uFEFF${encodeURI(CSV)}`;
  const link = document.createElement('a');
  link.href = uri;
  link.style = 'visibility:hidden';
  link.download = `${fileName}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function* runExportData(...args) {
  let queryStr = createQuery(args[0].query);
  queryStr += '&export=yes';
  try {
    const { jsonResult } = yield call(companysByQuery, queryStr);
    if (jsonResult.success) {
      convert4JSONToCSV(jsonResult.data, args[0].title, true);
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
  const companyId = args[0].query;
  if (companyId) {
    try {
      const { jsonResult } = yield call(getLineDataByCompany, companyId);
      if (jsonResult.success) {
        yield put({
          type: 'company/get/linedata/success',
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
}


function* getCompanys(...args) {
  const queryStr = createQuery(args[0].query);
  try {
    const { jsonResult } = yield call(companysByQuery, queryStr);
    if (jsonResult.success) {
      yield put({
        type: 'company/get/companies/success',
        payload: jsonResult.data,
        total: jsonResult.length,
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

function* watchExportData() {
  yield takeLatest('company/exportData', runExportData)
}

function* watchGetLineData() {
  yield takeLatest('company/get/linedata', getLineData)
}


export default function*() {
  yield fork(watchCompanyGetByQuery);
  yield fork(watchGetLineData);
  yield fork(watchExportData);

  // yield put({
  //   type: 'company/get/companies',
  // });
}
