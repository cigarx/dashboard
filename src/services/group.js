import xFetch from './xFetch';
import { rootUrl } from './constant'

const groupControl = {

  groupDataByQuery: async (queryParam) => {
    return xFetch(`${rootUrl}/api/groups/?${queryParam}`, { method: 'GET' })
  },

}

export default groupControl;
