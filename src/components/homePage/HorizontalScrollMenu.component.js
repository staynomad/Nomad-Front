import React from "react";
import { withRouter } from "react-router-dom";
import ScrollMenu from "react-horizontal-scrolling-menu";
import "./categorizedListing.css";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import HorizontalListingCard from "../matches/listing/HorizontalListingCard.component";

const HorizontalScrollMenu = (props) => {
  return (
    <div
      className="featured-listings-container wow fadeInUp"
      data-wow-delay="0.5s"
    >
      <div className="featured-listings-header">
        <h1>{props.title}</h1>
        <div className="featured-listings-line"></div>
      </div>
      {props.data !== undefined && (
        <ScrollMenu
          data={props.data.map((listing) => (
            <HorizontalListingCard listing={listing} key={listing._id} />
          ))}
          wheel={false}
          arrowLeft={<ArrowBackIcon className="scroll-menu-arrow left" />}
          arrowRight={<ArrowForwardIcon className="scroll-menu-arrow right" />}
          translate={2}
        />
      )}
    </div>
  );
};

export default withRouter(HorizontalScrollMenu);
