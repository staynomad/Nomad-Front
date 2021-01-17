import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  incompleteForm,
  completeForm,
} from "../../redux/actions/loadingActions";
import { newListing } from "../../redux/actions/createListingActions";
import "./amenities.css";

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
    "TV",
    "Kitchen",
    "Wifi",
    "Heat",
    "Pool",
    "Towels",
    "Hair dryer",
  ];
  const amenityList = options.map((option) => {
    return (
      <div className="amenity">
        <img
          src={`${process.env.PUBLIC_URL}/images/amenities/${option.replace(
            / /g,
            ""
          )}.svg`}
          alt={option}
          height="50px"
        />
        <input
          type="checkbox"
          disabled={!checkboxEnabled}
          name={option}
          onChange={handleChange}
          className="amenities-checkbox"
          minWidth="10%"
        />
        <div>{option}</div>
      </div>
    );
  });
  return (
    <div>
      <div className="questionText">Amenities</div>
      <div className="spacer_s"></div>
      <div className="amenities-list">{amenityList}</div>
      <div className="spacer_xs"></div>
      <input
        type="checkbox"
        name="No Amenities"
        onChange={handleChange}
        className="amenities-checkbox no-amenities-check"
      />
      <div className="no-amenities-label">No Amenities</div>
      <div className="spacer_l"></div>
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
