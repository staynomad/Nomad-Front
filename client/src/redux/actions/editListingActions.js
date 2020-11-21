import { push } from 'connected-react-router';

import handleReq from "../../utils/fetchRequest.js";
import { setLoadingTrue, setLoadingFalse } from "./loadingActions";

/* Types */

/* Actions */

/* Fetch Calls */
export const submitEditListing = (token, editedListing) => async dispatch => {
    dispatch(setLoadingTrue())
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    };
    const editListingRes = await handleReq(`/listings/editListing/${editedListing.listingId}`, "PUT", headers, editedListing);

    if (editListingRes.statusText === 'OK') {
        const { listing } = editListingRes.data;
        dispatch(setLoadingFalse());
        dispatch(push(`/listing/${listing._id}`));
    };
};