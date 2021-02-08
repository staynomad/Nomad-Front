import React from "react";
import "./home.css";

const Search = (props) => {
  const [itemToSearch, setItemToSearch] = React.useState("");
  const { history } = props;

  const handleSearch = (event) => {
    event.preventDefault();
    history.push(`/matches?${itemToSearch}`);
    setItemToSearch(itemToSearch);
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", margin: "1rem 0rem" }}
      className="overallsearch wow fadeInUp"
      data-wow-delay="0.5s"
    >
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
        />
      </form>
      <br />
    </div>
  );
};

export default Search;
