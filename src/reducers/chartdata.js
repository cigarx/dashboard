import { handleActions } from 'redux-actions';
import { combineReducer } from 'redux';
var u = require('updeep');

const chartEntity = {
  versionData:{
    data:[],
    loading:false,
  },
  SummarlData:{
    nowdata:{},
    predata:{},
    loading:false
  },
  LineData:{
    data:[],
    loading:false
  },
  TopTenData:{
    data:[],
    loading:false
  },
  queryOption:{
    byDate: "weekly",
    byType:"all",
    show:"install_sum"
  }
};

const chartdata = handleActions({

  ['chart/get/linedata'](state) {
    return u.updateIn('LineData.loading', true, state);
  },
  ['chart/get/linedata/success'](state,action) {
    const result = u.updateIn('LineData.data', action.payload, state);
    return u.updateIn('LineData.loading', false, result);
  },

  ['chart/get/versionData'](state) {
    return u.updateIn('versionData.loading', true, state);
  },
  ['chart/get/versionData/success'](state,action) {
    const result = u.updateIn('versionData.data', action.payload, state);
    return u.updateIn('versionData.loading', false, result);
  },

  ['chart/get/toptenData'](state) {
    return u.updateIn('TopTenData.loading', true, state);
  },
  ['chart/get/toptenData/success'](state,action) {
    const result = u.updateIn('TopTenData.data', action.payload, state);
    return u.updateIn('TopTenData.loading', false, result);
  },




  ['chart/get/summarlData'](state) {
    return u.updateIn('SummarlData.loading', true, state);
  },
  ['chart/get/summarlData/success'](state,action) {
    const result = u.updateIn('SummarlData.nowdata', action.nowdata, state);
    return u.updateIn('SummarlData.loading', false,  u.updateIn('SummarlData.predata', action.predata, result));
  },

  ['chart/queryOpt/set/date'](state,action) {
    return u.updateIn('queryOption.byDate', action.payload, state);
  },
  ['chart/queryOpt/set/type'](state,action) {
    return u.updateIn('queryOption.byType', action.payload, state);
  },
  ['chart/queryOpt/set/show'](state,action) {
    return u.updateIn('queryOption.show', action.payload, state);
  },


},chartEntity);

export default chartdata;
