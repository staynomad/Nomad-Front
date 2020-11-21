import React, { Component } from 'react'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

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
                title: 40,
                description: 500,
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
        }
    };

    componentDidMount() {
        this.props.getListingById(this.props.match.params.listingId);
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
        const dif = 40 - value.length;
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
        const dif = 500 - value.length;
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
            if (value > 0 && value < 10) {
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

    render() {
        return (
            <>
                <div>
                    <br /><br /><br /><br /><br />
                </div>

                { !this.props.loading ? (
                    <>
                        <h1 style={{ marginBottom: "5%" }}>Edit Listing</h1>
                        <form>
                            {/* Title */}
                            <textarea
                                className="textInputBox"
                                maxLength="50"
                                name="title"
                                onChange={this.handleTitleChange}
                                placeholder="e.g. Beautiful apartment overlooking Central Park"
                                required
                                type="text"
                                value={this.state.title}
                            ></textarea>
                            <h3>{this.state.charleft.title} characters are left</h3>
                            {/* Location */}
                            <div className="listing-wrapper">
                                <div className="listing-inputs">
                                    <div className="gen-subsec">
                                        <div className="label-text">Street:</div>
                                        <input
                                            type="text"
                                            name="street"
                                            className="inputBox streetInputbox"
                                            value={this.state.location.street}
                                            placeholder="5230 Newell Road"
                                            onChange={this.handleLocationChange}
                                            required
                                        />
                                    </div>
                                    <div className="gen-subsec">
                                        <div className="label-text">City:</div>
                                        <input
                                            type="text"
                                            name="city"
                                            className="inputBox cityInputBox"
                                            value={this.state.location.city}
                                            placeholder="Palo Alto"
                                            onChange={this.handleLocationChange}
                                            required
                                        />
                                    </div>
                                    <div className="gen-subsec">
                                        <div className="label-text">State:</div>
                                        <input
                                            type="text"
                                            name="state"
                                            className=" inputBox stateInputBox"
                                            value={this.state.location.state}
                                            placeholder="CA"
                                            onChange={this.handleLocationChange}
                                            required
                                        />
                                    </div>
                                    <div className="gen-subsec">
                                        <div className="label-text">Country:</div>
                                        <input
                                            type="text"
                                            name="country"
                                            className="inputBox countryInputBox"
                                            value={this.state.location.country}
                                            placeholder="USA"
                                            onChange={this.handleLocationChange}
                                            required
                                        />
                                    </div>
                                    <div className="gen-subsec">
                                        <div className="label-text">Zipcode:</div>
                                        <input
                                            type="text"
                                            name="zipcode"
                                            className="inputBox zipInputBox"
                                            value={this.state.location.zipcode}
                                            placeholder="90210"
                                            onChange={this.handleLocationChange}
                                            required
                                        />
                                    </div>
                                    <div className="gen-subsec">
                                        <div className="label-text">Apartment:</div>
                                        <input
                                            type="text"
                                            name="apartment"
                                            className="inputBox aptnumInputBox"
                                            value={this.state.location.apartment}
                                            placeholder="aptnum"
                                            onChange={this.handleLocationChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Description */}
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
                            <h3>{this.state.charleft.description} characters are left</h3>
                            {/* Details */}
                            <div className="details-wrapper">
                                <div className="overall-details">
                                    <div className="beds">
                                        <div className="input-label-details">Beds: </div>
                                        <input
                                            type="number"
                                            name="beds"
                                            placeholder="e.g. 3"
                                            className="input-box-details"
                                            value={this.state.details.beds}
                                            onChange={this.handleDetailsChange}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <div className="baths">
                                            <div className="input-label-details">Baths: </div>
                                            <input
                                                type="number"
                                                name="baths"
                                                className="input-box-details"
                                                placeholder="e.g. 2"
                                                value={this.state.details.baths}
                                                onChange={this.handleDetailsChange}
                                                required
                                            />
                                        </div>

                                        <div className="maxppl">
                                            <div className="input-label-details">Max people: </div>
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

                                        {/* Price */}
                                        <input
                                            type="text"
                                            name="price"
                                            className="priceInputBox"
                                            value={this.state.price}
                                            placeholder="$ per night"
                                            onChange={this.handlePriceChange}
                                            required
                                        />
                                        <p>List Price: ${this.state.price} per night</p>
                                        <p>After taxes and fees: ${this.state.price} per night</p>
                                    </div>
                                </div>
                            </div>

                            {/* Rules */}
                            <textarea
                                type="text"
                                name="rules"
                                className="textInputBox"
                                value={this.state.rules}
                                placeholder="rules"
                                onChange={this.handleRulesChange}
                            ></textarea>
                            <CustomButton onClick={this.handleSubmit}>Submit</CustomButton>
                        </form>
                    </>
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
