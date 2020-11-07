import { SET_SEARCH_LISTINGS, SET_USER_LISTINGS } from '../actions/searchListingActions';

export default function reducer(state = {}, action) {
    switch (action.type) {
        case SET_SEARCH_LISTINGS: {
            return {
                ...state,
                searchListingsRes: action.listings,
            }
        }
        case SET_USER_LISTINGS: {
            return {
                ...state,
                userListings: action.listings,
            }
        }
        default: return state;
    }
}