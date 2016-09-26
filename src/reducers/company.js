import {
  handleActions,
} from 'redux-actions';
import {
  combineReducer,
} from 'redux';
const u = require('updeep');

const companyEntity = {
  loading: false,
  companyInfo: {},
  orderInfo: [],
  snInfo: [],
  versionInfo: {
    loading: false,
    data: [],
  },
  activetiInfo: {
    loading: false,
    data: [],
  },
  groupInfo: {
    isGroup: false,
    group: {},
  },
  query: {
    date: new Date(),
  },
}

const company = handleActions({
    /*eslint no-useless-computed-key: "off"*/
  ['company/get/info'](state) {
    return u.updateIn('loading', true, state);
  },
  ['company/get/info/success'](state, action) {
    return u({
      companyInfo: action.companyInfo,
      orderInfo: action.orderInfo,
      snInfo: action.snInfo,
      loading: false,
    }, state);
  },

}, companyEntity)
export default company;
