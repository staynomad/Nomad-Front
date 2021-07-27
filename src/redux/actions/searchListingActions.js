import handleReq from "../../utils/fetchRequest.js";
import { setLoadingTrue, setLoadingFalse } from "./loadingActions";

/* Types */
export const SET_MAP_LISTINGS = "VHomes/listings/SET_MAP_LISTINGS";
export const SET_SEARCH_LISTINGS = "VHomes/listings/SET_SEARCH_LISTINGS";
export const SET_USER_LISTINGS = "VHomes/listings/SET_USER_LISTINGS";
export const DELETE_LISTING = "VHomes/listings/DELETE_LISTING";
export const SET_EDIT_LISTING = "VHomes/listings/SET_EDIT_LISTING";
export const SET_POPULAR_LISTINGS = "VHomes/listings/SET_POPULAR_LISTINGS";
export const SET_EXPLORE_NEAR_YOU = "VHomes/listings/SET_EXPLORE_NEAR_YOU";
export const SET_EXPLORE_BUDGET = "VHomes/listings/SET_EXPLORE_BUDGET";
export const SET_FAMILY_LISTINGS = "VHomes/listings/SET_FAMILY_LISTINGS";

/* Actions */
const setSearchListings = (listings) => ({
  type: SET_SEARCH_LISTINGS,
  listings,
});
const setUserListings = (listings) => ({ type: SET_USER_LISTINGS, listings });
const deleteListing = (listingId) => ({ type: DELETE_LISTING, listingId });
const setEditListing = (listing) => ({ type: SET_EDIT_LISTING, listing });
const setMapListings = (listings) => ({ type: SET_MAP_LISTINGS, listings });
const setPopularListings = (listings) => ({
  type: SET_POPULAR_LISTINGS,
  listings,
});
const setExploreNearYou = (listings) => ({
  type: SET_EXPLORE_NEAR_YOU,
  listings,
});
const setExploreBudget = (listings) => ({ type: SET_EXPLORE_BUDGET, listings });
const setFamilyListings = (listings) => ({
  type: SET_FAMILY_LISTINGS,
  listings,
});

/* Fetch Calls */
export const searchForListings = (itemToSearch) => async (dispatch) => {
  const headers = { "Content-Type": "application/json" };
  const searchRes = await handleReq("/listings/search", "POST", headers, {
    itemToSearch,
  });

  if (searchRes.status === 200) {
    const { filteredListings } = await searchRes.data;
    dispatch(setSearchListings(filteredListings));
  } else {
    alert("No matches were found.");
  }
};

export const searchAllListings = () => async (dispatch) => {
  const searchAllRes = await handleReq("/listings/active", "GET");

  if (searchAllRes.status === 200) {
    const { listings } = await searchAllRes.data;
    dispatch(setSearchListings(listings));
  }
};

// if explore is true, store res in different location in redux store
export const searchFilteredListings = (filterState) => async (dispatch) => {
  const headers = { "Content-Type": "application/json" };
  const searchAllRes = await handleReq(
    "/listings/filteredListings",
    "GET",
    headers,
    filterState
  );

  if (searchAllRes.status === 200) {
    const { listings } = await searchAllRes.data;
    dispatch(setSearchListings(listings));
  }
};

export const searchFamilyListings = (filterState) => async (dispatch) => {
  const headers = { "Content-Type": "application/json" };
  const searchAllRes = await handleReq(
    "/listings/filteredListings",
    "POST",
    headers,
    filterState
  );

  if (searchAllRes.status === 200) {
    const { listings } = await searchAllRes.data;
    dispatch(setFamilyListings(listings));
  }
};

export const searchBudgetListings = (filterState) => async (dispatch) => {
  const headers = { "Content-Type": "application/json" };
  const searchAllRes = await handleReq(
    "/listings/filteredListings",
    "POST",
    headers,
    filterState
  );

  if (searchAllRes.status === 200) {
    const { listings } = await searchAllRes.data;
    dispatch(setExploreBudget(listings));
  }
};

export const searchUserListings = (userId) => async (dispatch) => {
  const searchUserRes = await handleReq(`/listings/byUserId/${userId}`, "GET");

  if (searchUserRes.status === 200) {
    const { userListings } = await searchUserRes.data;
    dispatch(setUserListings(userListings));
  }
};

export const getListingById = (listingId) => async (dispatch) => {
  dispatch(setLoadingTrue());
  const searchListingRes = await handleReq(
    `/listings/byId/${listingId}`,
    "GET"
  );

  if (searchListingRes.status === 200) {
    const { listing } = await searchListingRes.data;
    dispatch(setLoadingFalse());
    dispatch(setEditListing(listing));
  }
};

export const deleteListingById = (token, listingId) => async (dispatch) => {
  const headers = { Authorization: `Bearer ${token}` };
  const deleteListingRes = await handleReq(
    `/listings/delete/${listingId}`,
    "DELETE",
    headers
  );

  if (deleteListingRes.status === 200) {
    dispatch(deleteListing(listingId));
  }
};

// if explore is true, store res in different location in redux store
export const getListingInRadius =
  (lat, lng, radius, explore) => async (dispatch) => {
    // Radius in miles -> converting to km
    const radiusInKilometers = radius * 1.609344;
    const locationData = {
      lat,
      lng,
      radiusInKilometers,
    };

    const searchListingRes = await handleReq(
      `/listings/byRadius`,
      "GET",
      undefined,
      undefined,
      locationData
    );

    if (searchListingRes.status === 200) {
      const { listingsInRadius } = await searchListingRes.data;
      if (explore) {
        dispatch(setExploreNearYou(listingsInRadius));
      } else {
        dispatch(setMapListings(listingsInRadius));
      }
    }
  };

export const getPopularListings = (count) => async (dispatch) => {
  // Return count listings sorted by popularity
  const searchListingRes = await handleReq(
    `/listings/popularListings/${count}`,
    "GET"
  );

  if (searchListingRes.status === 200) {
    let popularListings = [];
    for (let i = 0; i < searchListingRes.data.listings.length; i++) {
      const listingData = await handleReq(
        `/listings/byId/${searchListingRes.data.listings[i].listingId}`,
        "GET"
      );
      if (listingData && listingData.status === 200) {
        popularListings.push(listingData.data.listing);
      }
    }
    dispatch(setPopularListings(popularListings));
  }
};
