import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
// import { Modal, DialogContent } from '@material-ui/core/';
// import ListingsModal from './listingsmodal.component';
import { deleteListingById } from '../../../redux/actions/searchListingActions';

export const CustomButton = withStyles((theme) => ({
  root: {
    color: "#00B183",
    backgroundColor: "transparent",
    border: "2px solid #00B183",
    borderRadius: "8px",
    font: "inherit",
    fontSize: "16px",
    fontWeight: "normal",
  },
}))(Button);

const ListingCard = (props) => {
  const [open, setOpen] = useState(false);
  const { listing } = props;

  const handleOpenClose = () => {
    setOpen(!open);
  };

  const handleDeleteListing = () => {
    props.deleteListingById(props.userSession.token, listing._id)
  };

  return (
    <div className='listing-item' onClick={handleOpenClose}>
      <NavLink to={'/listing/' + listing._id}>
        <div className='listing-information'>
          <div className='listing-image'>listing image here</div>
          <div>
            <b>{listing.description}</b>
          </div>
          <div>
            <b>Details:</b> {listing.details.beds > 1 ? `${listing.details.beds} beds` : `${listing.details.beds} bed`}  {listing.details.baths > 1 ? `${listing.details.baths} baths` : `${listing.details.baths} bath`}
          </div>
          <div>
            <b>Rating:</b> {listing.rating.user} / 5
            </div>
          <div>
            <b>Price:</b> ${listing.price}/night
          </div>
        </div>
      </NavLink>
      {props.userSession && props.userSession.userId === listing.userId ? (
        <CustomButton onClick={() => props.history.push(`/editListing/${listing._id}`)}>Edit</CustomButton>
      ) : null}
      {props.userSession && props.userSession.userId === listing.userId ? (
        <CustomButton onClick={handleDeleteListing}>Delete</CustomButton>
      ) : null}
    </div>
  )
};

const mapStateToProps = state => {
  const stateToReturn = {};
  if (state.Login.userInfo) stateToReturn['userSession'] = state.Login.userInfo.session;
  if (state.Listing.userListings) stateToReturn['userListings'] = state.Listing.userListings;
  return stateToReturn;
};

const mapDispatchToProps = dispatch => {
  return {
    deleteListingById: (token, listingId) => dispatch(deleteListingById(token, listingId)),
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(
  ListingCard
));
