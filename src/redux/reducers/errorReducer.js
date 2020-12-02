import {
    SET_AUTH_ERROR,
} from '../actions/errorActions.js';

export default function reducer(state = {}, action) {
    switch (action.type) {
        case SET_AUTH_ERROR: {
            return {
                ...state,
                authErrors: action.errors,
            }
        }
        default: return state;
    }
}