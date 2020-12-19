import {
    SET_AVAILABLE,
    SET_BOOKED,
    SET_CALENDAR_URL
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
        case SET_CALENDAR_URL: {
            return {
                ...state,
                calendarURL: action.dates,
            }
        }
        default: return state;
    }
}
