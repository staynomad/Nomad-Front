import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
// import { Modal, DialogContent } from '@material-ui/core/';
// import ListingsModal from './listingsmodal.component';
import { deleteListingById } from '../../../redux/actions/searchListingActions';
import "./explore.css"

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
  const { listing } = props;
  const [rating, setRating] = useState("");
  const [numReviews, setNumReviews] = useState(0);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [coverPhoto, setCoverPhoto] = useState(listing.pictures[0])

  useEffect(() => {
    getAverageRating();
  });

  const onPhotoError = () => {
    setCoverPhoto("/images/default_listing.jpg")
  }

  const handleDeleteListing = (e) => {
    e.stopPropagation();
    e.preventDefault();
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
      setRating(parseFloat(total / count).toFixed(1))
      setNumReviews(count)
    }
    else {
      setRating('No ratings yet!')
    }
  }

  var stars = []
  for (let i = 0; i < parseInt(rating); i++) {
    stars.push(<span className="fa fa-star checked"></span>)
  }
  if (stars.length === 0) {
    stars = "No reviews yet. "
  }

  var empty_stars = []
  for (let i = 0; i < 5 - parseInt(rating); i++) {
    empty_stars.push(<span className="fa fa-star"></span>)
  }

  return (
    <>
      <NavLink to={'/listing/' + listing._id}>
            <>
            <div className='listing-item wow fadeInUp' data-wow-delay="0.5s">
              <div className="list-card">
                <img src={coverPhoto} alt={listing.title} className="list-img" onError={onPhotoError}/>
                    <div className="list-card-content">
                    <div className="list-title">{listing.title}</div>
                   <div className="icon-inline" >
                    <img src = 'images/guest.svg' class="list-icon" alt="guests" />
                    <span className="detail">{listing.details.maxpeople} Guest</span>
                  </div>
                   <div className="icon-inline">
                    <img src = 'images/bed.svg' class="list-icon" alt="beds" />
                      <span className="detail">{listing.details.beds} Beds</span>
                  </div>
                   <div className="icon-inline">
                    <img src = 'images/bath.svg' className="list-icon" alt="baths" />
                      <span className="detail">{listing.details.baths} Bath</span>
                  </div>
                  <div className="rating">
                  {stars}
                  {empty_stars}
                   <span>({numReviews})</span>
                   </div>
                  <div className="price-inline" >
                  <div className="price"> ${listing.price} <span className="list-text">/ night</span></div>
                  </div>
                  </div>
                  <div>
                  {confirmDelete ? (
                    <>
                      <>
                        <CustomButton onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          setConfirmDelete(false)
                        }
                        }>Cancel</CustomButton>
                        <DeleteButton onClick={handleDeleteListing}>Confirm Delete</DeleteButton>
                      </>
                    </>
                  ) :
                    <>
                    {props.userSession && props.userSession.userId === listing.userId ? (
                      <CustomButton onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        props.history.push(`/editListing/${listing._id}`)
                      }}>Edit</CustomButton>
                    ) : null}
                    {props.userSession && props.userSession.userId === listing.userId ? (
                      <CustomButton onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setConfirmDelete(true)
                      }}>Delete</CustomButton>
                    ) : null}
                    </>
                 }
                </div>
                </div>
              </div>
            </>
      </NavLink>
    </>
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
