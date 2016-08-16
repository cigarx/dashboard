import xFetch from './xFetch';

const compayControl = {
  getAll : async function getAll() {
    return xFetch('http://localhost:8888/companys/', {method: 'GET'})
  },
  getIndustry : async function getIndustry() {
    return xFetch('http://localhost:8888/industry/', {method: 'GET'})
  }
}

export default compayControl;
