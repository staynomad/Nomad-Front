import axios from 'axios';
import { logoutUser } from '../redux/actions/authActions';
import { store } from '../index';

const production = process.env.NODE_ENV === "production";
const apiBaseUrl = production ? 'https://nvestup.com' : 'http://localhost:8080';

export default async function handleReq(endpoint, methodType, customHeaders, data) {
  let token = null;
  let curLoginState = store.getState().Login.userInfo;
  if (curLoginState && curLoginState.session) token = curLoginState.session.token;
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    axios.defaults.headers.common['Authorization'] = null;
  }

  try {
    const res = await axios({
      method: methodType,
      url: `${apiBaseUrl}${endpoint}`,
      headers: customHeaders,
      redirect: "follow",
      data: data,
    });

    return res;
  } catch (e) {
    console.log(e.response)
    if (e.response === "Unauthorized" || e.response.data.title === "JWT Error") {
      alert("Login token expired. Please log in to continue.");
      store.dispatch(logoutUser());
    }
    return e.response;
  }
}

// module.exports = { handleAuth };
