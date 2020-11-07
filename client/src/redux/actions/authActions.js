import handleReq from "../../utils/fetchRequest.js";

/* Types */
export const SET_USER_ID = 'VHomes/search/SET_USER_ID';

/* Actions */
const setUserId = (token, userId) => ({ type: SET_USER_ID, token, userId });

/* Fetch Calls */
export const submitLogin = (userLogin) => async dispatch => {
    const headers = { "Content-Type": "application/json" };
    const loginRes = await handleReq("/login", "POST", headers, userLogin);

    if (loginRes.ok) {
        const { token, userId } = await loginRes.json();
        dispatch(setUserId(token, userId));
    };
};