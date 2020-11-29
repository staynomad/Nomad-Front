import React, { Component } from "react";
import "./createListing.css";
import "./detailsListing.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  incompleteForm,
  completeForm,
} from "../../redux/actions/loadingActions";
class DetailsCL extends Component {
  constructor(props) {
    super(props);
    this.state = this.oldData();
    this.handleChange = this.handleChange.bind(this);
  }
  oldData = () => {
    return this.props.listingData.CreateListing.state.details;
  };
  componentDidMount() {
    const oldDetails = this.props.listingData.CreateListing.state.details;
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
      if (value < 10) {
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
    this.props.handle(updatedData, "details");
  }
  render() {
    return (
      <div>
        <div className="startText">Details</div>
        <br />
        <div className="questionText">Any other important info?</div>
        <br />
        <div className="details-wrapper">
          <div className="overall-details">
            <div className="beds">
              <div className="input-label-details">Beds: </div>
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
                <div className="input-label-details">Baths: </div>
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
                <div className="input-label-details">Max people: </div>
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
        </div>
      </div>
    );
  }
}
/*

*/
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
  connect(mapStateToProps, mapDispatchToProps)(DetailsCL)
);
