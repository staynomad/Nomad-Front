import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import uploadPhoto from "./photoUploadRequests";
class PhotoUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
    };
    this.onClick = this.onClick.bind(this);
    this.onUpload = this.onUpload.bind(this);
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
      console.log(e.target.files[0]);
      uploadPhoto(currentImage, this.props.userSession.token);
    }

    //
  }
  onUpload() {
    console.log("enter");
  }
  render() {
    return (
      <div>
        <h1>upload some pictures</h1>
        <div>
          <input type="file" onChange={this.onClick} />
        </div>
        <div>
          <input type="button" value="upload" onClick={this.state.onUpload} />
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
