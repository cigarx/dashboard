import { handleActions } from 'redux-actions';
import { combineReducer } from 'redux';
const u = require('updeep');
import jwtDecode from 'jwt-decode';
import { isLogin } from '../utils/auth';

const authState = {
  formState: {
    username: '',
    password: '',
  },
  token: null,
  userName: null,
  isAuthenticated: isLogin(),
  isAuthenticating: false,
  statusText: null,
  isLogin: false,
  currentlySending: false,
};


const auth = handleActions({
    /*eslint no-useless-computed-key: "off"*/
  ['auth/login'](state) {
    return u({
      isAuthenticating: true,
      statusText: null,
    }, state)
  },
  ['auth/setAuth'](state, action) {
    return u({
      isLogin: action.isLogin,
      statusText: null,
    }, state)
  },
  ['auth/login/success'](state, payload) {
    return u({
      isAuthenticating: false,
      isAuthenticated: true,
      token: payload.token,
      userName: jwtDecode(payload.token).user,
      statusText: '登录成功',
    }, state)
  },
  ['auth/login/failure'](state, payload) {
    return u({
      isAuthenticating: false,
      isAuthenticated: false,
      token: null,
      userName: null,
      statusText: '认证失败:${payload.status} ${payload.statusText}',
    }, state)
  },
  ['auth/sending/request'](state, payload) {
    return u({
      currentlySending: payload.sending,
    }, state)
  },
  ['auth/request/error'](state, payload) {
    return u({
      statusText: payload.error,
    }, state)
  },
  ['auth/logout'](state, payload) {
    return u({
      isAuthenticated: false,
      token: null,
      userName: null,
      logouting: payload.sending,
      statusText: '注销成功',
    }, state)
  },
}, authState);

export default auth;
