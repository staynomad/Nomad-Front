import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
//import { getSignedURL } from "./photoUploadRequests";
import {
  incompleteForm,
  completeForm,
} from "../../../redux/actions/loadingActions";
import { newListing } from "../../../redux/actions/createListingActions";

class PhotoUpload extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    this.onClick = this.onClick.bind(this);
  }

  getInitialState() {
    let pics = this.props.photoData.pictures;
    if (pics.length === 0) {
      this.props.incompleteForm();
    } else {
      this.props.completeForm();
    }
    return {
      pictures: pics,
      temp_image_url: this.props.photoData.temp_image_url,
      invalid_type: false,
    };
  }

  onClick(e) {
    const currentImage = e.target.files[0];
    if (
      currentImage.type === "image/png" ||
      currentImage.type === "image/jpg" ||
      currentImage.type === "image/jpeg"
    ) {
      const cur_images_urls = [
        ...this.state.temp_image_url,
        URL.createObjectURL(currentImage),
      ];
      const cur_images = [...this.state.pictures, currentImage];
      this.props.completeForm();
      this.setState({
        pictures: cur_images,
        invalid_type: false,
        temp_image_url: cur_images_urls,
      });

      const temp = {
        pictures: cur_images,
        temp_image_url: cur_images_urls,
      };
      this.props.newListing({ value: temp, name: "photos" });
    } else {
      this.setState({
        invalid_type: true,
      });
    }
  }

  currentImagesList() {
    return this.state.temp_image_url.map((image) => {
      return (
        <img
          style={{ maxHeight: 100, maxwidth: 100 }}
          id="target"
          src={image}
          alt=" "
          key={Math.random()}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h1>Pictures</h1>
        <div className="questionText">
          Share some images of your property!
        </div>{" "}
        <br />
        <div>
          {this.state.invalid_type ? (
            <h2 style={{ color: "red" }}>Must be PNG, JPG, or JPEG format</h2>
          ) : (
            ""
          )}
          <input type="file" onChange={this.onClick} />
          <br />
          <div>{this.currentImagesList()}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    photoData: state.CreateListing.photos,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    newListing: (toUpdate) => dispatch(newListing(toUpdate)),
    completeForm: () => dispatch(completeForm()),
    incompleteForm: () => dispatch(incompleteForm()),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PhotoUpload)
);
