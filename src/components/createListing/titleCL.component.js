import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./createListing.css";
import {
  incompleteForm,
  completeForm,
} from "../../redux/actions/loadingActions";
import { newListing } from "../../redux/actions/createListingActions";

class TitleCL extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      charleft: 100,
      maxchars: 100,
    };
  }
  componentDidMount() {
    const oldTitle = this.props.listingData.title;
    const oldDif = this.state.maxchars - oldTitle.length;
    if (oldTitle === "") {
      this.props.incompleteForm();
    } else {
      this.props.completeForm();
    }
    this.setState({
      title: oldTitle,
      charleft: oldDif,
    });
  }
  handleChange = (e) => {
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
    this.props.newListing({ name: "title", value: value });
  };

  render() {
    return (
      <div>

        <div className="questionText">
          Title
        </div>
        <div className="spacer_xs"></div>
        <input
          type="text"
          name="title"
          className="textInputBox"
          value={this.state.title}
          placeholder="e.g. Beautiful apartment overlooking Central Park"
          onChange={this.handleChange}
          required
        ></input>
        <div className="spacer_xxs"></div>
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
    formCompleted: state.Loading.formCompleted,
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
  connect(mapStateToProps, mapDispatchToProps)(TitleCL)
);
