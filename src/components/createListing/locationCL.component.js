import React, { Component } from "react";
import "./createListing.css";
import "./locationListing.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  incompleteForm,
  completeForm,
} from "../../redux/actions/loadingActions";
class Location extends Component {
  constructor(props) {
    super(props);
    this.state = this.oldData();
    this.handleChange = this.handleChange.bind(this);
  }
  oldData = () => {
    return this.props.listingData.CreateListing.state.location;
  };
  componentDidMount() {
    const oldAddy = this.props.listingData.CreateListing.state.location.street;
    if (oldAddy === "") {
      this.props.incompleteForm();
    } else {
      this.props.completeForm();
    }
  }
  // this.props.listingData.CreateListing.state.location
  handleChange(e) {
    const { name, value } = e.target;
    if (isNaN(value) && name === "zipcode") {
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
    this.props.handle(updatedData, "location");
  }
  render() {
    return (
      <div className="LocationForm">
        <div>
          <div className="startText">Address</div>
          <br />
          <div className="questionText">Where is your home located?</div>
          <br />
          <div className="listing-wrapper">
            <div className="listing-inputs">
              <div className="gen-subsec">
                <div className="label-text">Street:</div>
                <input
                  type="text"
                  name="street"
                  className="inputBox streetInputbox"
                  value={this.state.street}
                  placeholder="5230 Newell Road"
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="gen-subsec">
                <div className="label-text">City:</div>
                <input
                  type="text"
                  name="city"
                  className="inputBox cityInputBox"
                  value={this.state.city}
                  placeholder="Palo Alto"
                  onChange={this.handleChange}
                  required
                />
              </div>

              <div className="gen-subsec">
                <div className="label-text">State:</div>
                <input
                  type="text"
                  name="state"
                  className=" inputBox stateInputBox"
                  value={this.state.state}
                  placeholder="CA"
                  onChange={this.handleChange}
                  required
                />
              </div>

              <div className="gen-subsec">
                <div className="label-text">Country:</div>
                <input
                  type="text"
                  name="country"
                  className="inputBox countryInputBox"
                  value={this.state.country}
                  placeholder="USA"
                  onChange={this.handleChange}
                  required
                />
              </div>

              <div className="gen-subsec">
                <div className="label-text">Zipcode:</div>
                <input
                  type="text"
                  name="zipcode"
                  className="inputBox zipInputBox"
                  value={this.state.zipcode}
                  placeholder="90210"
                  onChange={this.handleChange}
                  required
                />
              </div>

              <div className="gen-subsec">
                <div className="label-text">Apartment:</div>
                <input
                  type="text"
                  name="aptnum"
                  className="inputBox aptnumInputBox"
                  value={this.state.aptnum}
                  placeholder="aptnum"
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    listingData: state,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    completeForm: () => dispatch(completeForm()),
    incompleteForm: () => dispatch(incompleteForm()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Location)
);
