import { push } from "connected-react-router";

import handleReq from "../../utils/fetchRequest";
import { setLoadingFalse, setLoadingTrue } from "./loadingActions";

export const createNewListing =
  (isDraft, newListingData) => async (dispatch) => {
    dispatch(setLoadingTrue());
    const newListingRes = await handleReq(
      "/listings/createListing",
      "POST",
      { "Content-Type": "multipart/form-data" },
      newListingData
    );

    if (newListingRes && newListingRes.status === 201) {
      if (!isDraft) {
        const { newListingId } = newListingRes.data;
        const activateListingRes = await handleReq(
          `/listings/activateListing/${newListingId}`,
          "PUT"
        );

        if (!activateListingRes || activateListingRes.status !== 200) {
          const { errors } = newListingRes.data;
          dispatch(setLoadingFalse());
          console.log(errors);
        }
      }

      dispatch(setLoadingFalse());
      dispatch(push("/MyAccount"));
    } else {
      const { errors } = newListingRes.data;
      dispatch(setLoadingFalse());
      console.log(errors);
    }
  };
