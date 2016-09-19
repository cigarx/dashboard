import {
  handleActions
} from 'redux-actions';
import {
  combineReducer
} from 'redux';
var u = require('updeep');

const companyEntity = {
  list: [],
  loading: false,
  queryOptions: {
    byDate: new Date(),
    byRegion: ['华北区'],
    byType:{
      types:[],
      type: "all",
      loading:false,
    },
    byPage: {
      current:1,
      total:0,
      pageSize:5
    },
    keyword:"",
    sorter : { },
    isImportant:false
  },
  LineData:{
    data:[],
    loading:false
  }
};

const company = handleActions({
  ['company/get/companies'](state) {
    return u.updateIn('loading', true, state);
  },
  ['company/get/companies/success'](state, action) {
    const result = u({
      list:action.payload ,
      loading: false,
    }, state);
    return u.updateIn('queryOptions.byPage.total', action.total,result);
  },
  ['company/queryOpt/set/types'](state) {
    return u.updateIn('queryOptions.byType.loading', true, state);
  },
  ['company/queryOpt/set/types/success'](state, action) {
    const result = u.updateIn('queryOptions.byType.loading', false, state);
    return u.updateIn('queryOptions.byType.types', action.payload , result);
  },
  ['company/queryOpt/set/startDate'](state,action){
    return u.updateIn('queryOptions.byDate',action.payload,state);
  },
  ['company/queryOpt/set/type'](state,action){
    return u.updateIn('queryOptions.byType.type',action.payload,state);
  },
  ['company/queryOpt/set/currentPage'](state,action){
    return u.updateIn('queryOptions.byPage.current', action.payload,state);
  },
  ['company/queryOpt/set/pageSize'](state,action){
    return u.updateIn('queryOptions.byPage.pageSize', action.payload,state);
  },
  ['company/queryOpt/set/keyword'](state,action){
    return u.updateIn('queryOptions.keyword', action.payload,state);
  },
  ['company/queryOpt/set/byRegion'](state, action) {
    return u.updateIn('queryOptions.byRegion', action.payload,state);
  },
  ['company/queryOpt/set/sorter'](state,action){
    return u.updateIn('queryOptions.sorter', action.payload,state);
  },
  ['company/queryOpt/set/isImportant'](state,action){
    return u.updateIn('queryOptions.isImportant', action.payload,state);
  },
  ['company/get/linedata'](state) {
    return u.updateIn('LineData.loading', true, state);
  },
  ['company/get/linedata/success'](state,action) {
    const result = u.updateIn('LineData.data', action.payload, state);
    return u.updateIn('LineData.loading', false, result);
  },

}, companyEntity);
export default company;
