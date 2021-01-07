import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Pagination from '@material-ui/lab/Pagination';

import "./listings.css";
import ListingCard from './listingCard.component'
import { searchAllListings, searchForListings, searchFilteredListings } from "../../../redux/actions/searchListingActions";

class Listings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemsToDisplay: [],
      listings: [],
      page: 0,
      pageCount: 0,
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
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
      return this.handleSearch();
    };
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.searchListings && nextProps.searchListings !== prevState.listings) {
      const activeListings = nextProps.searchListings.filter((listing) => {
        // Split string to Year (idx 0), Month (idx 1), Day (idx 2) then convert to num
        const expireDate = listing.available[1].split('-').map(date => {
          return Number.parseInt(date, 10)
        });
        // Convert using to milliseconds
        const expireDateConverted = new Date(expireDate[0], expireDate[1] - 1, expireDate[2]).getTime();
        const curDate = new Date().getTime();
        // Compare to check if curDate is past expired
        let isExpired = curDate > expireDateConverted;
        if (isExpired) return false;
        else return true;
      });

      // Divide by number of items per page
      const pageCount = Math.ceil(activeListings.length / 10);
      // Display first 10 else max shown
      const itemsToDisplay = activeListings.length > 10 ? [0, 9] : [0, activeListings.length - 1];

      if (prevState && prevState.itemsToDisplay.length !== 0 && prevState.page !== 0) {
        const { itemsToDisplay, page } = prevState;
        console.log(itemsToDisplay, page)
        return {
          itemsToDisplay: itemsToDisplay,
          listings: activeListings,
          page: page,
          pageCount: pageCount
        }
      }

      return {
        itemsToDisplay: itemsToDisplay,
        listings: activeListings,
        page: 1,
        pageCount: pageCount
      }
    }
  };

  handlePageChange(event, page) {
    const startIdx = ((page - 1) * 10);
    const endIdx = ((page * 10) - 1) > this.state.listings.length ? this.state.listings.length : ((this.state.page * 10) - 1);

    this.setState({ itemsToDisplay: [startIdx, endIdx] });
  }

  render() {
    let listings = this.state.listings || null

    return (
      <div className="wow fadeInUp" data-wow-delay="0.5s">
        {this.state.listings ? (listings.length <= 0 ? <div><div className="spacer_s"></div>No listings yet!</div> :
          <div id='listing-content'>
            <div>Click on a listing to see more information!</div>
            {
              this.state.listings.map((listing, idx) => {
                if (idx >= this.state.itemsToDisplay[0] && idx <= this.state.itemsToDisplay[1])
                  return <ListingCard key={listing._id} listing={listing} />;
                else return null;
              })
            }
          </div>
        ) : null}
        <Pagination count={this.state.pageCount} onChange={this.handlePageChange} />
      </div>
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
