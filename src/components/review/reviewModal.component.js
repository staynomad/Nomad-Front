import React from 'react';
import { withRouter } from 'react-router-dom';
import { CustomButton } from "../matches/listing/listingCard.component";

const ReviewPopup = (props) => {
    const handleCloseModal = () => {
        return props.setReviewModal(false);
    }

    // Redirect to review component
    const handleRedirect = async () => {
        props.setReviewModal(false);
        return props.history.push(`/listing/${props.reviewListingId}/review`);
    };

    return (
        <div className="container" id="review-container">
            <p>Would you like to leave a review?</p>
            <CustomButton onClick={handleRedirect}>Yes</CustomButton>
            <CustomButton onClick={handleCloseModal}>No thanks</CustomButton>
        </div>
    );
};

export default withRouter(ReviewPopup);
