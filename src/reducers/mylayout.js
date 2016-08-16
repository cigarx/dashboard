import { handleActions } from 'redux-actions';
import { combineReducer } from 'redux';

const mylayout = handleActions({
  ['uioption/toggleaside'](state) {
    return {...state , collapse:!state.collapse};
  },
  ['uioption/showChart'](state,action) {
    return {...state , showChart:action.payload};
  },
  ['uioption/set/model'](state,action) {
    return {...state , model:action.payload};
  },
},{
  collapse: true,
  showChart:false,
  model : null
});

export default mylayout;
