import { handleActions } from 'redux-actions';
import { combineReducer } from 'redux';

const mylayout = handleActions({
  ['uioption/toggleaside'](state) {
    console.log(state);
    return {...state , collapse:!state.collapse};
  },
},{
  testadd : ['1'],
  collapse: true
});

export default mylayout;
