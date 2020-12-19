import React, { Component } from "react";
import "./createListing.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  incompleteForm,
  completeForm,
} from "../../redux/actions/loadingActions";
import { newListing } from "../../redux/actions/createListingActions";

class PricesCL extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: this.oldData(),
    };
    this.handleChange = this.handleChange.bind(this);
  }

  oldData = () => {
    return this.props.listingData.price;
  };
  componentDidMount() {
    const oldPrice = this.props.listingData.price;
    if (oldPrice === "") {
      this.props.incompleteForm();
    } else {
      this.props.completeForm();
    }
  }
  handleChange(e) {
    const { name, value } = e.target;
    if (!isNaN(value) && value < 1000) {
      this.props.completeForm();
      this.setState({
        [name]: value,
      });
      this.props.newListing({ value: value, name: "price" });
    }
    if (value === "") {
      this.props.incompleteForm();
    }
  }
  render() {
    return (
      <div>
        <div>
          <div className="startText">Price</div>
          <br />
          <div className="questionText">How much are you listing for?</div>
          <br />
          <input
            type="text"
            name="price"
            className="priceInputBox"
            value={this.state.price}
            placeholder="$ per night"
            onChange={this.handleChange}
            required
          />
          {this.state.price ? (
            <p>List Price: ${this.state.price} per night</p>
          ) : (
            ""
          )}
        </div>
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
  connect(mapStateToProps, mapDispatchToProps)(PricesCL)
);
/* 
          {this.state.price ? (
            <p>After taxes and fees: ${this.state.price} per night</p>
          ) : (
            ""
          )}
          */
