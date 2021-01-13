import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  incompleteForm,
  completeForm,
} from "../../redux/actions/loadingActions";
import { newListing } from "../../redux/actions/createListingActions";

const Amenities = (props) => {
  const [checkboxEnabled, checkboxChange] = useState(true);
  let [prevAmenities, amenitiesChange] = useState([]);
  const handleChange = (e) => {
    const name = e.target.name;
    let currentList = props.listingData.amenities;
    if (name === "No Amenities") {
      if (!checkboxEnabled) {
        checkboxChange(true);
        currentList = prevAmenities;
      } else {
        prevAmenities = amenitiesChange(currentList);
        checkboxChange(!checkboxEnabled);
        currentList = [];
      }
    } else {
      if (currentList.includes(name)) {
        currentList.splice(currentList.indexOf(name), 1);
      } else {
        currentList.push(name);
      }
    }
    props.newListing({ name: "amenities", value: currentList });
  };

  const options = [
    "Pool",
    "Gym",
    "Spa",
    "Gated Community",
    "Home Theater",
    "Balcony/Porch",
    "Basement",
  ];
  const amenityList = options.map((option) => {
    return (
      <div>
        <span>{option}</span>
        <input
          type="checkbox"
          disabled={!checkboxEnabled}
          name={option}
          onChange={handleChange}
        />
      </div>
    );
  });
  return (
    <div>
      <div className="questionText">Amenities</div>
      <br />
      {amenityList}
      <span>No Amenities</span>
      <input type="checkbox" name="No Amenities" onChange={handleChange} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    listingData: state.CreateListing,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    newListing: (updatedData) => dispatch(newListing(updatedData)),
    completeForm: () => dispatch(completeForm()),
    incompleteForm: () => dispatch(incompleteForm()),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Amenities)
);
