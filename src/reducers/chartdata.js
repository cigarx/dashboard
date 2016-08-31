import { handleActions } from 'redux-actions';
import { combineReducer } from 'redux';
var u = require('updeep');

const chartEntity = {
  salesData:{
    data:[],
    loading:false
  },
  groupDaily:{
    data:[],
    loading:false
  },
  InstallByIndustry:{
    data:[],
    loading:false
  },
  BuyByIndustry:{
    data:[],
    loading:false
  },
  SummarlData:{
    nowdata:[],
    predata:[],
    byDate: new Date(),
    loading:false
  },
  LineData:{
    data:[],
    byDate: new Date(),
    loading:false
  }
};

const chartdata = handleActions({
  ['chart/get/salesMapdata'](state) {
    return u.updateIn('salesData.loading', true, state);
  },
  ['chart/get/salesMapdata/success'](state,action) {
    const result = u.updateIn('salesData.data', action.payload, state);
    return u.updateIn('salesData.loading', false, result);
  },
  ['chart/get/linedata'](state) {
    return u.updateIn('LineData.loading', true, state);
  },
  ['chart/get/linedata/success'](state,action) {
    const result = u.updateIn('LineData.data', action.payload, state);
    return u.updateIn('LineData.loading', false, result);
  },
  ['chart/set/linedata/byDate'](state,action) {
    return u.updateIn('LineData.byDate', action.payload, state);
  },
  ['chart/get/InstallByIndustry'](state) {
    return u.updateIn('InstallByIndustry.loading', true, state);
  },
  ['chart/get/InstallByIndustry/success'](state,action) {
    const result = u.updateIn('InstallByIndustry.data', action.payload, state);
    return u.updateIn('InstallByIndustry.loading', false, result);
  },
  ['chart/get/BuyByIndustry'](state) {
    return u.updateIn('BuyByIndustry.loading', true, state);
  },
  ['chart/get/BuyByIndustry/success'](state,action) {
    const result = u.updateIn('BuyByIndustry.data', action.payload, state);
    return u.updateIn('BuyByIndustry.loading', false, result);
  },
  ['chart/get/groupDailydata'](state) {
    return u.updateIn('groupDaily.loading', true, state);
  },
  ['chart/get/groupDailydata/success'](state,action) {
    const result = u.updateIn('groupDaily.data', action.payload, state);
    return u.updateIn('groupDaily.loading', false, result);
  },
  ['chart/get/summarlData'](state) {
    return u.updateIn('SummarlData.loading', true, state);
  },
  ['chart/get/summarlData/success'](state,action) {
    const result = u.updateIn('SummarlData.nowdata', action.nowdata, state);
    return u.updateIn('SummarlData.loading', false,  u.updateIn('SummarlData.predata', action.predata, result));
  },
  ['chart/set/summarlData/byDate'](state,action) {
    return u.updateIn('SummarlData.byDate', action.payload, state);
  },

},chartEntity);

export default chartdata;
