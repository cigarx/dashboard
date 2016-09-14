import xFetch from './xFetch';
import { rootUrl } from  './Constant'

const compayControl = {
  getType : async () => {
    return xFetch(`${rootUrl}/api/companys/types/`, {method: 'GET'})
  },
  companysByQuery : async (queryParam) => {
    console.log(`${rootUrl}/api/companys/?${queryParam}`);
    return xFetch(`${rootUrl}/api/companys/?${queryParam}`, {method: 'GET'})
  },
  getLineDataByCompany: async(companyid) =>{
    console.log(`${rootUrl}/api/report/linedata/${companyid}`);
    return xFetch(`${rootUrl}/api/report/linedata/${companyid}`, {method: 'GET'})
  }
}

export default compayControl;
