import React from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import "./horizontalscrollmenu.css";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

import HorizontalListingCard from "./HorizontalListingCard.component";

const ProfileHorizontalScrollMenu = (props) => {
  return (
    <div className="horizontal-menu-container">
      {props.data !== undefined && (
        <ScrollMenu
          wheel={false}
          arrowLeft={
            <ArrowBackIcon className="scroll-menu-arrow left profile" />
          }
          arrowRight={
            <ArrowForwardIcon className="scroll-menu-arrow right profile" />
          }
          translate={2}
        >
          {props.data.map((listing) => (
            <HorizontalListingCard listing={listing} key={listing._id} />
          ))}
        </ScrollMenu>
      )}
    </div>
  );
};

export default ProfileHorizontalScrollMenu;
