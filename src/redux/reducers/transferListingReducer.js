import {
    REMOVE_ALL_TRANSFERS_FROM_STORE,
    REMOVE_TRANSFER_FROM_STORE,
    SET_LISTING_TRANSFER_REQUESTS
} from '../actions/transferListingActions';

export default function reducer(state = {}, action) {
    switch (action.type) {
        case REMOVE_ALL_TRANSFERS_FROM_STORE: {
            return {
                ...state,
                listingsToTransfer: state.listingsToTransfer.filter(listing => false),
            }
        }
        case REMOVE_TRANSFER_FROM_STORE: {
            return {
                ...state,
                listingsToTransfer: state.listingsToTransfer.filter(listing => listing._id != action.listingId)
            }
        }
        case SET_LISTING_TRANSFER_REQUESTS: {
            return {
                ...state,
                listingsToTransfer: action.listingsToTransfer,
            }
        }
        default: return state;
    }
}