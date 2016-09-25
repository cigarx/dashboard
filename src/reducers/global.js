import { handleActions } from 'redux-actions';
import { combineReducer } from 'redux';
var u = require('updeep');

const globalEntity = {
  company:{
    typeList:{
      loading:false,
      types:[]
    },
    provincesList:{
      loading:false,
      provinces:[]
    },
    cityList:{
      loading:true,
      citys:[]
    },
    regionList:{
      loading:false,
      regions:[]
    },
  }
};

const global = handleActions({
  ['global/company/types'](state){
    return u.updateIn('company.typeList.loading',true,state);
  },
  ['global/company/types/success'](state, action) {
    const result = u.updateIn('company.typeList.loading', false, state);
    return u.updateIn('company.typeList.types', action.payload , result);
  },

  ['global/company/provinces'](state){
    return u.updateIn('company.provincesList.loading',true,state);
  },
  ['global/company/provinces/success'](state, action) {
    const result = u.updateIn('company.provincesList.loading', false, state);
    return u.updateIn('company.provincesList.provinces', action.payload , result);
  },

  ['global/company/regions'](state){
    return u.updateIn('company.regionList.loading',true,state);
  },
  ['global/company/regions/success'](state, action) {
    const result = u.updateIn('company.regionList.loading', false, state);
    return u.updateIn('company.regionList.regions', action.payload , result);
  },

  ['global/company/citys'](state){
    return u.updateIn('company.cityList.loading',true,state);
  },

  ['global/company/citys/success'](state, action) {
    const result = u.updateIn('company.cityList.loading', false, state);
    return u.updateIn('company.cityList.citys', action.payload , result);
  },

} , globalEntity);

export default global;
