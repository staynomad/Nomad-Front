import React from "react";
import "./filtersearchmodal.css";

import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

const FilterSearchModal = (props) => {
  return (
    <div className="filter-search-modal-container">
      <div className="filter-search-modal-header">
        <KeyboardBackspaceIcon onClick={props.closeModal} />
        <h1>Looking For Something Specific?</h1>
      </div>
      <div className="filter-search-modal-content"></div>
    </div>
  );
};

export default FilterSearchModal;
