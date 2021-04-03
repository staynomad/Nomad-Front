import axios from "axios";
import handleReq from "../../utils/fetchRequest";
import { push } from "connected-react-router";
import { setAuthError } from "./errorActions";
import { setLoadingFalse, setLoadingTrue } from "./loadingActions";

/* Types */
export const SET_USER_SESSION = "VHomes/search/SET_USER_SESSION";
export const REMOVE_USER_SESSION = "VHomes/search/REMOVE_USER_SESSION";

/* Actions */
const setUserSession = (isHost, token, userId, user) => ({
  type: SET_USER_SESSION,
  isHost,
  token,
  userId,
  user,
});
const removeUserSession = () => ({ type: REMOVE_USER_SESSION });

/* Fetch Calls and functions */
export const submitLogin = (userLogin) => async (dispatch) => {
  dispatch(setLoadingTrue());
  const headers = {
    "Content-Type": "application/json",
  };
  const loginRes = await handleReq("/login", "POST", headers, userLogin);

  if (loginRes && loginRes.status === 200) {
    const { isHost, token, userId, user } = loginRes.data;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    dispatch(setLoadingFalse());
    dispatch(setUserSession(isHost, token, userId, user));
  } else {
    const { errors } = loginRes.data;
    dispatch(setLoadingFalse());
    dispatch(setAuthError(errors));
  }
};

export const submitGoogleLogin = (googleData) => async (dispatch) => {
  dispatch(setLoadingTrue());
  const headers = {
    "Content-Type": "application/json",
  };
  const loginRes = await handleReq(
    "/googleLogin",
    "POST",
    headers,
    JSON.stringify({ token: googleData.tokenId })
  );

  if (loginRes && loginRes.status === 200) {
    const { isHost, token, userId, user } = loginRes.data;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    dispatch(setLoadingFalse());
    dispatch(setUserSession(isHost, token, userId, user));
  } else {
    const { errors } = loginRes.data;
    dispatch(setLoadingFalse());
    dispatch(setAuthError(errors));
  }
};

export const logoutUser = () => (dispatch) => {
  axios.defaults.headers.common["Authorization"] = null;
  dispatch(removeUserSession());
  dispatch(push(`/`));
};
