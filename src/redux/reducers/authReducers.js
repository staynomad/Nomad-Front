import { SET_USER_SESSION, REMOVE_USER_SESSION } from "../actions/authActions";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case SET_USER_SESSION: {
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          session: {
            isHost: action.isHost,
            token: action.token,
            userId: action.userId,
          },
        },
      };
    }
    case REMOVE_USER_SESSION: {
      return {
        ...state,
        userInfo: {},
      };
    }
    default:
      return state;
  }
}
