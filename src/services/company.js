import xFetch from './xFetch';
import { rootUrl } from './constant'

const companyControl = {
  getInfo: async (companyid) => {
    return xFetch(`${rootUrl}/api/company/info/${companyid}`, { method: 'GET' })
  },
}

export default companyControl;
