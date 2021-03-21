import React, { useState } from "react";
import "./filtersearchmodal.css";

import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import MonetizationOnOutlinedIcon from "@material-ui/icons/MonetizationOnOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";

const FilterSearchModal = (props) => {
  const [priceInput, setPriceInput] = useState("");
  const [guestsInput, setGuestsInput] = useState("");

  const handlePriceChange = (e) => {
    if (!isNaN(e.target.value) && e.target.value < 1000) {
      setPriceInput(e.target.value);
    }
  };

  const handleGuestsChange = (e) => {
    if (!isNaN(e.target.value) && e.target.value < 11) {
      setGuestsInput(e.target.value);
    }
  };

  return (
    <div className="filter-search-modal-container">
      <div className="filter-search-modal-header">
        <KeyboardBackspaceIcon onClick={props.closeModal} />
        <h1>Looking For Something Specific?</h1>
      </div>
      <div className="filter-search-modal-content">
        <div className="filter-searh-modal-left-container">
          <div className="filter-search-modal-input-row">
            <MonetizationOnOutlinedIcon />
            <h2>Max Price:</h2>
            <input
              placeholder="$"
              type="text"
              value={priceInput}
              onChange={(e) => handlePriceChange(e)}
            />
          </div>
          <div className="filter-search-modal-input-row">
            <PersonOutlineOutlinedIcon />
            <h2 className="guests">Min Guests:</h2>
            <input
              type="text"
              value={guestsInput}
              onChange={(e) => handleGuestsChange(e)}
            />
          </div>
        </div>
        <div className="filter-searh-modal-right-container"></div>
      </div>
      <div className="filter-search-modal-button-container"></div>
    </div>
  );
};

export default FilterSearchModal;
