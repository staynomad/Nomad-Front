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
      this.setState({
        images: e.target.files,
      });

      const saved_picture = uploadPhoto(
        currentImage,
        this.props.userSession.token
      );

      //this.props.handle(saved_picture.url, "pictures");
    }
  }
  render() {
    return (
      <div>
        <h1>upload some pictures</h1>
        <div>
          <input type="file" onChange={this.onClick} />
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
