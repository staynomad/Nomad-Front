import React, { useState, useEffect } from "react";
import handleReq from "../../utils/fetchRequest";

const Roommates = () => {
  const [roommates, setRoommates] = useState([]);

  useEffect(() => {
    const headers = { Connection: "keep-alive" };
    handleReq("/roommates", "GET", headers)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setRoommates(data.body);
      });
  }, []);

  return (
    <div>
      {roommates.map((roommate) => (
        <div>
          <div>Roommate: {roommate.name}</div>
        </div>
      ))}
    </div>
  );
};

export default Roommates;
