import xFetch from './xFetch';
import { rootUrl } from  './Constant'

const chartControl = {
  versionData : async (query) => {
    return xFetch(`${rootUrl}/api/report/versiondata/?${query}`, {method: 'GET'})
  },

  toptenData : async (query) => {
    return xFetch(`${rootUrl}/api/report/topten/?${query}`, {method: 'GET'})
  },

  getCompanyDaily : async (companyID) => {
    return xFetch(`${rootUrl}/api/report/companyDaily/${companyID}`, {method: 'GET'})
  },

  summarlData : async (query) => {
    return xFetch(`${rootUrl}/api/report/summarydata/?${query}`, {method: 'GET'})
  },

  lineData : async (query) => {
    return xFetch(`${rootUrl}/api/report/linedata/?${query}`, {method: 'GET'})
  },
}
export default chartControl;
