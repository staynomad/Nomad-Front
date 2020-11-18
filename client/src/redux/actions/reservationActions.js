import handleReq from "../../utils/fetchRequest.js";

/* Types */
export const SET_USER_RESERVATIONS = 'VHomes/reservation/SET_USER_RESERVATIONS';

/* Actions */
const setUserReservations = (reservations) => ({ type: SET_USER_RESERVATIONS, reservations });

/* Fetch Calls */
export const searchUserReservations = (token) => async dispatch => {
    const headers = { "Authorization": `Bearer ${token}` };
    const searchReservationsRes = await handleReq(`/reservation/getByUser`, "GET", headers)

    if (searchReservationsRes.statusText === 'OK') {
        const { reservations } = await searchReservationsRes.data;
        dispatch(setUserReservations(reservations));
    };
};