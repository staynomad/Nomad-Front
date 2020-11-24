import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';

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

  return (
    <div className='reservation-item' onClick={handleOpenClose}>
      <div className='reservation-information'>
        <div className='reservation-image'>reservation image here</div>
        <div>
          <b>Reservation Date:</b> {reservation.days[0]} - {reservation.days[1]}
        </div>
      </div>
      {props.userSession && props.userSession.userId === reservation.user ? (
        <CustomButton>Check-in</CustomButton>
      ) : null}
      {props.userSession && props.userSession.userId === reservation.user ? (
        <CustomButton>Check-out</CustomButton>
      ) : null}
    </div>
  )
};

const mapStateToProps = state => {
  const stateToReturn = {};
  if (state.Login.userInfo) stateToReturn['userSession'] = state.Login.userInfo.session;
  return stateToReturn;
};

const mapDispatchToProps = dispatch => {
  return {

  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(
  ReservationCard
));
