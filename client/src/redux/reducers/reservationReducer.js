import {
    SET_USER_RESERVATIONS,
    UPDATE_USER_RESERVATIONS
} from '../actions/reservationActions';

export default function reducer(state = {}, action) {
    switch (action.type) {
        case SET_USER_RESERVATIONS: {
            return {
                ...state,
                reservations: action.reservations,
            }
        }
        case UPDATE_USER_RESERVATIONS: {
            return {
                ...state,
                reservations: state.reservations.map(reservation => {
                    if (reservation._id === action.reservation._id) return action.reservation;
                    else return reservation;
                }),
            }
        }
        default: return state;
    }
}