import xFetch from './xFetch';
const rootUrl = 'http://localhost:8888';

const compayControl = {
  getAll : async function getAll() {
    return xFetch(`${rootUrl}/companys/`, {method: 'GET'})
  },
  getIndustry : async function getIndustry() {
    return xFetch(`${rootUrl}/industry/`, {method: 'GET'})
  }
}

export default compayControl;
