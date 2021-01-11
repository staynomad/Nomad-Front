import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  incompleteForm,
  completeForm,
} from "../../redux/actions/loadingActions";
import { newListing } from "../../redux/actions/createListingActions";

const Amenities = (props) => {
  const handleChange = (e) => {
    const name = e.target.name;
    const currentList = props.listingData.amenities;
    if (currentList.includes(name)) {
      currentList.pop(name);
    } else {
      currentList.push(name);
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
        <input type="checkbox" name={option} onChange={handleChange} />
      </div>
    );
  });
  return (
    <div>
      <div className="questionText">Amenities</div>
      <br />
      {amenityList}
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
