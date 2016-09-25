import fetch from 'isomorphic-fetch';
import cookie from 'js-cookie';

var parseBlob = function (response) {
  return response.blob();
};

var processStatus = function (response) {// process status
  if (response.status === 200 || response.status === 0) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error('Error loading: ' + url))
  }
};


var downloadFile = function (url) {
  return fetch(url)
    .then(processStatus)
    .then(parseBlob);
};


export default downloadFile;
