import React, { Component } from "react";
import DatesCL from "./datesCL.component";
import DetailsCL from "./detailsCL.component";
import Location from "./locationCL.component";
import Description from "./descCL.component";
import PricesCL from "./pricesCL.component";
import RulesCL from "./rulesCL.component";
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
      location: "",
      description: "",
      details: "",
      price: 0,
      rules: "",
      dates: "",
    };
    this.togglePage = this.togglePage.bind(this);
    this.tester = this.tester.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  tester(e, name) {
    this.setState({
      [name]: e,
    });
    console.log(this.state);
  }

  onSubmit() {
    //submit the data
    window.location = "/";
  }

  render() {
    return (
      <div className="fullListingBackground">
        <div className="overallListingForm">
          <form>
            <div>
              <div>
                {this.state.formval === 0 ? (
                  <Location handle={this.tester} />
                ) : (
                  ""
                )}
              </div>
              <div>
                {this.state.formval === 1 ? (
                  <Description handle={this.tester} />
                ) : (
                  ""
                )}
              </div>
              <div>
                {this.state.formval === 2 ? (
                  <DetailsCL handle={this.tester} />
                ) : (
                  ""
                )}
              </div>
              <div>
                {this.state.formval === 3 ? (
                  <PricesCL handle={this.tester} />
                ) : (
                  ""
                )}
              </div>
              <div>
                {this.state.formval === 4 ? (
                  <DatesCL handle={this.tester} />
                ) : (
                  ""
                )}
              </div>
              <div>
                {this.state.formval === 5 ? (
                  <RulesCL handle={this.tester} />
                ) : (
                  ""
                )}
              </div>
            </div>

            <div>
              {this.state.formval > 0 ? (
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
