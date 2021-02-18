import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ListingCard from '../matches/listing/listingCard.component';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { getPopularListings } from "../../redux/actions/searchListingActions";
import './featuredListing.css'

/*const list = [
  { name: 'item1' },
  { name: 'item2' },
  { name: 'item3' },
  { name: 'item4' },
  { name: 'item5' },
  { name: 'item6' },
  { name: 'item7' },
  { name: 'item8' },
  { name: 'item9' }
];

// One item component
// selected prop will be passed
const MenuItem = ({text, selected}) => {
  return <div
    className={`menu-item ${selected ? 'active' : ''}`}
    >{text}</div>;
};

export const Menu = (list, selected) =>
  list.map(el => {
    const {name} = el;

    return <MenuItem text={name} key={name} selected={selected} />;
});*/

const MenuItem = ({listing, selected}) => {
  return <ListingCard
    className={`menu-item ${selected ? 'active' : ''}`}
    key={listing._id}
    listing={listing}
  />;
};

export const Menu = async (list, selected) => {
  list.map(listing => {
    return <MenuItem
      key={listing._id}
      listing={listing}
      selected={selected}
    />;
  });
}

const Arrow = ({ text, className }) => {
  return (
    <div
      className={className}
    >{text}</div>
  );
};


const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });

const selected = true;

class FeaturedListings extends Component {
  constructor(props) {
    super(props);
    // getPopularListings is not storing popular listings in redux store
    this.props.getPopularListings(5);
    const list = this.props.Listing.popularListings;
    this.menuItems = Menu(list, selected);
  }

  state = {
    selected
  };

  onSelect = key => {
    window.location = "/Matches"
  }


  render() {
    // Create menu from items
    const menu = this.menuItems;

    return (
      <div className="spacer_xl">
        <ScrollMenu
          data={menu}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          onSelect={this.onSelect}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const stateToReturn = { ...state };
  if (state.Listing.popularListings) stateToReturn["popularListings"] = state.Listing.popularListings;
  return stateToReturn;
};

const mapDispatchToProps = dispatch => {
  return {
    getPopularListings: (count) => dispatch(getPopularListings(count)),
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(
  FeaturedListings
));
