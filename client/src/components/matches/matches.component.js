import React, { useState } from "react";
import Filter from "./filter.component";
import "./matches.css";

function Matches() {

  const [seen, setSeen] = useState(false);

  return (
    <div>
      <div className="btn" onClick={() => setSeen(!seen)}>
        <button>filter</button>
      </div>
      {seen ? <Filter toggle={() => setSeen(!seen)} /> : null}
     </div>
  )
}

export default Matches;
