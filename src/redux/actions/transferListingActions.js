import handleReq from "../../utils/fetchRequest";
import { push } from "connected-react-router";
import { setAuthError } from "./errorActions";

/* Types */
export const SET_LISTING_TRANSFER_REQUESTS =
  "VHomes/transfer/SET_LISTING_TRANSFER_REQUESTS";
export const REMOVE_ALL_TRANSFERS_FROM_STORE =
  "VHomes/transfer/REMOVE_ALL_TRANSFERS_FROM_STORE";
export const REMOVE_TRANSFER_FROM_STORE =
  "VHomes/transfer/REMOVE_TRANSFER_FROM_STORE";

/* Actions */
const setListingTransferRequests = (listingsToTransfer) => ({
  type: SET_LISTING_TRANSFER_REQUESTS,
  listingsToTransfer,
});
const removeAllTransfersFromStore = () => ({
  type: REMOVE_ALL_TRANSFERS_FROM_STORE,
});
const removeTransferFromStore = (listingId) => ({
  type: REMOVE_TRANSFER_FROM_STORE,
  listingId,
});

/* Fetch Calls and functions */
export const getListingTranferRequests = () => async (dispatch) => {
  const listingTransferRes = await handleReq(
    "/listings/byTransferEmail",
    "GET"
  );

  if (listingTransferRes && listingTransferRes.status === 200) {
    const { listingsToTransfer } = listingTransferRes.data;
    dispatch(setListingTransferRequests(listingsToTransfer));
  } else {
    const { errors } = listingTransferRes.data;
    dispatch(setAuthError(errors));
  }
};

export const sendListingTranferRequest =
  (email, listingId) => async (dispatch) => {
    const transferInfo = { email, listingId };
    const listingTransferRes = await handleReq(
      "/listings/sendListingTransfer",
      "PUT",
      undefined,
      transferInfo
    );

    if (listingTransferRes && listingTransferRes.status === 200) {
      const { message } = listingTransferRes.data;
      console.log(message);
      dispatch(push("/MyAccount"));
    } else {
      const { errors } = listingTransferRes.data;
      console.log(errors);
    }
  };

export const acceptListingTransfer =
  (acceptAll, listingId) => async (dispatch) => {
    const transferInfo = { acceptAll, listingId };
    const acceptTransferRes = await handleReq(
      "/listings/acceptListingTransfer",
      "PUT",
      undefined,
      transferInfo
    );

    if (acceptTransferRes && acceptTransferRes.status === 200) {
      console.log("Successfully transferred.");
      console.log(acceptAll);
      if (acceptAll) {
        dispatch(removeAllTransfersFromStore());
      } else {
        dispatch(removeTransferFromStore(listingId));
      }
    } else {
      const { errors } = acceptTransferRes.data;
      console.log(errors);
    }
  };

export const rejectListingTransfer =
  (rejectAll, listingId) => async (dispatch) => {
    const transferInfo = { rejectAll, listingId };
    const rejectTransferRes = await handleReq(
      "/listings/rejectListingTransfer",
      "PUT",
      undefined,
      transferInfo
    );

    if (rejectTransferRes && rejectTransferRes.status === 200) {
      console.log("Successfully transferred.");
      if (rejectAll) {
        dispatch(removeAllTransfersFromStore());
      } else {
        dispatch(removeTransferFromStore(listingId));
      }
    } else {
      const { errors } = rejectTransferRes.data;
      console.log(errors);
    }
  };
