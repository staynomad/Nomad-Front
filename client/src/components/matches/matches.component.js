import React, { useState } from "react";
import Filter from "./filter.component";
import "./matches.css";

const Matches = () => {
  const [seen, setSeen] = useState(false);

  const toggle = () => {
    setSeen(!seen);
  };

  return (
    <div id='matches-page'>
      <button className='filter btn green' onClick={toggle}>
        filter
      </button>
      {seen ? <Filter toggle={toggle} /> : null}
    </div>
  );
};

export default Matches;
