import React from "react";
import "./home.css";

const Search = (props) => {
  const [itemToSearch, setItemToSearch] = React.useState("");
  const {history} = props;

  const handleSearch = (event) => {
    event.preventDefault();
    history.push(`/matches?${itemToSearch}`);
    setItemToSearch("")
  };

  return (
    <div className="overallsearch">
      <input
        type="text"
        placeholder="find your next stay"
        className="inputtextbox"
        onChange={(e) => setItemToSearch(e.target.value)}
        value={itemToSearch}
      />
      <input className="booknowbutton" type="button" value="search" onClick={handleSearch}/>
      <br />

    </div>
  )
}


export default Search
