import {
    SET_USER_RESERVATIONS
} from '../actions/reservationActions';

export default function reducer(state = {}, action) {
    switch (action.type) {
        case SET_USER_RESERVATIONS: {
            return {
                ...state,
                reservations: action.reservations,
            }
        }
        default: return state;
    }
}