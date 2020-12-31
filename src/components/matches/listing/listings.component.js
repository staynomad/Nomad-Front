import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import "./listings.css";
import ListingCard from './listingCard.component'
import { searchAllListings, searchForListings, searchFilteredListings } from "../../../redux/actions/searchListingActions";

class Listings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listings: [],
    };

    this.handleSearch = this.handleSearch.bind(this);
  };

  handleSearch() {
    const filter = this.props.listingFilterState;
    var filterClicked = filter.minGuestsClicked || filter.minRatingClicked || filter.startingPriceClicked;

    if (this.props.location.search) {
      /* Get listing using search term */
      const itemToSearch = this.props.location.search.slice(1);
      this.props.searchForListings(itemToSearch);
    } else if (filterClicked) {
      /* Get listing using listing filter */
      this.props.searchFilteredListings(filter);
    } else {
      /* Get all listings */
      this.props.searchAllListings();
    }
  }

  componentDidMount() {
    this.handleSearch();
  };

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location || this.props.listingFilterState !== prevProps.listingFilterState) {
      this.handleSearch();
    };
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.searchListings !== prevState.listings) {
      return {
        listings: nextProps.searchListings
      }
    }
  }

  render() {
    var listings = this.state.listings || null
    return (
      <>
        {this.state.listings ? (listings.length <= 0 ? <div><div className="spacer_s"></div>No listings yet!</div> :
          <div id='listing-content'>
            <div><div className="spacer_s"></div>Click on a listing to see more information!</div>
            {this.state.listings.map((listing) => {
              // Split string to Year (idx 0), Month (idx 1), Day (idx 2) then convert to num
              const expireDate = listing.available[1].split('-').map(date => {
                return Number.parseInt(date, 10)
              });
              // Convert using to milliseconds
              const expireDateConverted = new Date(expireDate[0], expireDate[1] - 1, expireDate[2]).getTime();
              const curDate = new Date().getTime();
              // Compare to check if curDate is past expired
              let isExpired = curDate > expireDateConverted;
              if (isExpired) return null;
              else return (
                <ListingCard key={listing._id} listing={listing} />
              )
            })}
          </div>
        ) : null}
      </>
    );
  }


};

const mapStateToProps = state => {
  return {
    searchListings: state.Listing.searchListings,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchAllListings: () => dispatch(searchAllListings()),
    searchForListings: (itemToSearch) => dispatch(searchForListings(itemToSearch)),
    searchFilteredListings: (filter) => dispatch(searchFilteredListings(filter))
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(
  Listings
));
