import React, { Component } from "react";
import DatesCL from "./datesCL.component";
import DetailsCL from "./detailsCL.component";
import LocDesc from "./locDescCL.component";
import PricesCL from "./pricesCL.component";
import RulesCL from "./rulesCL.component";
//convert details into array
//convert prices into val
//convert rules into array
//convert date into date
export default class CreateListing extends Component {
  constructor() {
    super();
    this.state = {
      formval: 0,
      maxpages: 5,
      location: "",
      description: "",
      details: "",
      price: 0,
      rules: "",
      dates: "",
    };
    this.togglePage = this.togglePage.bind(this);
    this.tester = this.tester.bind(this);
  }
  tester(e, name) {
    this.setState({
      [name]: e,
    });
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <div>
          <div>
            {this.state.formval === 0 ? <LocDesc handle={this.tester} /> : ""}
          </div>
          <div>
            {this.state.formval === 1 ? <DetailsCL handle={this.tester} /> : ""}
          </div>
          <div>
            {this.state.formval === 2 ? <PricesCL handle={this.tester} /> : ""}
          </div>
          <div>
            {this.state.formval === 3 ? <DatesCL handle={this.tester} /> : ""}
          </div>
          <div>
            {this.state.formval === 4 ? <RulesCL handle={this.tester} /> : ""}
          </div>
        </div>

        <div>
          {this.state.formval > 0 ? (
            <input type="button" onClick={this.togglePage} value="Back" />
          ) : (
            ""
          )}
          {this.state.formval < this.state.maxpages - 1 ? (
            <input type="button" onClick={this.togglePage} value="Next" />
          ) : (
            <input type="button" onClick={this.submit} value="Submit" />
          )}
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
