import { NEW_LISTING } from "../reducers/createListingTypes";

export const newListing = (updateData) => (dispatch) => {
  dispatch({
    type: NEW_LISTING,
    payload: updateData,
  });
};
