import {
  handleActions
} from 'redux-actions';
import {
  combineReducer
} from 'redux';

const company = handleActions({
  ['company/getAllCompany'](state) {
    return {...state,
      loading: true,
    };
  },
  ['company/getAllCompany/success'](state, action) {
    return {...state,
      list: action.payload,
      loading: false,
    };
  },
  ['company/getAllCompany/failed'](state, action) {
    return {...state,
      err: action.err,
      loading: false,
    };
  },
  ['company/getAllCompany/failed'](state, action) {
    return {...state,
      err: action.err,
      loading: false,
    };
  },
  ['companyOpt/set/ChangeStartMon'](state, action) {
    const startValue = action.payload;
    return {...state,
      options: {...state.options,
        startValue: startValue
      }
    };
  },
  ['companyOpt/set/ChangeEndMon'](state, action) {
    const endValue = action.payload;
    return {...state,
      options: {...state.options,
        endValue: endValue
      }
    };
  },
  ['companyOpt/set/endOpen'](state, action) {
    return {...state,
      options: {...state.options,
        endOpen: action.payload
      }
    };
  },
  ['company/getIndustrys'](state) {
    return {...state,
      options: {...state.options,
        loading: true,
      }

    };
  },
  ['company/getIndustrys/success'](state, action) {
    return {...state,
      options: {...state.options,
        Industrys: action.payload,
        loading: false
      }
    };
  },

  ['companyOpt/set/ChangeIndustry'](state, action) {
    const endValue = action.payload;
    return {...state,
      options: {...state.options,
        endValue: endValue
      }
    };
  },
}, {
  list: [],
  loading: false,
  options: {
    startValue: {
      date: new Date()
    },
    endValue: {
      date: new Date()
    },
    endOpen: false,
    byIndustry: null,
    Industrys: []
  }
});

export default company;
