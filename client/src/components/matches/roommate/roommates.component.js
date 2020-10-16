import React, { useState, useEffect } from "react";
import "./roommate.css";
import handleReq from "../../../utils/fetchRequest";
import {Modal, DialogContent} from '@material-ui/core/';
import RoommateModal from "./roommatemodal.component";

const Roommates = () => {
  const [roommates, setRoommates] = useState([]);
  const [open, setOpen] = useState(false);

  const handleOpenClose = () => {
    setOpen(!open);
  };

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
        console.log(data.body);
        if (data.body) {
          setRoommates(data.body);
        }
      });
  }, []);

  return (
    <div id='roommates-content'>
      {roommates.map((roommate) => (
        <div onClick={handleOpenClose}>
          <div className='roommate-information'>
            <div>Name: {roommate.name}</div>
            <div>Age: ##</div>
            <div>Location: Tempe, Arizona</div>
            <div>Hobbies: ----</div>
            <div>Personality: ----</div>
          </div>
          <Modal open={open} onClose={handleOpenClose}>
            <DialogContent className="material-ui-dialogmodal">
              <RoommateModal roommate={roommate}/>
            </DialogContent>
          </Modal>
        </div>
      ))}
    </div>
  );
};

export default Roommates;
