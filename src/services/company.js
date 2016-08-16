import xFetch from './xFetch';
const rootUrl = 'http://localhost:8888';

const compayControl = {
  getAll : async function getAll() {
    return xFetch(`${rootUrl}/companys/`, {method: 'GET'})
  },
  getIndustry : async function getIndustry() {
    return xFetch(`${rootUrl}/industry/`, {method: 'GET'})
  },
  getAllCompanybyQuery : async function getAllCompanybyQuery(query){
    return xFetch(`${rootUrl}/companys/industries/${query}`, {method: 'GET'})
  }

}

export default compayControl;
