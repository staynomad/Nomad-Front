import handleReq from "../../utils/fetchRequest.js";

/* Types */
export const SET_SEARCH_LISTINGS = 'VHomes/listings/SET_SEARCH_LISTINGS';
export const SET_USER_LISTINGS = 'VHomes/listings/SET_USER_LISTINGS';

/* Actions */
const setSearchListings = listings => ({ type: SET_SEARCH_LISTINGS, listings });
const setUserListings = listings => ({ type: SET_USER_LISTINGS, listings });

/* Fetch Calls */
export const searchListings = (itemToSearch) => async dispatch => {
    const headers = { "Content-Type": "application/json" };
    const searchRes = await handleReq("/listings/search", "POST", headers, itemToSearch);

    if (searchRes.ok) {
        const { filteredListings } = await searchRes.json();
        dispatch(setSearchListings(filteredListings));
    };
};

export const searchAllListings = () => async dispatch => {
    const searchAllRes = await handleReq("/listings", "GET");

    if (searchAllRes.ok) {
        const { listings } = await searchAllRes.json();
        dispatch(setSearchListings(listings))
    };
};

export const searchUserListings = (token) => async dispatch => {
    const headers = { "Authorization": `Bearer ${token}` }
    const searchUserRes = await handleReq("/listings/byUserId", "GET", headers)

    if (searchUserRes.ok) {
        const { userListings } = await searchUserRes.json();
        dispatch(setUserListings(userListings));
    };
};