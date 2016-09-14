import xFetch from './xFetch';
import { rootUrl } from  './Constant'

const chartControl = {
  getMapdata : async () => {
    return xFetch(`${rootUrl}/api/report/mapdata/`, {method: 'GET'})
  },

  getCompanyDaily : async (companyID) => {
    return xFetch(`${rootUrl}/api/report/companyDaily/${companyID}`, {method: 'GET'})
  },

  installByIndustry : async () => {
    return xFetch(`${rootUrl}/api/report/piedata/installbyindustry`, {method: 'GET'})
  },

  buyforIndustry : async () => {
    return xFetch(`${rootUrl}/api/report/piedata/buybyindustry`, {method: 'GET'})
  },

  summarlData : async (query) => {
    return xFetch(`${rootUrl}/api/report/summarydata?${query}`, {method: 'GET'})
  },

  lineData : async (query) => {
    return xFetch(`${rootUrl}/api/report/linedata/?${query}`, {method: 'GET'})
  },


}
export default chartControl;
