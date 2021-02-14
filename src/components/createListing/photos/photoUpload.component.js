import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
//import { getSignedURL } from "./photoUploadRequests";
import {
  incompleteForm,
  completeForm,
} from "../../../redux/actions/loadingActions";
import { newListing } from "../../../redux/actions/createListingActions";
import "../createListing.css";
import "./photos.css";

class PhotoUpload extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    this.onClick = this.onClick.bind(this);
    this.deletePhoto = this.deletePhoto.bind(this);
  }

  getInitialState() {
    let pics = this.props.photoData.pictures;
    if (pics.length === 0) {
      this.props.incompleteForm();
    } else {
      this.props.completeForm();
    }
    return {
      invalid_type: false,
    };
  }

  onClick(e) {
    let cur_images = { ...this.props.photoData.pictures };
    let image_files = [...this.props.photoData.image_files];
    for (let i = 0; i < e.target.files.length; i++) {
      const currentImage = e.target.files[i];
      if (
        currentImage.type === "image/png" ||
        currentImage.type === "image/jpg" ||
        currentImage.type === "image/jpeg"
      ) {
        const curUrl = URL.createObjectURL(currentImage);
        cur_images[currentImage.name] = curUrl;

        image_files.push(currentImage);
        this.props.completeForm();
      } else {
        this.setState({
          invalid_type: true,
        });
      }
    }
    this.setState({
      invalid_type: false,
    });

    const temp = {
      pictures: cur_images,
      image_files: image_files,
    };
    this.props.newListing({ value: temp, name: "photos" });
  }
  deletePhoto(e) {
    let name = e.target.title;
    let tempFiles = this.props.photoData.image_files;
    let tempPhotos = this.props.photoData.pictures;
    const i = tempFiles.findIndex((n) => n.name === name);
    tempFiles.splice(i, 1);
    delete tempPhotos[name];
    const temp = {
      pictures: tempPhotos,
      image_files: tempFiles,
    };
    this.props.newListing({ value: temp, name: "photos" });
  }

  currentImagesList() {
    const photoList = Object.keys(this.props.photoData.pictures);
    return photoList.map((image) => {
      return (
        <div key={image} className="single-img-container">
          <img
            style={{ maxHeight: 200, maxwidth: 200 }}
            id="target"
            src={this.props.photoData.pictures[image]}
            alt=" "
          />
          <input
            type="button"
            value="X"
            onClick={this.deletePhoto}
            className="delete-btn"
            title={image}
          />
        </div>
      );
    });
  }

  render() {
    return (
      <div className="create-listing-photos-container">
        <div className="questionText">Pictures</div> <br />
        <div>
          {this.state.invalid_type ? (
            <div className="bad-image">
              Must be PNG, JPG, or JPEG format<div className="spacer_xxs"></div>
            </div>
          ) : (
            ""
          )}
          <input
            className="upload-file"
            type="file"
            multiple
            onChange={this.onClick}
          />
          <br />
          <div>{this.currentImagesList()}</div>
          <span>Tip: Hold down "ctrl" to select multiple pictures</span>
        </div>
        <div className="spacer_m"></div>
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
