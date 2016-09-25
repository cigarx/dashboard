import xFetch from './xFetch';

import { rootUrl } from  './Constant'

const companiesControl = {
  companysByQuery : async (queryParam) => {
    return xFetch(`${rootUrl}/api/companys/?${queryParam}`, {method: 'GET'})
  },
  getLineDataByCompany: async(companyid) =>{

    return xFetch(`${rootUrl}/api/report/linedata/${companyid}`, {method: 'GET'})
  },

  exportData: async(queryParam) => {
    return xFetch(`${rootUrl}/api/companys/?${queryParam}`, {method: 'GET'})
  }
}

export default companiesControl;
