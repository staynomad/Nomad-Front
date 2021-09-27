import React, { useState, useRef } from "react";
import gsap from "gsap";
import { withRouter } from "react-router-dom";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import "./categorizedListing.css";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import HorizontalListingCard from "../matches/listing/HorizontalListingCard.component";
import "./horizontalScrollMenu.css";

const HorizontalScrollMenu = (props) => {
  let scrl = useRef(null);
  const [scrollX, setscrollX] = useState(0);
  const [scrolEnd, setscrolEnd] = useState(false);

  //Slide click
  const slide = (shift) => {
    scrl.current.scrollLeft += shift;
    setscrollX(scrollX + shift);

    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };

  //Anim
  const anim = (e) => {
    gsap.from(e.target, { scale: 1 });
    gsap.to(e.target, { scale: 1.5 });
  };
  const anim2 = (e) => {
    gsap.from(e.target, { scale: 1.5 });
    gsap.to(e.target, { scale: 1 });
  };

  const scrollCheck = () => {
    setscrollX(scrl.current.scrollLeft);
    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };

  const LeftArrow = () => {
    const { scrollPrev } = React.useContext(VisibilityContext);
    return (
      <ArrowBackIcon
        className="scroll-menu-arrow left"
        onClick={() => slide(-50)}
      />
    );
  };

  const RightArrow = () => {
    const { scrollNext } = React.useContext(VisibilityContext);
    return (
      <ArrowForwardIcon
        className="scroll-menu-arrow right"
        onClick={() => slide(+50)}
      />
    );
  };

  return (
    <div
      className="featured-listings-container wow fadeInUp"
      data-wow-delay="0.5s"
    >
      <div className="featured-listings-header">
        <h1>{props.title}</h1>
        <div className="featured-listings-line"></div>
      </div>
      {scrollX !== 0 && (
        <button className="prev" onClick={() => slide(-50)}>
          <i className="fa fa-angle-left"></i>
        </button>
      )}
      <ul ref={scrl} onScroll={scrollCheck} className="horizontalscrollmenu">
        {props.data !== undefined && (
          <>
            {props.data.map((listing) => (
              <HorizontalListingCard listing={listing} key={listing._id} />
            ))}
          </>
        )}
      </ul>
      {!scrolEnd && (
        <button className="next" onClick={() => slide(+50)}>
          <i className="fa fa-angle-right"></i>
        </button>
      )}
    </div>
  );
};

export default withRouter(HorizontalScrollMenu);
