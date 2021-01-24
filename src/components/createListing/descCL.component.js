import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  incompleteForm,
  completeForm,
} from "../../redux/actions/loadingActions";
import "./createListing.css";
import { newListing } from "../../redux/actions/createListingActions";

class Description extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      maxchars: 5000,
      charleft: 5000,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    const newDesc = this.props.listingData.description;
    const dif = this.state.maxchars - newDesc.length;
    if (newDesc === "") {
      this.props.incompleteForm();
    } else {
      this.props.completeForm();
    }
    this.setState({
      description: newDesc,
      charleft: dif,
    });
  }
  handleChange(e) {
    const { name, value } = e.target;
    const dif = this.state.maxchars - value.length;
    if (value.length <= this.state.maxchars) {
      this.props.completeForm();
      this.setState({
        [name]: value,
        charleft: dif,
      });
    }
    if (value === "") {
      this.props.incompleteForm();
    }

    this.props.newListing({ value: value, name: "description" });
  }
  render() {
    return (
      <div>
        <div className="questionText">
          Description
        </div>
        <div className="spacer_xs"></div>

        <textarea
          type="text"
          name="description"
          className="descriptionTextInputBox"
          value={this.state.description}
          placeholder="Be detailed! The more information you include the greater the chance your property gets booked."
          onChange={this.handleChange}
          required
        ></textarea>
        <div className="characters-left">
          {this.state.charleft} Characters Left
        </div>
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
  connect(mapStateToProps, mapDispatchToProps)(Description)
);
