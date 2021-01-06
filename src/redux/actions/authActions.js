import handleReq from "../../utils/fetchRequest";
import { push } from 'connected-react-router';
import { setAuthError } from "./errorActions";
import { setLoadingFalse, setLoadingTrue } from "./loadingActions";

/* Types */
export const SET_USER_SESSION = 'VHomes/search/SET_USER_SESSION';
export const REMOVE_USER_SESSION = 'VHomes/search/REMOVE_USER_SESSION';

/* Actions */
const setUserSession = (isHost, token, userId) => ({ type: SET_USER_SESSION, isHost, token, userId });
const removeUserSession = () => ({ type: REMOVE_USER_SESSION })

/* Fetch Calls and functions */
export const submitLogin = (userLogin) => async dispatch => {
    dispatch(setLoadingTrue());
    const headers = {
        "Content-Type": "application/json",
    };
    const loginRes = await handleReq("/login", "POST", headers, userLogin);

    if (loginRes && loginRes.status === 200) {
        const { isHost, token, userId } = loginRes.data;
        dispatch(setLoadingFalse());
        dispatch(setUserSession(isHost, token, userId));
    } else {
        const { errors } = loginRes.data;
        dispatch(setLoadingFalse());
        dispatch(setAuthError(errors));
    }
};

export const logoutUser = () => dispatch => {
    dispatch(removeUserSession());
    dispatch(push(`/`));
}