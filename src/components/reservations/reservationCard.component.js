import React from "react";
import { app } from "../../utils/axiosConfig.js";
import Button from "@material-ui/core/Button";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import "../matches/listing/listings.css";

import {
  checkInToReservation,
  checkOutOfReservation,
} from "../../redux/actions/reservationActions";

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

class ReservationCard extends React.Component {
  constructor(props) {
    super(props);
    this.loading = props.loading;
    this.reservation = props.reservation;
    this.state = {
      checkState: false,
      confirmCheck: false,
      listing: null,
    };
  }

  componentDidMount() {
    /* Converted listing to listingId in db for readability -> tempt fix */
    const varToUse = this.reservation.listingId
      ? this.reservation.listingId
      : this.reservation.listing;
    if (this.reservation.active) {
      app
        .get("/listings/byId/" + varToUse)
        .then((res) => {
          this.setState({ listing: res.data.listing });
        })
        .catch((err) => {
          // alert('Unable to retrieve some reservations.')
        });
    }
  }

  handleCheckConfirm = (e) => {
    e.stopPropagation();
    e.preventDefault();
    this.setState({ ...this.state, confirmCheck: false });
    if (this.state.checkState === "out") {
      // this.props.setReviewListingId(this.reservation.listing);
      // this.props.setReviewModal(true);
      return this.props.checkOutOfReservation(
        this.props.userSession.token,
        this.reservation._id
      );
    }
    if (this.state.checkState === "in")
      return this.props.checkInToReservation(
        this.props.userSession.token,
        this.reservation._id
      );
  };

  render() {
    const checkInDate = new Date(this.reservation.days[0]),
      checkInMonth = "" + (checkInDate.getMonth() + 1),
      checkInDay = "" + checkInDate.getDate(),
      checkInYear = checkInDate.getFullYear();
    const checkOutDate = new Date(this.reservation.days[1]),
      checkOutMonth = "" + (checkOutDate.getMonth() + 1),
      checkOutDay = "" + checkOutDate.getDate(),
      checkOutYear = checkOutDate.getFullYear();

    return (
      <>
        {this.reservation.active ? (
          !this.state.listing ? (
            <div id="spinner"></div>
          ) : (
            <div className="reservation-card-container">
              <NavLink to={"/listing/" + this.state.listing._id}>
                <div className="reservation-card-information">
                  <img
                    className="reservation-card-image"
                    src={this.state.listing.pictures[0]}
                    alt={this.state.listing.title}
                  />
                  <h2>{this.state.listing.title}</h2>
                  {this.state.listing.location.street},{" "}
                  {this.state.listing.location.city},{" "}
                  {this.state.listing.location.state},{" "}
                  {this.state.listing.location.zipcode}
                  <div>
                    <b>Check-In: </b>{" "}
                    {`${checkInMonth}-${checkInDay}-${checkInYear}`} <br />
                    <b>Check-Out: </b>{" "}
                    {`${checkOutMonth}-${checkOutDay}-${checkOutYear}`}
                  </div>
                  <div className="spacer_xxs" />
                  {this.state.confirmCheck ? (
                    <React.Fragment>
                      <div>Confirm check in / out?</div>
                      <React.Fragment>
                        <CustomButton
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            this.setState({ confirmCheck: false });
                          }}
                        >
                          Cancel
                        </CustomButton>
                        <CustomButton onClick={this.handleCheckConfirm}>
                          Confirm
                        </CustomButton>
                      </React.Fragment>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      {checkOutDate > new Date().getTime() ||
                      this.props.reservation.checkedIn ? (
                        <React.Fragment>
                          {this.props.userSession &&
                          this.props.userSession.userId ===
                            this.reservation.user &&
                          !this.props.reservation.checkedIn ? (
                            <button
                              className="listing-card-button"
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                this.setState({ confirmCheck: true });
                                this.setState({ checkState: "in" });
                              }}
                            >
                              {!this.loading ? (
                                "Check-in"
                              ) : (
                                <div id="spinner" />
                              )}
                            </button>
                          ) : (
                            <>{/* Render an unclickable button */}</>
                          )}
                          {this.props.userSession &&
                          this.props.userSession.userId ===
                            this.reservation.user &&
                          this.props.reservation.checkedIn ? (
                            <button
                              className="listing-card-button"
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                this.setState({ confirmCheck: true });
                                this.setState({ checkState: "out" });
                              }}
                            >
                              {!this.loading ? (
                                "Check-Out"
                              ) : (
                                <div id="spinner" />
                              )}
                            </button>
                          ) : null}
                        </React.Fragment>
                      ) : (
                        <p>Expired</p>
                      )}
                    </React.Fragment>
                  )}
                </div>
              </NavLink>
            </div>
          )
        ) : null}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const stateToReturn = { ...state, loading: state.Loading.loading };
  if (state.Login.userInfo)
    stateToReturn["userSession"] = state.Login.userInfo.session;
  return stateToReturn;
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkInToReservation: (token, reservationId) =>
      dispatch(checkInToReservation(token, reservationId)),
    checkOutOfReservation: (token, reservationId) =>
      dispatch(checkOutOfReservation(token, reservationId)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ReservationCard)
);
