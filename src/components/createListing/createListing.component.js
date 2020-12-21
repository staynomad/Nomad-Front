import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { newListing } from "../../redux/actions/createListingActions";
import { app } from "../../utils/axiosConfig.js";
import DatesCL from "./datesCL.component";
import DetailsCL from "./detailsCL.component";
import Location from "./locationCL.component";
import Description from "./descCL.component";
import PricesCL from "./pricesCL.component";
import TitleCL from "./titleCL.component";
import LandingPageCL from "./landingPageCL.component";
import PhotoUpload from "./photos/photoUpload.component";
import { getSignedURL } from "./photos/photoUploadRequests";
import "./createListing.css";
import ConfirmSubmission from "./confirmSubmission.component";
import {
  setLoadingTrue,
  setLoadingFalse,
  incompleteForm,
  completeForm,
} from "../../redux/actions/loadingActions";
class CreateListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formval: 0,
      maxpages: 9,
      loading_spinner: false,
      nextToggle: true,
    };
    this.togglePage = this.togglePage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.postRequest = this.postRequest.bind(this);
  }
  componentDidMount() {
    this.props.updateInfo(this.state);
    this.props.setLoadingFalse();

    if (!this.props.userSession) {
      alert("Please log in to create a listing.");
      return this.props.history.push("/login");
    }
    if (this.props.userSession.isHost === false) {
      alert("Please create a host account to create a listing.");
      return this.props.history.push("/");
    }
    if (this.props.userSession.isVerified === false) {
      alert("Please verify your account before creating a listing.");
      return this.props.history.push("/accountVerification/send");
    }
  }

  handleChange(e, name) {
    this.setState({
      [name]: e,
    });
  }

  onSubmit() {
    const dataToSend = this.props.listingData;
    let cur_photos = dataToSend.photos.pictures;

    let photoURLS = [];
    this.props.setLoadingTrue();
    for (let i = 0; i < cur_photos.length; i++) {
      const updatedFileName = encodeURIComponent(
        cur_photos[i].name + Math.random() * 1000
      );
      let action = this.props.setLoadingTrue;
      if (i === cur_photos.length - 1) {
        action = this.props.setLoadingFalse;
      }
      getSignedURL(
        cur_photos[i],
        updatedFileName,
        "vhomes-images-bucket",
        action
      );
      const picURL =
        "https://vhomes-images-bucket.s3.amazonaws.com/" + updatedFileName;
      photoURLS.push(picURL);
    }

    const available = [
      dataToSend.dates.start_date.toISOString().substring(0, dataToSend.dates.start_date.toISOString().indexOf("T")),
      dataToSend.dates.end_date.toISOString().substring(0, dataToSend.dates.end_date.toISOString().indexOf("T"))
    ];

    const newListing = {
      title: dataToSend.title,
      location: dataToSend.location,
      description: dataToSend.description,
      details: dataToSend.details,
      price: parseFloat(dataToSend.price).toFixed(2),
      tax: (dataToSend.price * .1).toFixed(2),
      available: available,
      pictures: photoURLS,
      calendarURL: this.props.calendarURL,
      booked: this.props.booked
    };
    app
      .post(`/listings/createListing`, newListing, {
        headers: {
          Authorization: `Bearer ${this.props.userSession.token}`,
        },
      })
      .then(() => this.postRequest())
      .then(() => (window.location = "/MyAccount"));
  }

  async postRequest() {
    await new Promise((r) => setTimeout(r, 5000));
  }
  render() {
    const pages = [
      <LandingPageCL />,
      <TitleCL />,
      <Location />,
      <Description />,
      <DetailsCL />,
      <PricesCL />,
      <PhotoUpload />,
      <DatesCL />,
      <ConfirmSubmission />,
    ];
    return (
      <div className="fullListingBackground">
        <div className="overallListingForm">
          {this.props.loading ? (
            <div id="spinner" />
          ) : (
            <form>
              <div>{pages[this.state.formval]}</div>
              <div>
                {!this.state.nextToggle ? (
                  <span style={{ color: "red" }}>
                    You are missing some parts. Please fill them in to continue
                  </span>
                ) : (
                  ""
                )}
                <br />
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
          )}
        </div>
      </div>
    );
  }

  togglePage(e) {
    let temp = this.state.formval;
    let validToggle = false;
    if (e.target.value === "Next" && this.props.formCompleted) {
      temp++;
      validToggle = true;
    } else if (e.target.value === "Back") {
      temp--;
      validToggle = true;
    }

    this.setState({
      formval: temp,
      nextToggle: validToggle,
    });
  }
}

const mapStateToProps = (state) => {
  if (state.Login.userInfo)
    return {
      listingData: state.CreateListing,
      userSession: state.Login.userInfo.session,
      loading: state.Loading.loading,
      formCompleted: state.Loading.formCompleted,
      calendarURL: state.Calendar.calendarURL,
      booked: state.Calendar.booked
    };
  return {
    listingData: state.CreateListing,
    formCompleted: state.Loading.formCompleted,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateInfo: (toUpdate) => dispatch(newListing(toUpdate)),
    setLoadingFalse: () => dispatch(setLoadingFalse()),
    setLoadingTrue: () => dispatch(setLoadingTrue()),
    completeForm: () => dispatch(completeForm()),
    incompleteForm: () => dispatch(incompleteForm()),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreateListing)
);
