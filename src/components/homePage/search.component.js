import React from "react";
import Modal from "@material-ui/core/Modal";

import "./home.css";
import Filter from "../../assets/svg/filter.svg";
import FilterSearchModal from "./FilterSearchModal";

const Search = (props) => {
  const [itemToSearch, setItemToSearch] = React.useState("");
  const [filterOpen, setFilterOpen] = React.useState(false);
  const { history } = props;

  const handleSearch = (event) => {
    event.preventDefault();
    history.push(`/listings?${itemToSearch}`);
    setItemToSearch(itemToSearch);
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", margin: "1rem 0rem" }}
      className="overallsearch wow fadeInUp"
      data-wow-delay="0.5s"
    >
      <Modal open={filterOpen} onClose={() => setFilterOpen(false)}>
        <FilterSearchModal closeModal={() => setFilterOpen(false)} />
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
        <div onClick={() => setFilterOpen(true)} className="search-filter-btn">
          <img src={Filter} alt="" />
        </div>
        <input
          className="booknowbutton"
          style={{ marginLeft: "1rem", fontSize: "1.5rem" }}
          type="button"
          value="Search"
          onClick={handleSearch}
        />
      </form>
      <br />
    </div>
  );
};

export default Search;
