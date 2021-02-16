import React, { Component } from "react";
import "./createListing.css";
import "./locationListing.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  incompleteForm,
  completeForm,
} from "../../redux/actions/loadingActions";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import { newListing } from "../../redux/actions/createListingActions";

import Select from "react-select";
import { stateStyles, stateOptions } from "./stateDropdown";

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.oldData(),
      address: "",
      coordinates: {
        lat: null,
        lng: null,
      },
    };
    this.handleChange = this.handleChange.bind(this);
  }
  oldData = () => {
    return this.props.listingData.location;
  };
  /*
  componentDidMount() {
    const oldAddy = this.props.listingData.CreateListing.state.location.street;
    if (oldAddy === "") {
      this.props.incompleteForm();
    } else {
      this.props.completeForm();
    }
  }
  */
  handleChange(e) {
    const { name, value } = e.target;
    if (isNaN(value) && name === "zipcode") {
      this.props.incompleteForm();
      console.log("invalid input");
    } else {
      this.props.completeForm();
      this.setState({
        [name]: value,
      });
    }
    const updatedData = {
      ...this.state,
      [name]: value,
    };
    if (value === "") {
      this.props.incompleteForm();
    }

    if (name === "zipcode" && !/^\d{5}(-\d{4})?$/.test(value))
      this.props.incompleteForm();
    this.props.newListing({ name: "location", value: updatedData });
  }

  handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    const [
      street,
      city,
      stateZip,
      country,
    ] = results[0].formatted_address.split(", ");
    const [state, zipcode] = stateZip.split(" ");

    this.setState({
      address: value,
      coordinates: latLng,
      street: street ? street : "",
      city: city ? city : "",
      state: state ? state : "",
      country: country ? country : "",
      zipcode: zipcode ? zipcode : "",
    });

    const updatedData = {
      address: value,
      coordinates: latLng,
      street: street ? street : "",
      city: city ? city : "",
      state: state ? state : "",
      country: country ? country : "",
      zipcode: zipcode ? zipcode : "",
    };

    this.props.newListing({ name: "location", value: updatedData });
  };

  render() {
    return (
      <div className="LocationForm">
        <div>
          <div className="questionText">Location</div>
          <div className="spacer_xs"></div>
          <div className="listing-wrapper">
            <div className="listing-inputs">
              <PlacesAutocomplete
                value={this.state.address}
                onChange={(address) => this.setState({ address })}
                onSelect={this.handleSelect}
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading,
                }) => (
                  <div>
                    <input
                      className="create-listing-input autofill"
                      {...getInputProps({
                        placeholder: "Search for address",
                      })}
                    />

                    <p>
                      Note : Invalid addresses may cause autocomplete to fail.
                    </p>
                    {suggestions.map((suggestion, idx) => {
                      const style = {
                        backgroundColor: suggestion.active ? "#00b183" : "#fff",
                        color: suggestion.active ? "white" : "black",
                        cursor: "pointer",
                      };

                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, { style })}
                          key={`suggestion_${idx}`}
                        >
                          {suggestion.description}
                        </div>
                      );
                    })}
                    <p>Latitude: {this.state.coordinates.lat}</p>
                    <p>Longitude: {this.state.coordinates.lng}</p>

                    <div>{loading ? <div>...loading</div> : null}</div>
                  </div>
                )}
              </PlacesAutocomplete>
              <div className="create-listing-input-container">
                <div className="label-text">Street:</div>
                <input
                  type="text"
                  name="street"
                  className="create-listing-input"
                  value={this.state.street}
                  placeholder="5230 Newell Road"
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="create-listing-input-container">
                <div className="label-text">City:</div>
                <input
                  type="text"
                  name="city"
                  className="create-listing-input"
                  value={this.state.city}
                  placeholder="Palo Alto"
                  onChange={this.handleChange}
                  required
                />
              </div>

              <div className="create-listing-input-container">
                <div className="label-text">State:</div>
                <Select
                  onChange={(e) =>
                    this.setState({
                      state: e.value,
                    })
                  }
                  value={stateOptions.find(
                    (option) => option.value === this.state.state
                  )}
                  placeholder="Select State..."
                  styles={stateStyles}
                  options={stateOptions}
                />
              </div>

              <div className="create-listing-input-container">
                <div className="label-text">Country:</div>
                <input
                  type="text"
                  name="country"
                  className="create-listing-input"
                  value={this.state.country}
                  placeholder="USA"
                  onChange={this.handleChange}
                  required
                />
              </div>

              <div className="create-listing-input-container">
                <div className="label-text">Zipcode:</div>
                <input
                  type="text"
                  name="zipcode"
                  className="create-listing-input"
                  value={this.state.zipcode}
                  placeholder="90210"
                  onChange={this.handleChange}
                  required
                />
              </div>

              <div className="create-listing-input-container">
                <div className="label-text">Apartment:</div>
                <input
                  type="text"
                  name="aptnum"
                  className="create-listing-input"
                  value={this.state.aptnum}
                  placeholder="aptnum"
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </div>
        </div>
        <button
          className="create-listing-clear-address-button"
          onClick={() =>
            this.setState({
              address: "",
              coordinates: {
                lat: null,
                lng: null,
              },
              street: "",
              city: "",
              state: "",
              country: "",
              zipcode: "",
            })
          }
        >
          <h4>Clear</h4>
        </button>
        <div className="spacer_m"></div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    listingData: state.CreateListing,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    newListing: (updatedData) => dispatch(newListing(updatedData)),
    completeForm: () => dispatch(completeForm()),
    incompleteForm: () => dispatch(incompleteForm()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Location)
);
