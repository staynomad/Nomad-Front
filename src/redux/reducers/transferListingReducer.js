import {
    SET_LISTING_TRANSFER_REQUESTS
} from '../actions/transferListingActions';

export default function reducer(state = {}, action) {
    switch (action.type) {
        case SET_LISTING_TRANSFER_REQUESTS: {
            return {
                ...state,
                listingsToTransfer: action.listingsToTransfer,
            }
        }
        default: return state;
    }
}