import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import "./listings.css";
import ListingCard from './listingCard.component'
import { searchAllListings, searchListings } from "../../../redux/actions/searchListingActions";

class Listings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listings: [],
    };

    this.handleSearch = this.handleSearch.bind(this);
  };

  handleSearch() {
    if (this.props.location.search) {
      /* Get listing using search term */
      const itemToSearch = this.props.location.search.slice(1);
      this.props.searchListings(itemToSearch);
    } else {
      /* Get all listings */
      const filterState = this.props.listingFilterState;
      console.log ('filter state should be: ', filterState);
      this.props.searchAllListings(filterState);
    };
  }

  componentDidMount() {
    this.handleSearch();
    console.log("in listings component. props: ", this.props)
  };

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
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
    searchAllListings: (filterState) => dispatch(searchAllListings(filterState)),
    searchListings: (itemToSearch) => dispatch(searchListings(itemToSearch)),
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(
  Listings
));
