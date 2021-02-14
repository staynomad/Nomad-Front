import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  incompleteForm,
  completeForm,
} from "../../redux/actions/loadingActions";
import { newListing } from "../../redux/actions/createListingActions";
import "./amenities.css";

import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

const Amenities = (props) => {
  const [checkboxEnabled, checkboxChange] = useState(true);
  let [prevAmenities, amenitiesChange] = useState([]);
  let currentList = props.listingData.amenities;
  const handleChange = (e) => {
    const name = e.target.className;
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
    "Heating",
    "Pool",
    "Towels",
    "Hair dryer",
  ];
  const amenityList = options.map((option) => {
    return (
      <div className="amenity" key={option}>
        {checkboxEnabled ? (
          <img
            src={`${process.env.PUBLIC_URL}/images/amenities/${option.replace(
              / /g,
              ""
            )}_.svg`}
            alt={option}
            className={option}
            id="create-listing-amenity"
            height="50px"
            onClick={handleChange}
            style={{
              filter: currentList.includes(option)
                ? "brightness(0) saturate(100%) invert(44%) sepia(98%) saturate(1252%) hue-rotate(131deg) brightness(92%) contrast(101%)"
                : "brightness(0) saturate(100%)   invert(82%) sepia(92%) saturate(1%) hue-rotate(300deg) brightness(92%) contrast(93%)",
            }}
          />
        ) : (
          <img
            src={`${process.env.PUBLIC_URL}/images/amenities/${option.replace(
              / /g,
              ""
            )}_.svg`}
            alt={option}
            className={option}
            height="50px"
            style={{
              filter:
                "brightness(0) saturate(100%)   invert(82%) sepia(92%) saturate(1%) hue-rotate(300deg) brightness(92%) contrast(93%)",
            }}
          />
        )}
        <h3 className="create-listing-amenity-text">{option}</h3>
      </div>
    );
  });
  return (
    <div className="create-listing-amenities-container">
      <div className="questionText">Amenities</div>
      <div className="spacer_s"></div>
      <div className="amenities-list">{amenityList}</div>
      <div className="spacer_xs"></div>

      {checkboxEnabled ? (
        <div
          style={{ display: "inline-block", cursor: "pointer" }}
          className="No Amenities"
          onClick={handleChange}
        >
          <CheckBoxOutlineBlankIcon className="create-listing-no-amenities" />
        </div>
      ) : (
        <div
          style={{ display: "inline-block", cursor: "pointer" }}
          className="No Amenities"
          onClick={handleChange}
        >
          <CheckBoxIcon className="create-listing-no-amenities active" />
        </div>
      )}
      <div className="create-listing-amenity-text">No Amenities</div>
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
