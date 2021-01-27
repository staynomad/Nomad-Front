import handleReq from "../../utils/fetchRequest";
import { push } from 'connected-react-router';
import { setAuthError } from "./errorActions";
import { setLoadingFalse, setLoadingTrue } from "./loadingActions";

/* Types */
export const SET_LISTING_TRANSFER_REQUESTS = 'VHomes/transfer/SET_LISTING_TRANSFER_REQUESTS';

/* Actions */
const setListingTransferRequests = (listingsToTransfer) => ({ type: SET_LISTING_TRANSFER_REQUESTS, listingsToTransfer });

/* Fetch Calls and functions */
export const getListingTranferRequests = () => async dispatch => {
    const listingTransferRes = await handleReq("/listings/byTransferEmail", "GET");

    if (listingTransferRes && listingTransferRes.status === 200) {
        const { listingsToTransfer } = listingTransferRes.data;
        dispatch(setListingTransferRequests(listingsToTransfer));
    } else {
        const { errors } = listingTransferRes.data;
        dispatch(setAuthError(errors));
    };
};

export const sendListingTranferRequest = (email, listingId) => async dispatch => {
    const transferInfo = { email, listingId };
    const listingTransferRes = await handleReq("/listings/sendListingTransfer", "PUT", undefined, transferInfo);

    if (listingTransferRes && listingTransferRes.status === 200) {
        const { message } = listingTransferRes.data;
        console.log(message)
    } else {
        const { errors } = listingTransferRes.data;
        dispatch(setAuthError(errors));
    };
};