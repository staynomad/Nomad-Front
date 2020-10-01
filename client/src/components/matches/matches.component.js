import React, { useState } from "react";
import Filter from "./filter.component";
import "./matches.css";

const Matches = () => {

  const [seen, setSeen] = useState(false);

  const toggle = () => {setSeen(!seen)};

  return (
    <div>
      <div className="btn" onClick={toggle}>
        <button>filter</button>
      </div>
      {seen ? <Filter toggle={toggle} /> : null}
     </div>
  )
}

export default Matches;
