import { GET_USER_INFO } from '../actions/userActions';

export default function reducer(state = {}, action) {
  switch (action.type) {
    case GET_USER_INFO:
      console.log("action.payload: ", action.payload)
      return {
        ...state,
        userInfo: action.payload
      };
    default:
      return state;
  }
}
