import React, { useState } from "react";
import "./filtersearchmodal.css";

import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import MonetizationOnOutlinedIcon from "@material-ui/icons/MonetizationOnOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import RadioButtonUncheckedOutlinedIcon from "@material-ui/icons/RadioButtonUncheckedOutlined";
import RadioButtonCheckedOutlinedIcon from "@material-ui/icons/RadioButtonCheckedOutlined";

const FilterSearchModal = (props) => {
  const [priceInput, setPriceInput] = useState("");
  const [guestsInput, setGuestsInput] = useState("");
  //null = no sort, true = high to low, false = low to high
  const [sortPrice, setSortPrice] = useState(null);
  const [sortGuests, setSortGuests] = useState(null);

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
              placeholder="$100"
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
              placeholder="3"
            />
          </div>
        </div>
        <div className="filter-searh-modal-right-container">
          <div className="filter-search-modal-radio-container">
            <div className="filter-search-modal-radio-row">
              {sortPrice === null || sortPrice === true ? (
                <RadioButtonUncheckedOutlinedIcon
                  onClick={() => setSortPrice(false)}
                />
              ) : (
                <RadioButtonCheckedOutlinedIcon
                  onClick={() => setSortPrice(null)}
                />
              )}
              <h3>Price: Low to High</h3>
            </div>
            <div className="filter-search-modal-radio-row">
              {sortPrice === null || sortPrice === false ? (
                <RadioButtonUncheckedOutlinedIcon
                  onClick={() => setSortPrice(true)}
                />
              ) : (
                <RadioButtonCheckedOutlinedIcon
                  onClick={() => setSortPrice(null)}
                />
              )}
              <h3>Price: High to Low</h3>
            </div>
          </div>
          <div className="filter-search-modal-radio-container">
            <div className="filter-search-modal-radio-row">
              {sortGuests === null || sortGuests === true ? (
                <RadioButtonUncheckedOutlinedIcon
                  onClick={() => setSortGuests(false)}
                />
              ) : (
                <RadioButtonCheckedOutlinedIcon
                  onClick={() => setSortGuests(null)}
                />
              )}
              <h3>Guests: Low to High</h3>
            </div>
            <div className="filter-search-modal-radio-row">
              {sortGuests === null || sortGuests === false ? (
                <RadioButtonUncheckedOutlinedIcon
                  onClick={() => setSortGuests(true)}
                />
              ) : (
                <RadioButtonCheckedOutlinedIcon
                  onClick={() => setSortGuests(null)}
                />
              )}
              <h3>Guests: High to Low</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="filter-search-modal-button-container">
        <button>Confirm</button>
      </div>
    </div>
  );
};

export default FilterSearchModal;
