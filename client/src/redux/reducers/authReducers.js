import { SET_USER_ID } from '../actions/authActions';

export default function reducer(state = {}, action) {
    switch (action.type) {
        case SET_USER_ID: {
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    session: {
                        token: action.token,
                        userId: action.userId,
                    },
                }
            }
        }
        default: return state;
    }
}