import { handleActions } from 'redux-actions';
import { combineReducer } from 'redux';
var u = require('updeep');

const groupEntity = {
  list: [],
  loading: false,
  queryOptions: {
    byDate: {
      startValue: new Date(),
      endValue: new Date(),
      endOpen: false,
    },
    byPage: {
      current:0,
      total:0,
      pageSize:5
    },
    byIndustry:{
      Industries:[],
      industry: "all"
    },
    keyword:""
  }
};

const group = handleActions({
  ['group/get/list'](state) {
    return u.updateIn('loading', true, state);
  },
  ['group/get/list/success'](state, action) {
    const result = u({
      list:action.payload ,
      loading: false,
    }, state);
    return u.updateIn('queryOptions.byIndustry.Industries', action.industryFilter,u.updateIn('queryOptions.byPage.total', action.total,result))
  },
  ['company/get/companies/failed'](state, action) {
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
  ['queryOpt/set/industry'](state, action) {
    return u.updateIn('queryOptions.byIndustry.industry', action.payload, state);
  },
  ['queryOpt/set/keyword'](state, action) {
    return u.updateIn('queryOptions.keyword', action.payload, state);
  },
  ['queryUI/set/endOpen'](state, action) {
    return u.updateIn('queryOptions.byDate.endOpen', action.payload, state);
  },
  ['queryOpt/set/currentPage'](state, action) {
    return u.updateIn('queryOptions.byPage.current', action.payload, state);
  }
}, groupEntity);
export default group;
