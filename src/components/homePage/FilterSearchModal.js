import React, { useState } from "react";
import Select from "react-select";
import { useLocation } from "react-router-dom";
import "./filtersearchmodal.css";

import { createBrowserHistory } from "history";

import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import MonetizationOnOutlinedIcon from "@material-ui/icons/MonetizationOnOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import RadioButtonUncheckedOutlinedIcon from "@material-ui/icons/RadioButtonUncheckedOutlined";
import RadioButtonCheckedOutlinedIcon from "@material-ui/icons/RadioButtonCheckedOutlined";

import { stateStyles, stateOptions } from "../createListing/stateDropdown";
import countryDropdown from "../createListing/countryDropdown";

const FilterSearchModal = (props) => {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const q = useQuery();
  const [priceInput, setPriceInput] = useState(q.get("maxPrice") || "");
  const [guestsInput, setGuestsInput] = useState(q.get("minGuests") || "");
  //null = no sort, true = high to low, false = low to high
  const [sortPrice, setSortPrice] = useState(
    q.get("sortPrice") ? q.get("sortPrice") === "true" : null
  );
  const [sortGuests, setSortGuests] = useState(
    q.get("sortGuests") ? q.get("sortGuests") === "true" : null
  );
  const [stateFilter, setStateFilter] = useState(q.get("state") || "");
  const [countryFilter, setCountryFilter] = useState(q.get("country") || "");

  const history = createBrowserHistory({ forceRefresh: true });

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

  const handleConfirm = () => {
    const options = {
      sortByGuests: sortGuests,
      sortByPrice: sortPrice,
      maxPrice: priceInput === "" ? null : priceInput,
      minGuests: guestsInput === "" ? null : guestsInput,
      countryFilter: countryFilter === "" ? null : countryFilter,
      stateFilter: stateFilter === "" ? null : stateFilter,
    };

    history.push(
      `/listings?search=${props.itemToSearch}${
        options.minGuests !== null ? "&minGuests=" + options.minGuests : ""
      }${options.maxPrice !== null ? "&maxPrice=" + options.maxPrice : ""}${
        options.sortByGuests !== null
          ? "&sortGuests=" + options.sortByGuests
          : ""
      }${
        options.sortByPrice !== null ? "&sortPrice=" + options.sortByPrice : ""
      }${
        options.countryFilter !== null
          ? "&country=" + options.countryFilter
          : ""
      }${options.stateFilter !== null ? "&state=" + options.stateFilter : ""}`
    );

    props.setFilters({
      options,
    });
    props.closeModal();
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
        <div className="filter-searh-modal-top-container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0 2rem",
            }}
          >
            <h2 style={{ width: "10rem" }}>Country:</h2>
            <Select
              onChange={(e) => setCountryFilter(e.value)}
              value={countryDropdown.filter(
                (option) => option.value === countryFilter
              )}
              placeholder="Select Country..."
              styles={stateStyles}
              options={countryDropdown}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0 2rem",
            }}
          >
            <h2 style={{ width: "10rem" }}>State:</h2>
            <Select
              onChange={(e) => setStateFilter(e.value)}
              value={
                countryFilter === "USA"
                  ? stateOptions.filter(
                      (option) => option.value === stateFilter
                    )
                  : ""
              }
              placeholder="Select State..."
              styles={stateStyles}
              options={countryFilter === "USA" ? stateOptions : []}
            />
          </div>
        </div>
      </div>
      <div className="filter-search-modal-button-container">
        <button
          onClick={() => {
            handleConfirm();
          }}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default FilterSearchModal;
