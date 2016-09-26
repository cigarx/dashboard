import fetch from 'isomorphic-fetch';
import cookie from 'js-cookie';

const parseBlob = (response) => {
  return response.blob();
};

const processStatus = (response) => { // process status
  if (response.status === 200 || response.status === 0) {
    return Promise.resolve(response)
  }
  return Promise.reject(new Error('Error loading:'))
};


const downloadFile = (url) => {
  return fetch(url)
    .then(processStatus)
    .then(parseBlob);
};


export default downloadFile;
