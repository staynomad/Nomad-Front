import React from "react";
import Modal from "@material-ui/core/Modal";

import { createBrowserHistory } from "history";

import "./home.css";
import Filter from "../../assets/svg/filter.svg";
import FilterSearchModal from "./FilterSearchModal";

const Search = (props) => {
  const [itemToSearch, setItemToSearch] = React.useState("");
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [filters, setFilters] = React.useState({
    sortByGuests: null,
    sortByPrice: null,
    minGuests: null,
    maxPrice: null,
  });

  const history = createBrowserHistory({ forceRefresh: true });

  const handleSearch = (event) => {
    event.preventDefault();
    history.push(
      `/listings?search=${itemToSearch}${
        filters.minGuests !== null ? "&minGuests=" + filters.minGuests : ""
      }${filters.maxPrice !== null ? "&maxPrice=" + filters.maxPrice : ""}${
        filters.sortByGuests !== null
          ? "&sortGuests=" + filters.sortByGuests
          : ""
      }${
        filters.sortByPrice !== null ? "&sortPrice=" + filters.sortByPrice : ""
      }`
    );
    setItemToSearch(itemToSearch);
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", margin: "1rem 0rem" }}
      className="overallsearch wow fadeInUp"
      data-wow-delay="0.5s"
    >
      <Modal open={filterOpen} onClose={() => setFilterOpen(false)}>
        <FilterSearchModal
          closeModal={() => setFilterOpen(false)}
          setFilters={setFilters}
        />
      </Modal>
      <form
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
        onSubmit={handleSearch}
      >
        <input
          type="text"
          placeholder="Type in a city, state, or zipcode"
          className="inputtextbox"
          style={{ margin: "1rem 0rem" }}
          onChange={(e) => setItemToSearch(e.target.value)}
          value={itemToSearch}
        />
        <input
          className="booknowbutton"
          style={{ marginLeft: "1rem", fontSize: "1.5rem" }}
          type="button"
          value="Search"
          onClick={handleSearch}
        />{" "}
        <img
          onClick={() => setFilterOpen(true)}
          src={Filter}
          alt=""
          className="search-filter-btn"
        />
      </form>
      <br />
    </div>
  );
};

export default Search;
