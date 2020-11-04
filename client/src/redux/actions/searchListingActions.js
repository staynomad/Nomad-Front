import handleReq from "../../utils/fetchRequest.js";

/* Types */
export const SET_SEARCH_LISTINGS = 'VHomes/search/SEARCH_LISTINGS';

/* Actions */
const setSearchListings = listings => ({ type: SET_SEARCH_LISTINGS, listings })

/* Fetch Calls */
export const searchListings = (itemToSearch) => async dispatch => {
    const headers = { "Content-Type": "application/json" };
    const searchRes = await handleReq("/search", "POST", headers, itemToSearch);

    if (searchRes.ok) {
        const { filteredListings } = await searchRes.json();
        dispatch(setSearchListings(filteredListings));
    };
}

export const searchAllListings = () => async dispatch => {
    const searchAllRes = await handleReq("/listings", "GET");

    if (searchAllRes.ok) {
        const { listings } = await searchAllRes.json();
        dispatch(setSearchListings(listings))
    }
}