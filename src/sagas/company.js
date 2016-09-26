import { takeLatest } from 'redux-saga';
import {
  take,
  call,
  put,
  fork,
  cancel,
} from 'redux-saga/effects';
import {
  getInfo,
} from '../services/company';
import {
  message,
} from 'antd';


function* getCompanyInfo(...args) {
  const companyId = args[0].companyId;
  try {
    const { jsonResult } = yield call(getInfo, companyId);
    if (jsonResult.success) {
      yield put({
        type: 'company/get/info/success',
        companyInfo: jsonResult.companyInfo,
        orderInfo: jsonResult.orderInfo,
        snInfo: jsonResult.snInfo,
      });
    }
  } catch (err) {
    // message.error(err);
  }
}

function* watchGetInfo() {
  yield takeLatest('company/get/info', getCompanyInfo)
}

export default function*() {
  yield fork(watchGetInfo);
}
