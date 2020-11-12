import {
    DELETE_LISTING,
    SET_SEARCH_LISTINGS,
    SET_USER_LISTINGS
} from '../actions/searchListingActions';

export default function reducer(state = {}, action) {
    switch (action.type) {
        case SET_SEARCH_LISTINGS: {
            return {
                ...state,
                searchListings: action.listings,
            }
        }
        case SET_USER_LISTINGS: {
            return {
                ...state,
                userListings: action.listings,
            }
        }
        case DELETE_LISTING: {
            const stateToReturn = { ...state };
            if (state.searchListings) stateToReturn['searchListings'] = state.searchListings.filter(listing => listing._id !== action.listingId);
            if (state.userListings) stateToReturn['userListings'] = state.userListings.filter(listing => listing._id !== action.listingId);
            return stateToReturn;
        }
        default: return state;
    }
}