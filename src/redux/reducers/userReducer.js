import { GET_USER_INFO, SET_PROFILE_IMAGE } from "../actions/userActions";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case GET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
      };
    case SET_PROFILE_IMAGE:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          profileImg: action.imgUrl,
        },
      };
    default:
      return state;
  }
}
