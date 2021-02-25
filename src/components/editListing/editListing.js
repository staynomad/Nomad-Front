import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, NavLink } from "react-router-dom";
import { app } from "../../utils/axiosConfig.js";
import { getListingById } from "../../redux/actions/searchListingActions";
import { sendListingTranferRequest } from "../../redux/actions/transferListingActions";
import { submitEditListing } from "../../redux/actions/editListingActions";
import "../createListing/createListing.css";
import "../createListing/detailsListing.css";
import "../createListing/locationListing.css";
import "./editListing.css";

import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

class EditListing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: null,
      charleft: {
        title: 100,
        description: 5000,
      },
      listingId: this.props.match.params.listingId,
      location: {
        street: "",
        city: "",
        state: "",
        country: "",
        zipcode: "",
        apartment: "",
      },
      description: "",
      details: {
        beds: 0,
        baths: 0,
        maxpeople: 0,
      },
      price: 0,
      rules: "",
      title: "",
      transferEmail: "",
    };
  }

  async componentDidMount() {
    await this.props.getListingById(this.props.match.params.listingId);
    this.setState({
      active: this.props.editListing.active,
    });
  }

  componentDidUpdate(prevProps) {
    const currentListing = this.props.editListing;
    if (currentListing !== prevProps.editListing) {
      this.setState({
        ...this.state,
        title: currentListing.title,
        location: {
          street: currentListing.location.street,
          city: currentListing.location.city,
          state: currentListing.location.state,
          country: currentListing.location.country,
          zipcode: currentListing.location.zipcode,
          apartment: currentListing.location.apartment,
        },
        description: currentListing.description,
        details: {
          beds: currentListing.details.beds,
          baths: currentListing.details.baths,
          maxpeople: currentListing.details.maxpeople,
        },
        price: currentListing.price,
        rules: currentListing.rules,
      });
    }
  }

  handleTitleChange = (e) => {
    const { name, value } = e.target;
    const dif = 100 - value.length;
    if (dif >= 0) {
      this.setState({
        ...this.state,
        [name]: value,
        charleft: {
          ...this.state.charleft,
          title: dif,
        },
      });
    }
  };

  handleLocationChange = (e) => {
    const { name, value } = e.target;
    if (isNaN(value) && name === "zipcode") {
      console.log("invalid input");
    } else {
      this.setState({
        ...this.state,
        location: {
          ...this.state.location,
          [name]: value,
        },
      });
    }
  };

  handleDescriptionChange = (e) => {
    const { name, value } = e.target;
    const dif = 5000 - value.length;
    if (this.state.charleft.description >= 0) {
      this.setState({
        ...this.state,
        [name]: value,
        charleft: {
          ...this.state.charleft,
          description: dif,
        },
      });
    }
  };

  handleDetailsChange = (e) => {
    const { name, value } = e.target;
    if (!isNaN(value)) {
      if (value >= 0 && value < 100) {
        this.setState({
          ...this.state,
          details: {
            ...this.state.details,
            [name]: value,
          },
        });
      }
    }
  };

  handlePriceChange = (e) => {
    const { name, value } = e.target;
    if (!isNaN(value)) {
      if (value < 1000) {
        const noLeadingZeroValue = value.replace(/^0+/, "");
        this.setState({
          ...this.state,
          [name]: noLeadingZeroValue,
        });
      }
    }

    if (value === "") this.setState({ ...this.state, [name]: 0 });
  };

  handlePublish = (e) => {
    e.preventDefault();
    app
      .put("/listings/activateListing/" + this.state.listingId, null, {
        headers: {
          Authorization: `Bearer ${this.props.userSession.token}`,
        },
      })
      .then(() => {
        this.setState({
          active: true,
        });
        this.props.submitEditListing(this.props.userSession.token, this.state);
      });
  };

  handleNameValueChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.submitEditListing(this.props.userSession.token, this.state);
  };

  handleExport = (e) => {
    e.preventDefault();
    this.props.getListingById(this.state.listingId)
    app.post("/listings/exportListing", {
      userId: this.props.Listing.editListing.userId,
      listingId: this.state.listingId,
      listingCalendar: {
        available: this.props.Listing.editListing.available,
        booked: this.props.Listing.editListing.booked
      }
    })
    .then((res) => {
      this.setState({
        exportURL: res.data.url
      })
    })
  }

  render() {
    return (
      <>
        {!this.props.loading ? (
          <div className="edit-listing-background">
            <div className="edit-listing-container">
              <div className="edit-listing-header">
                <NavLink to="/MyAccount" className="create-listing-back">
                  <KeyboardBackspaceIcon />
                </NavLink>
                <h2>Edit Listing</h2>
              </div>
              <div className="edit-listing-content">
                <form>
                  {/* Title */}
                  <h2 className="edit-listing-subtitle">Title</h2>
                  <input
                    className="edit-listing-title-input"
                    maxLength="50"
                    name="title"
                    onChange={this.handleTitleChange}
                    placeholder="e.g. Beautiful apartment overlooking Central Park"
                    required
                    type="text"
                    value={this.state.title}
                    style={{ height: "40px", paddingLeft: "1.25%" }}
                  ></input>
                  <div style={{ textAlign: "center", color: "#7e9388" }}>
                    {this.state.charleft.title} Characters Left
                  </div>
                  {/* Location */}
                  <h2 className="edit-listing-subtitle">Location</h2>
                  <div className="listing-wrapper">
                    <div className="listing-inputs">
                      <div className="edit-listing-input-container">
                        <div className="label-text spaceRight">Street:</div>
                        <input
                          type="text"
                          name="street"
                          className="edit-listing-input"
                          value={this.state.location.street}
                          placeholder="5230 Newell Road"
                          onChange={this.handleLocationChange}
                          required
                        />
                      </div>
                      <div className="edit-listing-input-container">
                        <div className="label-text spaceRight">City: </div>
                        <input
                          type="text"
                          name="city"
                          className="edit-listing-input"
                          value={this.state.location.city}
                          placeholder="Palo Alto"
                          onChange={this.handleLocationChange}
                          required
                        />
                      </div>
                      <div className="edit-listing-input-container">
                        <div className="label-text spaceRight">State: </div>
                        <input
                          type="text"
                          name="state"
                          className="edit-listing-input"
                          value={this.state.location.state}
                          placeholder="CA"
                          onChange={this.handleLocationChange}
                          required
                        />
                      </div>
                      <div className="edit-listing-input-container">
                        <div className="label-text spaceRight">Country: </div>
                        <input
                          type="text"
                          name="country"
                          className="edit-listing-input"
                          value={this.state.location.country}
                          placeholder="USA"
                          onChange={this.handleLocationChange}
                          required
                        />
                      </div>
                      <div className="edit-listing-input-container">
                        <div className="label-text spaceRight">Zipcode: </div>
                        <input
                          type="text"
                          name="zipcode"
                          className="edit-listing-input"
                          value={this.state.location.zipcode}
                          placeholder="90210"
                          onChange={this.handleLocationChange}
                          required
                        />
                      </div>
                      <div className="edit-listing-input-container">
                        <div className="label-text spaceRight">Apartment: </div>
                        <input
                          type="text"
                          name="apartment"
                          className="edit-listing-input"
                          value={this.state.location.apartment}
                          placeholder="aptnum"
                          onChange={this.handleLocationChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="spacer_l"></div>
                  {/* Description */}
                  <h2 className="edit-listing-subtitle">Description</h2>
                  <textarea
                    type="text"
                    maxLength="500"
                    name="description"
                    className="descriptionTextInputBox"
                    value={this.state.description}
                    placeholder="Be detailed! The more information you include the greater the chance your property gets booked."
                    onChange={this.handleDescriptionChange}
                    required
                  ></textarea>
                  <div style={{ textAlign: "center", color: "#7e9388" }}>
                    {this.state.charleft.description} Characters Left
                  </div>
                  <div className="spacer_m"></div>
                  {/* Details */}
                  <div className="listing-wrapper">
                    <div className="listing-inputs">
                      <h2 className="edit-listing-subtitle">Details</h2>
                      <div className="edit-listing-details-container">
                        <div className="beds">
                          <div className="detailLabel spaceRight">Beds: </div>
                          <input
                            type="text"
                            name="beds"
                            placeholder="e.g. 3"
                            className="input-box-details"
                            value={this.state.details.beds}
                            onChange={this.handleDetailsChange}
                            required
                          />
                        </div>
                        <div className="baths">
                          <div className="detailLabel spaceRight">Baths: </div>
                          <input
                            type="text"
                            name="baths"
                            className="input-box-details"
                            placeholder="e.g. 2"
                            value={this.state.details.baths}
                            onChange={this.handleDetailsChange}
                            required
                          />
                        </div>
                        <div className="maxppl">
                          <div className="detailLabel spaceRight">
                            Max people:
                          </div>
                          <input
                            type="text"
                            name="maxpeople"
                            placeholder="e.g. 5"
                            className="input-box-details"
                            value={this.state.details.maxpeople}
                            onChange={this.handleDetailsChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Price */}

                  <div className="edit-listing-price-container">
                    <h2 className="edit-listing-subtitle">Price</h2>
                    <input
                      type="text"
                      name="price"
                      className="input-box-details"
                      value={this.state.price}
                      placeholder="$ per night"
                      onChange={this.handlePriceChange}
                      required
                    />

                    <div style={{ textAlign: "center !important" }}>
                      List Price: ${this.state.price} per night <br />
                      After taxes and fees: ${this.state.price} per night
                    </div>
                  </div>
                  <div className="spacer_s"></div>
                  {!this.state.active ? (
                    <button className="edit-listing-save-button" onClick={this.handlePublish}>
                      Publish
                    </button>
                  ) : null}
                  <button
                    className="edit-listing-save-button"
                    onClick={this.handleSubmit}
                  >
                    Save
                  </button>
                  <button
                    className="edit-listing-save-button"
                    onClick={this.handleExport}
                  >
                    Export
                  </button>
                  <div className="edit-listing-export-url">
                    {this.state.exportURL ? (
                      <div>
                        <span style={{textAlign: "right"}}>
                          <NavLink to="/how-to-import-or-export-calendar">&#9432;</NavLink>{" "}
                          What's this?
                        </span>
                        <div className="spacer_xs" />
                        <a href={this.state.exportURL} download>{this.state.exportURL}</a>
                      </div>
                    ) : null}
                  </div>
                </form>
                <div className="spacer_l"></div>
                <form className="edit-listing-transfer-container">
                  <label for="transferEmail">Email to Transfer to</label>
                  <input
                    type="text"
                    name="transferEmail"
                    id="transferEmail"
                    placeholder="test@test.com"
                    className="input-box-details"
                    value={this.state.transferEmail}
                    onChange={this.handleNameValueChange}
                    required
                  />
                  <button
                    onClick={() => {
                      this.props.sendListingTranferRequest(
                        this.state.transferEmail,
                        this.state.listingId
                      );
                    }}
                  >
                    Transfer
                  </button>
                </form>
                <div className="spacer_l"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="spinner-container">
            <div id="spinner" />
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const stateToReturn = {
    ...state,
    loading: state.Loading.loading,
  };
  if (state.Login.userInfo)
    stateToReturn.userSession = state.Login.userInfo.session;
  if (state.Listing.editListing)
    stateToReturn.editListing = state.Listing.editListing;
  return stateToReturn;
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListingById: (listingId) => dispatch(getListingById(listingId)),
    sendListingTranferRequest: (email, listingId) =>
      dispatch(sendListingTranferRequest(email, listingId)),
    submitEditListing: (token, editedListing) =>
      dispatch(submitEditListing(token, editedListing)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditListing)
);
