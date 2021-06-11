import React from "react";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

import "./friendsModal.css";

const friendsModal = (props) => {
  return (
    <div className="friends-modal-screen">
      <div className="friends-modal-container">
        <div className="friends-modal-header">
          <KeyboardBackspaceIcon
            onClick={props.handleClose}
            className="friends-modal-back-btn"
          />
          <h1>Friends</h1>
        </div>
        <div className="friends-modal-content"></div>
      </div>
    </div>
  );
};

export default friendsModal;
