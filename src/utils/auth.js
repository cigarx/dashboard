
import jwtDecode from 'jwt-decode';


export const isLogin = () => {
  const token = localStorage.getItem('token');
  if (token !== null) {
    return jwtDecode(token).login;
  }
  return false;
}
