import React, { useState } from "react";
import "./reviewpopup.css";

import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import { app } from "../../utils/axiosConfig";

const ReviewPopup = (props) => {
  const [rating, setRating] = useState(0);
  const [reviewMessage, setReviewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) return setError(true);
    setError(false);
    setIsLoading(true);
    app
      .post(
        `/reviews/${props.listingId}`,
        {
          rating,
          review: reviewMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${props.userSession.token}`,
          },
        }
      )
      .then((res) => {
        setIsLoading(false);
        setSuccess(true);
      })
      .catch((res) => {
        console.log(res);
      });
  };

  return (
    <div className="review-popup-container">
      <div className="review-popup-container-header">
        <h1>Leave a review</h1>
      </div>
      {!isLoading ? (
        <div>
          {!success ? (
            <>
              <div className="review-popup-stars-container">
                {rating >= 1 ? (
                  <StarIcon
                    onClick={() => setRating(1)}
                    className="review-popup-star"
                  />
                ) : (
                  <StarBorderIcon
                    onClick={() => setRating(1)}
                    className="review-popup-star"
                  />
                )}
                {rating >= 2 ? (
                  <StarIcon
                    onClick={() => setRating(2)}
                    className="review-popup-star"
                  />
                ) : (
                  <StarBorderIcon
                    onClick={() => setRating(2)}
                    className="review-popup-star"
                  />
                )}
                {rating >= 3 ? (
                  <StarIcon
                    onClick={() => setRating(3)}
                    className="review-popup-star"
                  />
                ) : (
                  <StarBorderIcon
                    onClick={() => setRating(3)}
                    className="review-popup-star"
                  />
                )}
                {rating >= 4 ? (
                  <StarIcon
                    onClick={() => setRating(4)}
                    className="review-popup-star"
                  />
                ) : (
                  <StarBorderIcon
                    onClick={() => setRating(4)}
                    className="review-popup-star"
                  />
                )}
                {rating >= 5 ? (
                  <StarIcon
                    onClick={() => setRating(5)}
                    className="review-popup-star"
                  />
                ) : (
                  <StarBorderIcon
                    onClick={() => setRating(5)}
                    className="review-popup-star"
                  />
                )}
              </div>
              <div className="review-popup-input-container">
                <textarea
                  value={reviewMessage}
                  onChange={(e) => setReviewMessage(e.target.value)}
                  placeholder="Your experience (optional)"
                />
              </div>
              <div className="review-popup-confirm-container">
                {error && <p>Please give this listing a rating</p>}
                <button onClick={handleSubmit}>Post Review</button>
              </div>
            </>
          ) : (
            <div className="post-review-success-container">
              <h2>Success</h2>
              <h3>Thank you for your feedback!</h3>
            </div>
          )}
        </div>
      ) : (
        <div className="loader"></div>
      )}
    </div>
  );
};

export default ReviewPopup;
