import {UPDATE_INFO, FETCH_CURRENT} from './createListingTypes'

const initialState = {
    createListing: {}
}

export default function(state=initialState, action) {
    switch(action.type) {
        case UPDATE_INFO:
            return {
                ...state,
                createListing: action.payload
            }
        case FETCH_CURRENT:
            return {
                createListing: action.payload
            }
        default:
            return state
    }
}