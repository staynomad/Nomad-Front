import handleReq from "../utils/fetchRequest.js";

const SET_SEARCH_LISTINGS = 'VHomes/search/SEARCH_LISTINGS';

const setSearchListings = listings => ({ type: SET_SEARCH_LISTINGS, listings })

export const searchListings = (itemToSearch) => async dispatch => {
    const headers = { "Content-Type": "application/json" };
    const searchRes = await handleReq("/search", "POST", headers, itemToSearch);

    if (searchRes.ok) {
        const { filteredListings } = await searchRes.json();
        dispatch(setSearchListings(filteredListings));
    };
}

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