import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import "./listings.css";
import ListingCard from './listingCard.component'
import { searchAllListings, searchListings, searchFilteredListings } from "../../../redux/actions/searchListingActions";

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
      this.props.searchListings(itemToSearch);
    } else if (filterClicked) {
      /* Get listing using listing filter */
      this.props.searchFilteredListings(filter);
    } else {
      /* Get all listings */
      this.props.searchAllListings();
    };
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
    if (nextProps.searchListingsRes !== prevState.listings) {
      return {
        listings: nextProps.searchListingsRes
      }
    }
  }

  render() {
    return (
      <>
        {this.state.listings ? (
          <div id='listing-content'>
            {this.state.listings.map((listing) => (
              <ListingCard key={listing} listing={listing} />
            ))}
          </div>
        ) : null}
      </>
    );
  }


};

const mapStateToProps = state => {
  return {
    searchListingsRes: state.Listing.searchListingsRes,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchAllListings: () => dispatch(searchAllListings()),
    searchListings: (itemToSearch) => dispatch(searchListings(itemToSearch)),
    searchFilteredListings: (filter) => dispatch(searchFilteredListings(filter))
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(
  Listings
));
