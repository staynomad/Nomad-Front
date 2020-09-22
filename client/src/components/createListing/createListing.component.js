import React, { Component } from "react";
import DatesCL from "./datesCL.component";
import DetailsCL from "./detailsCL.component";
import LocDesc from "./locDescCL.component";
import PricesCL from "./pricesCL.component";
import RulesCL from "./rulesCL.component";

export default class CreateListing extends Component {
  constructor() {
    super();
    this.state = {
      formval: 0,
      maxpages: 5,
      location: "",
      description: "",
      price: 0,
      rules: "",
      dates: "",
    };
    this.togglePage = this.togglePage.bind(this);
    this.handler = this.handler.bind(this);
  }
  handler() {
    console.log("this");
  }

  render() {
    return (
      <div>
        <div>
          <div>
            {this.state.formval === 0 ? <LocDesc handle={this.handler} /> : ""}
          </div>
          <div>{this.state.formval === 1 ? <DetailsCL /> : ""}</div>
          <div>{this.state.formval === 2 ? <PricesCL /> : ""}</div>
          <div>{this.state.formval === 3 ? <DatesCL /> : ""}</div>
          <div>{this.state.formval === 4 ? <RulesCL /> : ""}</div>
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
    console.log(this.state);
  }
}
