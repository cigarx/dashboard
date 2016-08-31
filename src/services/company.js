import xFetch from './xFetch';
import { rootUrl } from  './Constant'

const compayControl = {
  getIndustry : async function getIndustry() {
    return xFetch(`${rootUrl}/api/industry/`, {method: 'GET'})
  },
  companysByQuery : async (queryParam) => {
    console.log(`${rootUrl}/api/companys/?${queryParam}`);
    return xFetch(`${rootUrl}/api/companys/?${queryParam}`, {method: 'GET'})
  },
  getLineDataByCompany: async(companyid) =>{
    return xFetch(`${rootUrl}/api/report/linedata/${companyid}`, {method: 'GET'})
  }
}

export default compayControl;
