import fetch from 'isomorphic-fetch';
import cookie from 'js-cookie';

const errorMessages = (res) => `${res.status} ${res.statusText}`;

function check401(res) {
  if (res.status === 401) {
    localStorage.removeItem('token');
    location.href = '/login';
    location.reload()
  }
  return res;
}

function check404(res) {
  if (res.status === 404) {
    return Promise.reject(errorMessages(res));
  }
  return res;
}

function jsonParse(res) {
  const data = res.json().then(jsonResult => ({ ...res,
    jsonResult,
  }));
  return data;
}

function errorMessageParse(res) {
  const {
    success,
    message,
  } = res.jsonResult;
  if (!success) {
    return Promise.reject(message);
  }
  return res;
}

function xFetch(url, options) {
  const opts = { ...options };
  opts.headers = {
    ...opts.headers,
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    // authorization: cookie.get('authorization') || '',
  };
  return fetch(url, opts)
    .then(check401)
    .then(check404)
    .then(jsonParse)
    .then(errorMessageParse);
}

export default xFetch;
