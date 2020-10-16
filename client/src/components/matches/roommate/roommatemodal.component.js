import React from 'react';
import "./roommatemodal.css";

class RoommateModal extends React.Component {
  constructor(props) {
    super(props);
    this.roommate = props.roommate;
  }

  render() {
    return (
      <div className="roommate-modal">
        <h1>Name: {this.roommate.name}</h1>
        <div>
          {this.roommate.id}
        </div>
      </div>
    )
  }
};

export default RoommateModal;