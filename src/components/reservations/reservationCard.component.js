import React, { useState, useEffect } from 'react';
import { app } from '../../utils/axiosConfig.js'
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import '../matches/listing/listings.css'

import { checkInToReservation, checkOutOfReservation } from '../../redux/actions/reservationActions';

const CustomButton = withStyles((theme) => ({
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

const ReservationCard = (props) => {
  const [listing, setListing] = useState(null);
  const [confirmCheck, setConfirmCheck] = useState(false);
  const [checkState, setCheckState] = useState(null);
  const { reservation } = props;

  useEffect(() => {
    app.get('/listings/byId/' + reservation.listing)
      .then((res) => {
        setListing(res.data)
      })
      .catch((err) => {
        alert('Unable to retrieve some reservations.')
      })
  }, [reservation.listing])

  const handleCheckConfirm = () => {
    setConfirmCheck(false);
    if (checkState === 'out') return props.checkOutOfReservation(props.userSession.token, reservation._id);
    if (checkState === 'in') return props.checkInToReservation(props.userSession.token, reservation._id);
  };

  return (
    <>
      { reservation.active ? (
        !listing ? <div id="spinner"></div>
          : (
            <div className='listing-item'>
              { confirmCheck ? (
                <>
                  <div>Confirm check in / out?</div>
                </>
              ) : (
                  <div className='listing-information'>
                    <img className='listing-image' src={listing.listing.pictures[0]} alt={listing.listing.title} />
                    <b>{listing.listing.title}</b>
                    {listing.listing.location.street}, {listing.listing.location.city}, {listing.listing.location.state}, {listing.listing.location.zipcode}, {listing.listing.location.country}
                    <div>
                      <b>Check-In: </b> {reservation.days[0].substring(5)} <br />
                      <b>Check-Out: </b> {reservation.days[1].substring(5)}
                    </div>
                  </div>
                )}
              <div className="spacer_xxs" />
              {
                confirmCheck ? (
                  <>
                    <CustomButton onClick={() => setConfirmCheck(false)}>Cancel</CustomButton>
                    <CustomButton onClick={handleCheckConfirm}>Confirm</CustomButton>
                  </>
                ) : (
                    <>
                      {props.userSession && props.userSession.userId === reservation.user && !props.reservation.checkedIn ? (
                        <CustomButton onClick={
                          () => {
                            setConfirmCheck(true);
                            setCheckState('in');
                          }}>
                          { !props.loading ? "Check-in" : <div id="spinner" />}
                        </CustomButton>
                      ) : (
                          <>
                            {/* Render an unclickable button */}
                          </>
                        )}
                      {props.userSession && props.userSession.userId === reservation.user && props.reservation.checkedIn ? (
                        <CustomButton onClick={
                          () => {
                            setConfirmCheck(true);
                            setCheckState('out');
                          }}>
                          { !props.loading ? "Check-Out" : <div id="spinner" />}
                        </CustomButton>
                      ) : null}
                    </>
                  )
              }
            </div>
          )) : null}
    </>
  )
};

const mapStateToProps = state => {
  const stateToReturn = { ...state, loading: state.Loading.loading };
  if (state.Login.userInfo) stateToReturn['userSession'] = state.Login.userInfo.session;
  return stateToReturn;
};

const mapDispatchToProps = dispatch => {
  return {
    checkInToReservation: (token, reservationId) => (dispatch(checkInToReservation(token, reservationId))),
    checkOutOfReservation: (token, reservationId) => (dispatch(checkOutOfReservation(token, reservationId)))
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(
  ReservationCard
));
