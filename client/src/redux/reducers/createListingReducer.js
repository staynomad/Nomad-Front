import {UPDATE_INFO, FETCH_CURRENT} from './createListingTypes'
///location: {street: "",city: "",state: "",country: "",zipcode: "",aptnum: ""}
export default function(state={}, action) {
    switch(action.type) {
        case UPDATE_INFO:
            return {
                ...state,
                state: action.payload
            }
        case FETCH_CURRENT:
            return {
                createListing: action.payload
            }
        default:
            return state
    }
}