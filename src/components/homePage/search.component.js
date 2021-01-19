import React from "react";
import "./home.css";

const Search = (props) => {
  const [itemToSearch, setItemToSearch] = React.useState("");
  const { history } = props;

  const handleSearch = (event) => {
    event.preventDefault();
    history.push(`/matches?${itemToSearch}`);
    setItemToSearch("")
  };

  return (
    <div className="overallsearch wow fadeInUp" data-wow-delay="0.5s">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="type in a city, state, or zipcode"
          className="inputtextbox"
          onChange={(e) => setItemToSearch(e.target.value)}
          value={itemToSearch}
        />
        <input className="booknowbutton" type="button" value="search" onClick={handleSearch} />
      </form>
      <br />

    </div>
  )
}


export default Search;
