import { push } from "connected-react-router";
import handleReq from "../../utils/fetchRequest.js";
import { setLoadingTrue, setLoadingFalse } from "./loadingActions";

/* Types */

/* Actions */

/* Fetch Calls */
/* Submit a review */
export const submitReview =
  (rating, review, listingId, token) => async (dispatch) => {
    dispatch(setLoadingTrue());
    const headers = { Authorization: `Bearer ${token}` };
    const data = { rating, review };
    const submitReviewRes = await handleReq(
      `/reviews/${listingId}`,
      "POST",
      headers,
      data
    );

    if (submitReviewRes.statusText === "OK") {
      dispatch(setLoadingFalse());
      dispatch(push(`/listing/${listingId}`));
    } else {
      alert(submitReviewRes.data.errors);
      dispatch(window.location.reload());
    }
  };
