import React, { useState, useEffect } from "react";
import "./roommate.css";
import handleReq from "../../../utils/fetchRequest";
import RoommateCard from './roommateCard.component'

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
          return alert(data.errors[0]);
        }
        if (data.body) {
          setRoommates(data.body);
        }
      });
  }, []);

  return (
    <div id='roommates-content'>
      {roommates.map((roommate) => (
        <RoommateCard roommate={roommate}/>
      ))}
    </div>
  );
};

export default Roommates;
