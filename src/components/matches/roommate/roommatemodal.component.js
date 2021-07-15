import React from "react";
import "./roommatemodal.css";

class RoommateModal extends React.Component {
  constructor(props) {
    super(props);
    this.roommate = this.props.roommate;
  }

  render() {
    return (
      <div className="roommate-modal">
        <h1>Name: {this.props.roommate.name}</h1>
      </div>
    );
  }
}

export default RoommateModal;
