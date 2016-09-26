import { handleActions } from 'redux-actions';
import { combineReducer } from 'redux';

const mylayout = handleActions({
  /*eslint no-useless-computed-key: "off"*/
  ['uioption/toggleaside'](state) {
    return { ...state, collapse: !state.collapse };
  },
  ['uioption/showChart'](state, action) {
    return { ...state, showChart: action.payload };
  },
  ['uioption/set/model'](state, action) {
    return { ...state, model: action.payload };
  },
}, {
  collapse: false,
  showChart: false,
  model: null,
});

export default mylayout;
