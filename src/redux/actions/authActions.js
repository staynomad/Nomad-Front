import handleReq from "../../utils/fetchRequest";
import { setAuthError } from "./errorActions";

/* Types */
export const SET_USER_SESSION = 'VHomes/search/SET_USER_SESSION';
export const REMOVE_USER_SESSION = 'VHomes/search/REMOVE_USER_SESSION';

/* Actions */
const setUserSession = (isHost, token, userId) => ({ type: SET_USER_SESSION, isHost, token, userId });
export const removeUserSession = () => ({ type: REMOVE_USER_SESSION })

/* Fetch Calls */
export const submitLogin = (userLogin) => async dispatch => {
    const headers = {
        "Content-Type": "application/json",
    };
    const loginRes = await handleReq("/login", "POST", headers, userLogin);

    if (loginRes && loginRes.status === 200) {
        const { isHost, token, userId } = loginRes.data;
        dispatch(setUserSession(isHost, token, userId));
    } else {
        const { errors } = loginRes.data;
        dispatch(setAuthError(errors))
    }
};
