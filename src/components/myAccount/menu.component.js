import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { Menu } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import ListingCard from "../matches/listing/listingCard.component";
import ListingsComponent from "../matches/listing/listings.component";
import Profile from "./profile.component";
import ReservationCard from "../reservations/reservationCard.component";
import Settings from "./settings.component";
import {
  acceptListingTransfer,
  rejectListingTransfer,
} from "../../redux/actions/transferListingActions";
import { getListingTranferRequests } from "../../redux/actions/transferListingActions";
import { searchUserListings } from "../../redux/actions/searchListingActions";
import { searchUserReservations } from "../../redux/actions/reservationActions";
import "semantic-ui-css/semantic.min.css";
import "./menu.css";

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

class LeftMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "profile",
      hideExpired: false,
      render: "profile",
      sortAnchorEl: null,
      mobileNav: false,
    };
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleExpiredToggle = this.handleExpiredToggle.bind(this);
  }

  componentDidMount() {
    if (!this.props.userSession) {
      alert("Please log in to view your profile.");
      return this.props.history.push("/login");
    }
    window.scrollTo(0, 0);
  }

  handleItemClick(e, { name, compname }) {
    this.setState({ activeItem: name, render: compname, mobileNav: false });
  }

  handleExpiredToggle() {
    return this.state.hideExpired
      ? this.setState({ hideExpired: false })
      : this.setState({ hideExpired: true });
  }

  _renderSubComp() {
    switch (this.state.render) {
      case "profile":
        if (this.props.userSession) {
          return <Profile />;
        } else return null;
      case "my listings":
        return <ListingsComponent searchOnlyUser={true} />;
      case "my reservations":
        let reservations = {
          active: [],
          expired: [],
        };
        const { userReservations } = this.props;

        if (this.props.userReservations) {
          userReservations.forEach((reservation) => {
            // Split string to Year (idx 0), Month (idx 1), Day (idx 2) then convert to num
            const expireDate = reservation.days[1].split("-").map((date) => {
              return Number.parseInt(date, 10);
            });
            // Convert using to milliseconds
            const expireDateConverted = new Date(
              expireDate[0],
              expireDate[1] - 1,
              expireDate[2]
            ).getTime();
            const curDate = new Date().getTime();
            // Compare to check if curDate is past expired
            let isExpired = curDate > expireDateConverted;
            if (!reservation.active) isExpired = true;

            if (isExpired) reservations.expired.push(reservation);
            else reservations.active.push(reservation);
          });
        }
        return (
          <div className="reservations-container">
            {reservations.active.length === 0 &&
            reservations.expired.length === 0 ? (
              <h2>No reservations yet!</h2>
            ) : (
              <div>
                <div className="reservations-active">
                  {reservations.active.length > 0 ? (
                    reservations.active
                      .sort(function (a, b) {
                        if (a.days[0] < b.days[0]) return -1;
                        if (a.days[0] > b.days[0]) return 1;
                        return 1;
                      })
                      .map((reservation) => (
                        <ReservationCard
                          key={reservation._id}
                          reservation={reservation}
                          setReviewModal={this.props.setReviewModal}
                          setReviewListingId={this.props.setReviewListingId}
                        />
                      ))
                  ) : (
                    <h2>No active reservations</h2>
                  )}
                </div>
                <div className="reservations-expired">
                  {reservations.expired.length > 0
                    ? reservations.expired
                        .sort(function (a, b) {
                          if (a.days[0] < b.days[0]) return -1;
                          if (a.days[0] > b.days[0]) return 1;
                          return 1;
                        })
                        .map((reservation) => (
                          <ReservationCard
                            key={reservation._id}
                            reservation={reservation}
                          />
                        ))
                    : null}
                </div>
              </div>
            )}
          </div>
        );
      case "settings":
        return <Settings />;
      case "my transfers":
        return (
          <>
            {this.props.listingsToTransfer &&
            this.props.listingsToTransfer.length > 0 ? (
              <>
                <CustomButton
                  onClick={(e) => {
                    this.props.acceptListingTransfer(true, undefined);
                  }}
                >
                  Accept All
                </CustomButton>
                <CustomButton
                  onClick={(e) => {
                    this.props.rejectListingTransfer(true, undefined);
                  }}
                >
                  Reject All
                </CustomButton>
                {this.props.listingsToTransfer.map((listing) => {
                  return (
                    <ListingCard
                      key={listing._id}
                      listing={listing}
                      transfer={true}
                    />
                  );
                })}
              </>
            ) : (
              <p
                ref={(el) => {
                  if (el) {
                    el.style.setProperty("text-align", "center", "important");
                  }
                }}
              >
                There are no transfer request(s) at current time.
              </p>
            )}
          </>
        );
      default:
        return;
    }
  }

  render() {
    const { activeItem } = this.state;

    return (
      <div className="account-container">
        <div className="account-content-container">
          <div className="account-nav">
            {/* Desktop */}
            <div className="account-desktop-nav">
              <Menu.Item
                className="account-nav-tab"
                name="profile"
                active={activeItem === "profile"}
                compname="profile"
                onClick={this.handleItemClick}
              />
              {this.props.userSession ? (
                this.props.userSession.isHost ? (
                  <>
                    <Menu.Item
                      className="account-nav-tab"
                      name="my listings"
                      active={activeItem === "my listings"}
                      compname="my listings"
                      onClick={(e, { name, compname }) => {
                        this.handleItemClick(e, { name, compname });
                        this.props.searchUserListings(
                          this.props.User.userInfo._id
                        );
                      }}
                    />
                    <Menu.Item
                      className="account-nav-tab"
                      name="my transfers"
                      active={activeItem === "my transfers"}
                      compname="my transfers"
                      onClick={(e, { name, compname }) => {
                        this.handleItemClick(e, { name, compname });
                        this.props.getListingTranferRequests();
                      }}
                    />
                  </>
                ) : null
              ) : null}
              <Menu.Item
                className="account-nav-tab"
                name="my reservations"
                active={activeItem === "my reservations"}
                compname="my reservations"
                onClick={(e, { name, compname }) => {
                  this.handleItemClick(e, { name, compname });
                  this.props.searchUserReservations(
                    this.props.userSession.token
                  );
                }}
              />
              <Menu.Item
                className="account-nav-tab"
                name="settings"
                active={activeItem === "settings"}
                compname="settings"
                onClick={this.handleItemClick}
              />
            </div>
            {/* Mobile */}
            <div className="account-mobile-nav-container">
              <img
                onClick={() =>
                  this.setState({
                    mobileNav: true,
                  })
                }
                src="/images/profile-nav.svg"
                alt="mobile-nav"
              />

              <div
                onClick={(e) => {
                  if (
                    e.target.className ===
                    "account-mobile-nav-click-listener active"
                  ) {
                    this.setState({
                      mobileNav: false,
                    });
                  }
                }}
                className={
                  this.state.mobileNav
                    ? "account-mobile-nav-click-listener active"
                    : "account-mobile-nav-click-listener"
                }
              >
                <div className="account-mobile-nav">
                  <Menu.Item
                    className="account-nav-tab"
                    name="profile"
                    active={activeItem === "profile"}
                    compname="profile"
                    onClick={this.handleItemClick}
                  />
                  {this.props.userSession ? (
                    this.props.userSession.isHost ? (
                      <>
                        <Menu.Item
                          className="account-nav-tab"
                          name="my listings"
                          active={activeItem === "my listings"}
                          compname="my listings"
                          onClick={(e, { name, compname }) => {
                            this.handleItemClick(e, { name, compname });
                            this.props.searchUserListings(
                              this.props.User.userInfo._id
                            );
                          }}
                        />
                        <Menu.Item
                          className="account-nav-tab"
                          name="my transfers"
                          active={activeItem === "my transfers"}
                          compname="my transfers"
                          onClick={(e, { name, compname }) => {
                            this.handleItemClick(e, { name, compname });
                            this.props.getListingTranferRequests();
                          }}
                        />
                      </>
                    ) : null
                  ) : null}
                  <Menu.Item
                    className="account-nav-tab"
                    name="my reservations"
                    active={activeItem === "my reservations"}
                    compname="my reservations"
                    onClick={(e, { name, compname }) => {
                      this.handleItemClick(e, { name, compname });
                      this.props.searchUserReservations(
                        this.props.userSession.token
                      );
                    }}
                  />
                  <Menu.Item
                    className="account-nav-tab"
                    name="settings"
                    active={activeItem === "settings"}
                    compname="settings"
                    onClick={this.handleItemClick}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="account-content-scroll">{this._renderSubComp()}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const stateToReturn = { ...state };
  if (state.Login.userInfo)
    stateToReturn["userSession"] = state.Login.userInfo.session;
  if (state.Listing.userListings)
    stateToReturn["userListings"] = state.Listing.userListings;
  if (state.Reservations.reservations)
    stateToReturn["userReservations"] = state.Reservations.reservations;
  if (state.Transfer.listingsToTransfer)
    stateToReturn["listingsToTransfer"] = state.Transfer.listingsToTransfer;
  return stateToReturn;
};

const mapDispatchToProps = (dispatch) => {
  return {
    acceptListingTransfer: (acceptAll, listingId) =>
      dispatch(acceptListingTransfer(acceptAll, listingId)),
    getListingTranferRequests: (token) =>
      dispatch(getListingTranferRequests(token)),
    rejectListingTransfer: (rejectAll, listingId) =>
      dispatch(rejectListingTransfer(rejectAll, listingId)),
    searchUserListings: (userId) => dispatch(searchUserListings(userId)),
    searchUserReservations: (token) => dispatch(searchUserReservations(token)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LeftMenu)
);
