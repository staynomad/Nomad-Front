import React, { Component } from "react";
import "./createListing.css";
import "./detailsListing.css";

export default class DetailsCL extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beds: "",
      baths: "",
      maxpeople: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    const { name, value } = e.target;
    if (!isNaN(value)) {
      if (value < 10) {
        this.setState({
          invalidInput: false,
          [name]: value,
        })
      }
    }

    this.props.handle(this.state, "details");
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
