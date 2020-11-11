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

    if (searchRes.statusText === 'OK') {
        const { filteredListings } = await searchRes.data;
        dispatch(setSearchListings(filteredListings));
    };
};

export const searchAllListings = () => async dispatch => {
    const searchAllRes = await handleReq("/listings", "GET");

    if (searchAllRes.statusText === 'OK') {
        const { listings } = await searchAllRes.data;
        console.log(listings)
        dispatch(setSearchListings(listings))
    };
};

export const searchUserListings = (token) => async dispatch => {
    const headers = { "Authorization": `Bearer ${token}` }
    const searchUserRes = await handleReq("/listings/byUserId", "GET", headers)

    if (searchUserRes.statusText === 'OK') {
        const { userListings } = await searchUserRes.data;
        dispatch(setUserListings(userListings));
    };
};