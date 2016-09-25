import xFetch from './xFetch';

import { rootUrl } from  './Constant'

const companyControl = {
  getInfo : async (companyid) => {
    return xFetch(`${rootUrl}/api/company/info/${companyid}`, {method: 'GET'})
  },
}

export default companyControl;
