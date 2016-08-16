import {
  handleActions
} from 'redux-actions';
import {
  combineReducer
} from 'redux';
var u = require('updeep');

const companyEntity = {
  companyList: [],
  loading: false,
  queryOptions: {
    byDate: {
      startValue: {
        date: new Date()
      },
      endValue: {
        date: new Date()
      },
      endOpen: false,
    },
    byIndustry: {
      allIndustrys: [],
      industry: null,
      loading: false
    },
    byPage: {

    }
  }
};

const company = handleActions({
  ['company/getAllCompany'](state) {
    return u({
      loading: true
    }, companyEntity);
  },
  ['company/getAllCompany/success'](state, action) {
    return u({
      companyList: action.payload,
      loading: false
    }, state);
  },
  ['company/getAllCompany/failed'](state, action) {
    return u({
      err: action.err,
      loading: false
    }, state);
  },
  ['companyOpt/set/ChangeStartMon'](state, action) {
    return u.updateIn('queryOptions.byDate.startValue', action.payload, state);

  },
  ['companyOpt/set/ChangeEndMon'](state, action) {
    return u.updateIn('queryOptions.byDate.endValue', action.payload, state);
  },
  ['companyOpt/set/endOpen'](state, action) {
    return u.updateIn('queryOptions.byDate.endOpen', action.payload, state);
  },
  ['company/getIndustrys'](state) {

    return u.updateIn('queryOptions.byIndustry.loading', true, state);
  },
  ['company/getIndustrys/success'](state, action) {

    const result = u.updateIn('queryOptions.byIndustry.allIndustrys', action.payload, state);
    return u.updateIn('queryOptions.byIndustry.loading', false, result);
  },
  ['companyOpt/set/ChangeIndustry'](state, action) {
    return u.updateIn('queryOptions.byIndustry.industry', action.payload, state);
  },
}, companyEntity);
export default company;
