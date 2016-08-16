import { handleActions } from 'redux-actions';
import { combineReducer } from 'redux';

const mylayout = handleActions({
  ['uioption/toggleaside'](state) {
    console.log(state);
    return {...state , collapse:!state.collapse};
  },
},{
  collapse: true
});

export default mylayout;
