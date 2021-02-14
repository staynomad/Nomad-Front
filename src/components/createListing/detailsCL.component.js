import React, { Component } from "react";
import "./createListing.css";
import "./detailsListing.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  incompleteForm,
  completeForm,
} from "../../redux/actions/loadingActions";
import { newListing } from "../../redux/actions/createListingActions";

class DetailsCL extends Component {
  constructor(props) {
    super(props);
    this.state = this.oldData();
    this.handleChange = this.handleChange.bind(this);
  }
  oldData = () => {
    return this.props.listingData.details;
  };
  componentDidMount() {
    const oldDetails = this.props.listingData.details;
    this.props.completeForm();
    for (let item in oldDetails) {
      if (oldDetails[item] === "") {
        this.props.incompleteForm();
      }
    }
  }
  handleChange(e) {
    const { name, value } = e.target;
    if (!isNaN(value)) {
      if (value < 100) {
        this.props.completeForm();
        this.setState({
          invalidInput: false,
          [name]: value,
        });
      }
    }
    if (value === "") {
      this.props.incompleteForm();
    }
    const updatedData = {
      ...this.state,
      [name]: value,
    };
    this.props.newListing({ value: updatedData, name: "details" });
  }
  render() {
    return (
      <div>
        <div className="questionText">Details</div>
        <div className="details-wrapper">
          <div className="beds">
            <div className="create-listing-details-label">Beds: </div>
            <input
              type="text"
              name="beds"
              placeholder="e.g. 3"
              className="input-box-details"
              value={this.state.beds}
              onChange={this.handleChange}
              required
            />
          </div>

          <div>
            <div className="baths">
              <div className="create-listing-details-label">Baths: </div>
              <input
                type="text"
                name="baths"
                className="input-box-details"
                placeholder="e.g. 2"
                value={this.state.baths}
                onChange={this.handleChange}
                required
              />
            </div>

            <div className="maxppl">
              <div className="create-listing-details-label">Max people: </div>
              <input
                type="text"
                name="maxpeople"
                placeholder="e.g. 5"
                className="input-box-details"
                value={this.state.maxpeople}
                onChange={this.handleChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="spacer_s"></div>
      </div>
    );
  }
}
/*

*/
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
  connect(mapStateToProps, mapDispatchToProps)(DetailsCL)
);
