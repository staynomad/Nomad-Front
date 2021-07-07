import handleReq from "../../utils/fetchRequest.js";
import { setLoadingTrue, setLoadingFalse } from "./loadingActions";

/* Types */
export const SET_USER_RESERVATIONS = "VHomes/reservation/SET_USER_RESERVATIONS";
export const UPDATE_USER_RESERVATIONS =
  "VHomes/reservation/UPDATE_USER_RESERVATIONS";

/* Actions */
const setUserReservations = (reservations) => ({
  type: SET_USER_RESERVATIONS,
  reservations,
});
const updateUserReservations = (reservation) => ({
  type: UPDATE_USER_RESERVATIONS,
  reservation,
});

/* Fetch Calls */
/* Get all reservations belonging to a user */
export const searchUserReservations = (token) => async (dispatch) => {
  const headers = { Authorization: `Bearer ${token}` };
  const searchReservationsRes = await handleReq(
    `/reservation/getByUser`,
    "GET",
    headers
  );

  if (searchReservationsRes.statusText === "OK") {
    const { reservations } = await searchReservationsRes.data;
    dispatch(setUserReservations(reservations));
  }
};

/* Check in to a reservation */
export const checkInToReservation =
  (token, reservationId) => async (dispatch) => {
    dispatch(setLoadingTrue());
    const headers = { Authorization: `Bearer ${token}` };
    const checkInRes = await handleReq(
      `/reservation/activate/${reservationId}`,
      "POST",
      headers
    );

    if (checkInRes.statusText === "OK") {
      const { message, reservation } = await checkInRes.data;
      console.log(message);
      dispatch(setLoadingFalse());
      dispatch(updateUserReservations(reservation));
    }
  };

/* Check out of a reservation */
export const checkOutOfReservation =
  (token, reservationId) => async (dispatch) => {
    dispatch(setLoadingTrue());
    const headers = { Authorization: `Bearer ${token}` };
    const checkOutRes = await handleReq(
      `/reservation/deactivate/${reservationId}`,
      "POST",
      headers
    );

    if (checkOutRes.statusText === "OK") {
      const { reservation } = await checkOutRes.data;
      dispatch(setLoadingFalse());
      dispatch(updateUserReservations(reservation));
    }
  };
