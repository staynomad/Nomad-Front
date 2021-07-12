import handleReq from "../../utils/fetchRequest";
import { setAuthError } from "./errorActions";
import { setLoadingFalse, setLoadingTrue } from "./loadingActions";

/* Types */
export const GET_USER_INFO = "VHomes/user/GET_USER_INFO";
export const SET_PROFILE_IMAGE = "VHomes/user/SET_PROFILE_IMAGE";

/* Actions */
export const setUserInfo = (userData) => ({
  type: GET_USER_INFO,
  payload: userData,
});
export const setUserImage = (imgUrl) => ({ type: SET_PROFILE_IMAGE, imgUrl });

/* Fetch Calls and functions */
export const submitImageChange = (userId, profileImg) => async (dispatch) => {
  dispatch(setLoadingTrue());
  const setProfileImgRes = await handleReq(
    `/user/profileImage/${userId}`,
    "POST",
    { "Content-Type": "multipart/form-data" },
    profileImg
  );

  if (setProfileImgRes && setProfileImgRes.status === 201) {
    const { imgUrl } = setProfileImgRes.data;
    dispatch(setLoadingFalse());
    dispatch(setUserImage(imgUrl));
  } else {
    const { errors } = setProfileImgRes.data;
    dispatch(setLoadingFalse());
    dispatch(setAuthError(errors));
  }
};
