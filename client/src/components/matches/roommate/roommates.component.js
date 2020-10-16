import React, { useState, useEffect } from "react";
import "./roommate.css";
import handleReq from "../../../utils/fetchRequest";

const Roommates = () => {
  const [roommates, setRoommates] = useState([]);

  useEffect(() => {
    const headers = { Connection: "keep-alive" };
    handleReq("/roommates", "GET", headers)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.errors) {
          alert(data.errors[0]);
        }

        if (data.body) {
          setRoommates(data.body);
        }
      });
  }, []);

  return (
    <div id='roommates-content'>
      {roommates.map((roommate) => (
        <div className='roommate-information'>
          <div>Name: {roommate.name}</div>
          <div>Age: ##</div>
          <div>Location: Tempe, Arizona</div>
          <div>Hobbies: ----</div>
          <div>Personality: ----</div>
        </div>
      ))}
    </div>
  );
};

export default Roommates;
