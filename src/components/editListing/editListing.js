import React, { Component } from 'react'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { app } from '../../utils/axiosConfig.js'
import { CustomButton } from "../matches/listing/listingCard.component";
import { getListingById } from "../../redux/actions/searchListingActions";
import { submitEditListing } from "../../redux/actions/editListingActions";
import "../createListing/createListing.css";
import "../createListing/detailsListing.css";
import "../createListing/locationListing.css";
import "./editListing.css";

class EditListing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listingId: this.props.match.params.listingId,
            charleft: {
                title: 100,
                description: 5000,
            },
            title: "",
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
            active: null,
        }
    };

    async componentDidMount() {
        await this.props.getListingById(this.props.match.params.listingId);
        this.setState({
          active: this.props.editListing.active
        })
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
            })
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
                }
            });
        }
    };

    handleDetailsChange = (e) => {
        const { name, value } = e.target;
        if (!isNaN(value)) {
            if (value > 0 && value < 100) {
                this.setState({
                    ...this.state,
                    details: {
                        ...this.state.details,
                        [name]: value,
                    }
                });
            }
        }
    };

    handlePriceChange = (e) => {
        const { name, value } = e.target;
        if (!isNaN(value)) {
            if (value < 1000) {
                const noLeadingZeroValue = value.replace(/^0+/, '');
                this.setState({
                    ...this.state,
                    [name]: noLeadingZeroValue,
                });
            }
        }

        if (value === '') this.setState({ ...this.state, [name]: 0 })
    };

    handleRulesChange = (e) => {
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

    handlePublish = (e) => {
        e.preventDefault();
        app.put("/listings/activateListing/" + this.state.listingId, null,  {
          headers: {
            Authorization: `Bearer ${this.props.userSession.token}`,
          },
        })
        .then(() => {
          this.setState({
            active: true
          });
          this.props.submitEditListing(this.props.userSession.token, this.state)
        })
    };

    render() {
        return (
            <>
                { !this.props.loading ? (
                    <div className="container_s">
                        <h2>Edit Listing</h2>
                        <form>
                            {/* Title */}
                            <div className="label-text">Title:</div> <br />
                            <input
                                className="textInputBox"
                                maxLength="50"
                                name="title"
                                onChange={this.handleTitleChange}
                                placeholder="e.g. Beautiful apartment overlooking Central Park"
                                required
                                type="text"
                                value={this.state.title}
                                style={{height: "40px", paddingLeft: "1.25%"}}
                            ></input>
                            <p style={{paddingLeft: "2.5%"}}>{this.state.charleft.title} characters are left</p>

                            {/* Location */}
                            <div className="label-text">Location:</div> <br />
                            <div className="listing-wrapper">
                                <div className="listing-inputs">
                                    <div className="row1">
                                      <div className="gen-subsec">
                                          <div className="label-text spaceRight">Street:</div>
                                          <input
                                              type="text"
                                              name="street"
                                              className="inputBox"
                                              value={this.state.location.street}
                                              placeholder="5230 Newell Road"
                                              onChange={this.handleLocationChange}
                                              required
                                          />
                                      </div>
                                      <div className="gen-subsec">
                                          <div className="label-text spaceRight">City: </div>
                                          <input
                                              type="text"
                                              name="city"
                                              className="inputBox"
                                              value={this.state.location.city}
                                              placeholder="Palo Alto"
                                              onChange={this.handleLocationChange}
                                              required
                                          />
                                      </div>
                                      <div className="gen-subsec">
                                          <div className="label-text spaceRight">State: </div>
                                          <input
                                              type="text"
                                              name="state"
                                              className=" inputBox"
                                              value={this.state.location.state}
                                              placeholder="CA"
                                              onChange={this.handleLocationChange}
                                              required
                                          />
                                      </div>
                                    </div>

                                    <div className="row1">
                                      <div className="gen-subsec">
                                          <div className="label-text spaceRight">Country: </div>
                                          <input
                                              type="text"
                                              name="country"
                                              className="inputBox"
                                              value={this.state.location.country}
                                              placeholder="USA"
                                              onChange={this.handleLocationChange}
                                              required
                                          />
                                      </div>
                                      <div className="gen-subsec">
                                          <div className="label-text spaceRight">Zipcode: </div>
                                          <input
                                              type="text"
                                              name="zipcode"
                                              className="inputBox"
                                              value={this.state.location.zipcode}
                                              placeholder="90210"
                                              onChange={this.handleLocationChange}
                                              required
                                          />
                                      </div>
                                      <div className="gen-subsec">
                                          <div className="label-text spaceRight">Apartment: </div>
                                          <input
                                              type="text"
                                              name="apartment"
                                              className="inputBox"
                                              value={this.state.location.apartment}
                                              placeholder="aptnum"
                                              onChange={this.handleLocationChange}
                                          />
                                      </div>
                                    </div>
                                </div>
                            </div>
                            <div className="spacer_l"></div>

                            {/* Description */}
                            <div className="label-text">Description:</div> <br />
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
                            <p style={{paddingLeft: "2.5%"}}>{this.state.charleft.description} characters are left</p>
                            <div className="spacer_m"></div>

                            {/* Details */}
                            <div className="listing-wrapper">
                                <div className="listing-inputs">
                                <div className="label-text">Details:</div>
                                    <div className="row2">
                                      <div className="detailLabel spaceRight">Beds: </div>
                                      <input
                                          type="number"
                                          name="beds"
                                          placeholder="e.g. 3"
                                          className="input-box-details"
                                          value={this.state.details.beds}
                                          onChange={this.handleDetailsChange}
                                          required
                                      />
                                      <div className="detailLabel spaceRight">Baths: </div>
                                      <input
                                          type="number"
                                          name="baths"
                                          className="input-box-details"
                                          placeholder="e.g. 2"
                                          value={this.state.details.baths}
                                          onChange={this.handleDetailsChange}
                                          required
                                      />
                                      <div className="detailLabel spaceRight">Max people: </div>
                                      <input
                                          type="number"
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

                            {/* Price */}
                            <div className="listing-wrapper">
                                <div className="listing-inputs">
                                    <div className="row2">
                                      <div className="detailLabel spaceRight">Price: </div>
                                      <input
                                          type="text"
                                          name="price"
                                          className="input-box-details"
                                          value={this.state.price}
                                          placeholder="$ per night"
                                          onChange={this.handlePriceChange}
                                          required
                                      />
                                    </div>
                                    <div style={{textAlign: "center !important"}}>
                                      List Price: ${this.state.price} per night <br />
                                      After taxes and fees: ${this.state.price} per night
                                    </div>
                                </div>
                            </div>
                            <div className="spacer_s"></div>
                            {
                              !this.state.active ? <CustomButton onClick={this.handlePublish}>publish</CustomButton> : null
                            }
                            <CustomButton onClick={this.handleSubmit}>Save</CustomButton>
                        </form>
                          <div className="spacer_l"></div>
                    </div>
                ) : (
                        <div className="spinner-container">
                            <div id="spinner" />
                        </div>
                    )
                }
            </>
        )
    }
}

const mapStateToProps = state => {
    const stateToReturn = {
        ...state,
        loading: state.Loading.loading,
    };
    if (state.Login.userInfo) stateToReturn.userSession = state.Login.userInfo.session;
    if (state.Listing.editListing) stateToReturn.editListing = state.Listing.editListing;
    return stateToReturn;
};

const mapDispatchToProps = dispatch => {
    return {
        getListingById: (listingId) => dispatch(getListingById(listingId)),
        submitEditListing: (token, editedListing) => dispatch(submitEditListing(token, editedListing))
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(
    EditListing
));
