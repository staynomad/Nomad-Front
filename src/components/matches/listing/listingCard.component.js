import React, { useState, useEffect } from 'react';
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

const DeleteButton = withStyles((theme) => ({
  root: {
    color: "red",
    backgroundColor: "transparent",
    border: "2px solid red",
    borderRadius: "8px",
    font: "inherit",
    fontSize: "16px",
    fontWeight: "normal",
  },
}))(Button);

const ListingCard = (props) => {
  const [rating, setRating] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { listing } = props;

  useEffect(() => {
    getAverageRating();
  });

  const handleDeleteListing = () => {
    props.deleteListingById(props.userSession.token, listing._id)
  };

  const getAverageRating = () => {
    if (listing.rating) {
      let total = 0
      let count = 0
      const entries = Object.entries(listing.rating)
      for (let i = 0; i < entries.length; i++) {
        total += parseInt(entries[i][1].stars)
        count++
      }
      setRating(`${String(parseFloat(total / count).toFixed(1))} / 5`)
    }
    else {
      setRating('No ratings yet!')
    }
  }

  return (
    <div className='listing-item'>
      <NavLink to={'/listing/' + listing._id}>
        {confirmDelete ? (
          <>
            <div>Are you sure you want to delete this listing?</div>
            <br />
          </>
        ) : (
            <>
              <div className='listing-information'>
                <img className='listing-image' src={listing.pictures[0]} alt={listing.title} />
                <div>
                  <b>{listing.title}</b>
                </div>
                <div>
                  <b>Details:</b> {listing.details.beds > 1 ? `${listing.details.beds} beds` : `${listing.details.beds} bed`}  {listing.details.baths > 1 ? `${listing.details.baths} baths` : `${listing.details.baths} bath`}
                </div>
                <div>
                  <b>Rating:</b> {rating}
                </div>
                <div>
                  <b>Price:</b> ${(listing.price + listing.tax).toFixed(2)}/night
            </div>
                <div className="spacer_xxs" />
              </div>
            </>
          )}
      </NavLink>
      <div>
        {
          confirmDelete ? (
            <>
              <CustomButton onClick={() => setConfirmDelete(false)}>Cancel</CustomButton>
              <DeleteButton onClick={handleDeleteListing}>Confirm Delete</DeleteButton>
            </>
          ) : (
              <>
                {props.userSession && props.userSession.userId === listing.userId ? (
                  <CustomButton onClick={() => props.history.push(`/editListing/${listing._id}`)}>Edit</CustomButton>
                ) : null}
                {props.userSession && props.userSession.userId === listing.userId ? (
                  <CustomButton onClick={() => setConfirmDelete(true)}>Delete</CustomButton>
                ) : null}
              </>
            )
        }

      </div>
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
