import React, { useState, useEffect } from "react";
import { withRouter  } from "react-router-dom";
import {connect} from "react-redux";
import handleReq from "../../../utils/fetchRequest";
import "./listings.css";
import ListingCard from './listingCard.component'

import { searchListings } from "../../../redux/search";

const Listings = (props) => {
  const [listings, setListings] = useState([]);
  const { location, searchListingsRes } = props;

  useEffect(() => {
    if (location.search && !props.searchListingsRes) {
      const itemToSearch = props.location.search.slice(1);
      props.searchListings({itemToSearch});
    } else if (location.search && props.searchListingsRes) {
      setListings(props.searchListingsRes);
    } else {
      handleReq("/listings", "GET")
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        if (res.errors) {
          return alert(res.errors[0]);
        }

        if (res.body) {
          setListings(res.body);
        }
      });
    }
  }, [location.search, searchListingsRes]);

  return (
    <div id='listing-content'>
      {listings.map((listing) => (
        <ListingCard listing={listing} />
      ))}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    searchListingsRes: state.search.searchListingsRes,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchListings: (itemToSearch) => dispatch(searchListings(itemToSearch)),
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(
  Listings
));
