import React, { Component } from "react";
import Axios from "axios";
import DatesCL from "./datesCL.component";
import DetailsCL from "./detailsCL.component";
import Location from "./locationCL.component";
import Description from "./descCL.component";
import PricesCL from "./pricesCL.component";
import RulesCL from "./rulesCL.component";
//import EndingCL from "./endingCL.component";
import "./createListing.css";
//convert details into array
//convert prices into val
//convert rules into array
//convert date into date
export default class CreateListing extends Component {
  constructor() {
    super();
    this.state = {
      formval: 0,
      maxpages: 6,
      location: {},
      description: "",
      details: {},
      price: 0,
      rules: "",
      dates: {},
    };
    this.togglePage = this.togglePage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  handleChange(e, name) {
    this.setState({
      [name]: e,
    });
    console.log(this.state);
  }

  onSubmit() {
    const newListing = {
      location: this.state.location,
      description: this.state.description,
      details: this.state.details,
      price: this.state.price,
      rules: this.state.rules,
      available: this.state.dates,
    };
    Axios.post("http://localhost:8080/listings/createListing", newListing)
      .then(() => console.log("listing created"))
      .catch((res) => console.log(res));
    let temp = this.state.formval;
    temp++;
    this.setState({
      formval: temp,
    });
    console.log("enters");
    if (this.state.maxpages - 1 === this.state.formval) {
      window.location = "/";
    }
  }

  render() {
    return (
      <div className="fullListingBackground">
        <div className="overallListingForm">
          <form>
            <div>
              <div>
                {this.state.formval === 0 ? (
                  <Location handle={this.handleChange} />
                ) : (
                  ""
                )}
              </div>
              <div>
                {this.state.formval === 1 ? (
                  <Description handle={this.handleChange} />
                ) : (
                  ""
                )}
              </div>
              <div>
                {this.state.formval === 2 ? (
                  <DetailsCL handle={this.handleChange} />
                ) : (
                  ""
                )}
              </div>
              <div>
                {this.state.formval === 3 ? (
                  <PricesCL handle={this.handleChange} />
                ) : (
                  ""
                )}
              </div>
              <div>
                {this.state.formval === 4 ? (
                  <DatesCL handle={this.handleChange} />
                ) : (
                  ""
                )}
              </div>
              <div>
                {this.state.formval === 5 ? (
                  <RulesCL handle={this.handleChange} />
                ) : (
                  ""
                )}
              </div>
            </div>

            <div>
              {this.state.formval > 0 &&
              this.state.formval !== this.state.maxpages - 1 ? (
                <input
                  className="changebut"
                  type="button"
                  onClick={this.togglePage}
                  value="Back"
                />
              ) : (
                ""
              )}

              {this.state.formval < this.state.maxpages - 1 ? (
                <input
                  className="changebut"
                  type="button"
                  onClick={this.togglePage}
                  value="Next"
                />
              ) : (
                <input
                  className="changebut"
                  type="button"
                  onClick={this.onSubmit}
                  value="Submit"
                />
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }

  togglePage(e) {
    let temp = this.state.formval;
    e.target.value === "Next" ? temp++ : temp--;
    this.setState({
      formval: temp,
    });
  }
}
