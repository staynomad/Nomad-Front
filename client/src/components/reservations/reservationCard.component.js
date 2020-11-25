import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';

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
  const [open, setOpen] = useState(false);
  const { reservation } = props;

  const handleOpenClose = () => {
    setOpen(!open);
  };

  const handleCheckIn = () => {
    props.checkInToReservation(props.userSession.token, reservation._id);
  };

  const handleCheckOut = () => {
    props.checkOutOfReservation(props.userSession.token, reservation._id);
  };

  return (
    <>
      { reservation.active ? (
        <div className='reservation-item' onClick={handleOpenClose}>
          <div className='reservation-information'>
            <div className='reservation-image'>reservation image here</div>
            <div>
              <b>Reservation Date:</b> {reservation.days[0]} - {reservation.days[1]}
            </div>
          </div>
          {props.userSession && props.userSession.userId === reservation.user && !props.reservation.checkedIn ? (
            <CustomButton onClick={handleCheckIn}>
              { !props.loading ? "Check-in" : <div id="spinner" />}
            </CustomButton>
          ) : (
              <>
                {/* Render an unclickable button */}
              </>
            )}
          {props.userSession && props.userSession.userId === reservation.user && props.reservation.checkedIn ? (
            <CustomButton onClick={handleCheckOut}>Check-out</CustomButton>
          ) : null}
        </div>
      ) : null}
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
    checkOutOfReservation: (token, reservationId) => (dispatch(checkOutOfReservation(token, reservationId))),
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(
  ReservationCard
));
