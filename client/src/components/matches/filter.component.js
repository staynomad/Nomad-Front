import React, { useState } from "react";
import Roommates from "./roommates.component";
import "./matches.css";

// export default class Filter extends Component {
const Filter = ({ toggle }) => {
  const [roomOrListing, setRoomOrListing] = useState(null);

  return (
    <div>
      <div className="modal_content filter_container">
        <span className="close" onClick={toggle}>
          &times;{" "}
        </span>
        <div>
          <input
            type="checkbox"
            id="roomates"
            onClick={() => setRoomOrListing("roommates")}
          />{" "}
          roomates <br />
          <input
            type="checkbox"
            id="properties"
            onClick={() => setRoomOrListing("properties")}
          />{" "}
          properties <br />
          <select>
            <option selected>nights</option>
            <option>1-3</option>
            <option>3-7</option>
            <option>7+</option>
          </select>
        </div>
      </div>
      <div>
        {roomOrListing === "roommates" ? (
          <Roommates />
        ) : (
          console.log(roomOrListing)
        )}
      </div>
    </div>
  );
};

export default Filter;
