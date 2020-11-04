import { SET_SEARCH_LISTINGS } from '../actions/searchListingActions';

export default function reducer(state = {}, action) {
    switch (action.type) {
        case SET_SEARCH_LISTINGS: {
            return {
                ...state,
                searchListingsRes: action.listings,
            }
        }
        default: return state;
    }
}