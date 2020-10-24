import React, {useState} from 'react';
import {Modal, DialogContent} from "@material-ui/core/";
import RoommateModal from './roommatemodal.component';

const RoommateCard = ({roommate}) => {
  const [open, setOpen] = useState(false);

  const handleOpenClose = () => {
    setOpen(!open);
  };

  return (
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
  )
}

export default RoommateCard;