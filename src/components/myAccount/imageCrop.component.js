import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import ReactCrop from "react-image-crop";

import { submitImageChange } from "../../redux/actions/userActions";
import "./imageCrop.css";

const ImageCrop = ({
  imgName,
  newProfileImg,
  setNewProfileImg,
  submitImageChange,
  userInfo,
}) => {
  const [crop, setCrop] = useState({ unit: "%", aspect: 1 / 1, height: 50 });
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const croppedImage = useRef(null);

  const submitPFPChange = () => {
    let profileImg = new FormData();
    const imageToUpload = new File(
      [croppedImage.current],
      croppedImage.current.name
    );
    profileImg.append("image", imageToUpload);

    submitImageChange(userInfo._id, profileImg);
    setNewProfileImg(null);
  };

  const makeClientCrop = async (crop) => {
    if (imgRef.current && crop.width && crop.height) {
      croppedImage.current = await getCroppedImg(imgRef.current, crop, imgName);
    }
  };

  const getCroppedImg = (image, crop, fileName) => {
    if (!canvasRef.current || !imgRef.current) {
      return;
    }
    const canvas = canvasRef.current;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error("Canvas is empty");
          return;
        }
        blob.name = fileName;
        resolve(blob);
      }, "image/jpeg");
    });
  };

  return (
    <div className="profile-image-crop-container">
      <div className="profile-image-crop-window">
        <div className="profile-image-crop-image-container">
          <ReactCrop
            circularCrop={true}
            className="profile-image-crop-image"
            src={newProfileImg}
            onImageLoaded={(img) => (imgRef.current = img)}
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => makeClientCrop(c)}
          />
        </div>
        <div className="profile-image-crop-preview-column">
          <h1>Preview</h1>
          <canvas className="profile-image-crop-preview" ref={canvasRef} />
          <div
            className="profile-image-crop-buttons"
            style={{
              marginTop: "auto",
            }}
          >
            <button onClick={submitPFPChange}>Save</button>
            <button
              onClick={() => {
                setNewProfileImg(null);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  let stateToReturn = { ...state };
  if (state.User.userInfo) stateToReturn.userInfo = state.User.userInfo;
  if (state.Loading.loading) stateToReturn.loading = state.Loading.loading;
  return stateToReturn;
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitImageChange: (...args) => dispatch(submitImageChange(...args)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageCrop);
