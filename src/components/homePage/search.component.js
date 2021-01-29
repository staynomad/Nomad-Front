import React from "react";
import "./home.css";

const Search = (props) => {
  const [itemToSearch, setItemToSearch] = React.useState("");
  const { history } = props;

  const handleSearch = (event) => {
    event.preventDefault();
    history.push(`/matches?${itemToSearch}`);
    setItemToSearch("");
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", margin: "1rem 0rem" }}
      className="overallsearch wow fadeInUp"
      data-wow-delay="0.5s"
    >
      <form
        style={{ display: "flex", alignItems: "center" }}
        onSubmit={handleSearch}
      >
        <input
          type="text"
          placeholder="type in a city, state, or zipcode"
          className="inputtextbox"
          style={{ margin: "1rem 0rem", fontSize: "1.5rem" }}
          onChange={(e) => setItemToSearch(e.target.value)}
          value={itemToSearch}
        />
        <input
          className="booknowbutton"
          style={{ marginLeft: "1rem", fontSize: "1.5rem" }}
          type="button"
          value="search"
          onClick={handleSearch}
        />
      </form>
      <br />
    </div>
  );
};

export default Search;
