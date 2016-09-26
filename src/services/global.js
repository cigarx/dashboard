import xFetch from './xFetch';

import { rootUrl } from './constant'

const global = {
  getCompanyTypes: async () => {
    return xFetch(`${rootUrl}/api/global/types/`, { method: 'GET' })
  },
  getCompanyProvinces: async () => {
    return xFetch(`${rootUrl}/api/global/provinces/`, { method: 'GET' })
  },
  getCompanyCitys: async(province) => {
    return xFetch(`${rootUrl}/api/global/citys/${province}`, { method: 'GET' })
  },
  getCompanyRegion: async() => {
    return xFetch(`${rootUrl}/api/global/regions/`, { method: 'GET' })
  },
}

export default global;
