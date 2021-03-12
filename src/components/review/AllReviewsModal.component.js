import React, { useState } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";

import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";

const AllReviewsModal = ({ reviews, closeModal, openPostReview }) => {
  const getStars = () => {
    let ratings = [];
    for (let props in reviews) {
      ratings.push(reviews[props].stars);
    }
    const max = ratings
      .sort(
        (a, b) =>
          ratings.filter((v) => v === a).length -
          ratings.filter((v) => v === b).length
      )
      .pop();

    let stars = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= max) {
        stars.push(
          <StarIcon key={i} className="all-reviews-popup-star" alt={i} />
        );
      } else {
        stars.push(
          <StarBorderIcon key={i} className="all-reviews-popup-star" alt={i} />
        );
      }
    }
    return stars;
  };

  return (
    <div className="all-reviews-popup-container">
      <div className="review-popup-container-header">
        <KeyboardBackspaceIcon onClick={closeModal} />
        <h1>Reviews</h1>
      </div>
      <div className="all-reviews-top-container">
        <div className="all-reviews-write-container">
          <div className="rating-container">{getStars()}</div>
          <h2>({reviews.length} Reviews)</h2>
          <button
            onClick={() => {
              closeModal();
              openPostReview();
            }}
          >
            Write a review
          </button>
        </div>
      </div>
      {/* <LinearProgress variant="determinate" value={50} /> */}
    </div>
  );
};

export default AllReviewsModal;
