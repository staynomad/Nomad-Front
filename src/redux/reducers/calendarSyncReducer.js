import {
    SET_AVAILABLE,
    SET_BOOKED
} from '../actions/calendarSyncActions';

export default function reducer(state = {}, action) {
    switch (action.type) {
        case SET_AVAILABLE: {
            return {
                ...state,
                available: action.dates,
            }
        }
        case SET_BOOKED: {
            return {
                ...state,
                booked: action.dates,
            }
        }
        default: return state;
    }
}
