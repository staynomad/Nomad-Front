import React from "react";
import ScrollMenu from "react-horizontal-scrolling-menu";
import "./horizontalscrollmenu.css";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

import HorizontalListingCard from "./HorizontalListingCard.component";

const HorizontalScrollMenu = ({ data }) => {
  return (
    <div className="horizontal-menu-container">
      <ScrollMenu
        data={data.map((listing) => (
          <HorizontalListingCard listing={listing} key={listing._id} />
        ))}
        wheel={false}
        arrowLeft={<ArrowBackIcon className="scroll-menu-arrow left" />}
        arrowRight={<ArrowForwardIcon className="scroll-menu-arrow right" />}
        translate={2}
      />
    </div>
  );
};

export default HorizontalScrollMenu;
