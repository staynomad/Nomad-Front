import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import uploadPhoto from "./photoUploadRequests";
class PhotoUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      image_url: [],
      invalid_type: false,
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    const currentImage = e.target.files[0];
    if (
      currentImage.type === "image/png" ||
      currentImage.type === "image/jpg" ||
      currentImage.type === "image/jpeg"
    ) {
      const cur_images = this.state.image_url;
      cur_images.push(URL.createObjectURL(currentImage));
      this.setState({
        images: e.target.files,
        invalid_type: false,
        image_url: cur_images,
      });
      console.log(cur_images);
      //uploadPhoto(currentImage, "vhomes-images-bucket");
      //this.props.handle(saved_picture.url, "pictures");
    } else {
      this.setState({
        invalid_type: true,
      });
    }
  }
  currentImagesList() {
    return this.state.image_url.map((image) => {
      return (
        <img
          style={{ maxHeight: 100, maxwidth: 100 }}
          id="target"
          src={image}
        />
      );
    });
  }
  render() {
    return (
      <div>
        <h1>upload some pictures</h1>
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
    listingData: state.CreateListing.state,
    userSession: state.Login.userInfo.session,
  };
};
export default withRouter(connect(mapStateToProps, null)(PhotoUpload));
