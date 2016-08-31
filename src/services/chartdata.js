import xFetch from './xFetch';
import { rootUrl } from  './Constant'

const chartControl = {
  getMapdata : async () => {
    return xFetch(`${rootUrl}/api/report/mapdata/`, {method: 'GET'})
  },

  getGroupDaily : async (groupId) => {
    return xFetch(`${rootUrl}/api/report/groupDaily/${groupId}`, {method: 'GET'})
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
