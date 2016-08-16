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
      current:0,
      total:0,
      pageSize:5
    }
  }
};

const company = handleActions({
  ['company/get/companies'](state) {
    return u({
      loading: true
    }, state);
  },
  ['company/get/companies/success'](state, action) {
    return u({
      companyList: action.payload,
      loading: false
    }, state);
  },
  ['company/get/companies/failed'](state, action) {
    return u({
      err: action.err,
      loading: false
    }, state);
  },

  ['company/get/companiesByquery'](state) {
    return u({
      loading: true
    }, state);
  },
  ['company/get/companiesByquery/success'](state, action) {
    return u({
      companyList: action.payload,
      loading: false
    }, state);
  },
  ['company/get/companiesByquery/failed'](state, action) {
    return u({
      err: action.err,
      loading: false
    }, state);
  },

  ['queryOpt/set/startDate'](state, action) {
    return u.updateIn('queryOptions.byDate.startValue', action.payload, state);

  },
  ['queryOpt/set/endDate'](state, action) {
    return u.updateIn('queryOptions.byDate.endValue', action.payload, state);
  },
  ['queryOpt/set/endOpen'](state, action) {
    return u.updateIn('queryOptions.byDate.endOpen', action.payload, state);
  },
  ['queryOpt/get/industrys'](state) {
    return u.updateIn('queryOptions.byIndustry.loading', true, state);
  },
  ['queryOpt/get/industrys/success'](state, action) {
    const result = u.updateIn('queryOptions.byIndustry.allIndustrys', action.payload, state);
    return u.updateIn('queryOptions.byIndustry.loading', false, result);
  },
  ['queryOpt/set/industry'](state, action) {
    return u.updateIn('queryOptions.byIndustry.industry', action.payload, state);
  },
  ['queryOpt/set/pageSize'](state, action) {
    return u.updateIn('queryOptions.byIndustry.industry', action.payload, state);
  },


}, companyEntity);
export default company;
