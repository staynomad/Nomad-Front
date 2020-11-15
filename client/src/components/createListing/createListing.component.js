import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { updateInfo } from "../../redux/actions/createListingActions";
import Axios from "axios";
import DatesCL from "./datesCL.component";
import DetailsCL from "./detailsCL.component";
import Location from "./locationCL.component";
import Description from "./descCL.component";
import PricesCL from "./pricesCL.component";
import RulesCL from "./rulesCL.component";
import TitleCL from "./titleCL.component";
import LandingPageCL from "./landingPageCL.component";
import PhotoUpload from "./photoUpload.component";
import "./createListing.css";
import ConfirmSubmission from "./confirmSubmission.component";

class CreateListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formval: 0,
      maxpages: 10,
      title: "",
      location: {
        street: "",
        city: "",
        state: "",
        country: "",
        zipcode: "",
        aptnum: "",
      },
      description: "",
      details: {
        beds: "",
        baths: "",
        maxpeople: "",
      },
      photos:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffiles.lafm.com.co%2Fassets%2Fpublic%2F2019-08%2Fmeme__0.jpg&f=1&nofb=1",
      price: null,
      rules: "",
      dates: {},
    };
    this.togglePage = this.togglePage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onUpload = this.onUpload.bind(this);
  }
  componentDidMount() {
    this.props.updateInfo(this.state);
  }
  handleChange(e, name) {
    this.setState({
      [name]: e,
    });
    const updatedData = {
      title: this.state.title,
      location: this.state.location,
      description: this.state.description,
      details: this.state.details,
      price: this.state.price,
      rules: this.state.rules,
      dates: this.state.dates,
    };
    this.props.updateInfo(updatedData);
    console.log(this.state);
  }
  onUpload(e) {
    //const pics = Array.from(e.target)
    console.log(e.images);
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
    Axios.post("/listings/createListing", newListing)
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
    const pages = [
      <LandingPageCL />,
      <TitleCL />,
      <Location />,
      <Description />,
      <DetailsCL />,
      <PricesCL />,
      <DatesCL />,
      <RulesCL />,
      <PhotoUpload />,
      <ConfirmSubmission />,
    ];
    return (
      <div className="fullListingBackground">
        <div className="overallListingForm">
          <form>
            <div handle={this.handleChange}>{pages[this.state.formval]}</div>
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
    //console.log(this.props)
  }
}
const mapStateToProps = (state) => {
  //console.log(state)
  return {
    listingData: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateInfo: (toUpdate) => dispatch(updateInfo(toUpdate)),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreateListing)
);
