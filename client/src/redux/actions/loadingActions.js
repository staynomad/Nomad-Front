/* Types */
import { COMPLETE_FORM, INCOMPLETE_FORM } from "../reducers/createListingTypes";
export const SET_LOADING_TRUE = "VHomes/spinner/SET_LOADING_TRUE";
export const SET_LOADING_FALSE = "VHomes/spinner/SET_LOADING_FALSE";
/* Actions */
export const setLoadingTrue = () => ({ type: SET_LOADING_TRUE });
export const setLoadingFalse = () => ({ type: SET_LOADING_FALSE });
export const incompleteForm = () => ({ type: INCOMPLETE_FORM });
export const completeForm = () => ({ type: COMPLETE_FORM });
