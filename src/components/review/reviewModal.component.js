import React from 'react';
import { withRouter } from 'react-router-dom';
import { CustomButton } from "../matches/listing/listingCard.component";

const ReviewPopup = (props) => {
    const handleCloseModal = () => {
        return props.setReviewModal(false);
    }


    const handleRedirect = async () => {
        // Redirect to review component
        return;
    };

    return (
        <div id="review-container">
            <p>Would you like to leave a review?</p>
            <CustomButton onClick={handleRedirect}>Yes</CustomButton>
            <CustomButton onClick={handleCloseModal}>No thanks</CustomButton>
        </div>
    );
};

export default withRouter(ReviewPopup);
