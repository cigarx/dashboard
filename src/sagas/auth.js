import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel, race } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { message } from 'antd';

import auth from '../services/auth';


function* authorize({ username, password }) {
  yield put({ type: 'auth/sending/request', sending: true })
  try {
    // todo : hash pwd with bcryptjs
    // let salt = genSalt(username)
    // let hash = hashSync(password, salt)
    const { jsonResult } = yield call(auth.login, username, password);
    if (jsonResult.success) {
      return jsonResult.token
    }
    return false
  } catch (error) {
    yield put({ type: 'auth/request/error', error })
    message.error(error);
    localStorage.removeItem('token');
    return false
  } finally {
    // When done, we tell Redux we're not in the middle of a request any more
    yield put({ type: 'auth/sending/request', sending: false })
  }
}

function* logout() {
  yield put({ type: 'auth/sending/request', sending: true })
  try {
    //let response = yield call(auth.logout)
    yield put({ type: 'auth/logout/success', sending: false })
    // return response
  } catch (error) {
    yield put({ type: 'auth/request/error', error: error.message })
  }
}

/**
 * Log in saga
 */
function* loginFlow() {
  while (true) {
    const request = yield take('auth/login')
    const { username, password, redirect, dispatch } = request.data
    const winner = yield race({
      auth: call(authorize, { username, password }),
      logout: take('auth/logout'),
    })
    if (winner.auth) {
      yield put({ type: 'auth/setAuth', isLogin: true })
      yield put({ type: 'auth/login/success', token: winner.auth })
      localStorage.setItem('token', winner.auth);
      const redirectUrl = redirect.next || '/'
      dispatch(push(redirectUrl));
    } else if (winner.logout) {
      yield put({ type: 'auth/setAuth', isLogin: false })
      yield call(logout)
      dispatch(push('/login'));
    }
  }
}

function* logoutFlow() {
  while (true) {
    const request = yield take('auth/logout')
    const { dispatch } = request.data
    yield put({ type: 'auth/setAuth', newAuthState: false })
    yield call(logout)
    localStorage.removeItem('token');
    dispatch(push('/login'));
  }
}

export default function*() {
  yield fork(loginFlow)
  yield fork(logoutFlow)
}
