import xFetch from './xFetch';
import { rootUrl } from './constant'
const auth = {
  login: async (username, password) => {
    return xFetch(`${rootUrl}/auth/getToken/`,
      {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })
  },
}
export default auth;
