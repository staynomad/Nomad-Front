import handleReq from "../../utils/fetchRequest.js";

/* Types */
export const SET_SEARCH_LISTINGS = 'VHomes/listings/SET_SEARCH_LISTINGS';
export const SET_USER_LISTINGS = 'VHomes/listings/SET_USER_LISTINGS';
export const DELETE_LISTING = 'VHomes/listings/DELETE_LISTING';
export const SET_EDIT_LISTING = 'VHomes/listings/SET_EDIT_LISTING';

/* Actions */
const setSearchListings = listings => ({ type: SET_SEARCH_LISTINGS, listings });
const setUserListings = listings => ({ type: SET_USER_LISTINGS, listings });
const deleteListing = listingId => ({ type: DELETE_LISTING, listingId })
const setEditListing = listing => ({ type: SET_EDIT_LISTING, listing })

/* Fetch Calls */
export const searchForListings = (itemToSearch) => async dispatch => {
    const headers = { "Content-Type": "application/json" };
    const searchRes = await handleReq("/listings/search", "POST", headers, { itemToSearch });

    if (searchRes.statusText === 'OK') {
        const { filteredListings } = await searchRes.data;
        dispatch(setSearchListings(filteredListings));
    };
};

export const searchAllListings = () => async dispatch => {
    const searchAllRes = await handleReq("/listings", "GET");

    if (searchAllRes.statusText === 'OK') {
        const { listings } = await searchAllRes.data;
        dispatch(setSearchListings(listings))
    };
};

export const searchFilteredListings = (filterState) => async dispatch => {
    const headers = { 'Content-Type': 'application/json' };
    const searchAllRes = await handleReq("/listings/filteredListings", "POST", headers, filterState);

    if (searchAllRes.statusText === 'OK') {
        const { listings } = await searchAllRes.data;
        dispatch(setSearchListings(listings))
    };
}

export const searchUserListings = (token) => async dispatch => {
    const headers = { "Authorization": `Bearer ${token}` };
    const searchUserRes = await handleReq("/listings/byUserId", "GET", headers)

    if (searchUserRes.statusText === 'OK') {
        const { userListings } = await searchUserRes.data;
        dispatch(setUserListings(userListings));
    };
};

export const getListingById = (listingId) => async dispatch => {
    const searchListingRes = await handleReq(`/listings/byId/${listingId}`, "GET")

    if (searchListingRes.statusText === 'OK') {
        const { listing } = await searchListingRes.data;
        dispatch(setEditListing(listing));
    };
}

export const deleteListingById = (token, listingId) => async dispatch => {
    const headers = { "Authorization": `Bearer ${token}` };
    const deleteListingRes = await handleReq(`/listings/delete/${listingId}`, "DELETE", headers);

    if (deleteListingRes.statusText === 'OK') {
        dispatch(deleteListing(listingId));
    };
};