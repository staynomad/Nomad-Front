import React, { useState } from 'react';

import ListingCard from "../matches/listing/listingCard.component";
import './marker.css';

const Marker = (props) => {
    let [displayCard, setDisplayCard] = useState(false);
    const { listing } = props;

    return (
        <>
            <div className={props.currentListing === listing._id ? "marker-active" : "marker"} onClick={() => {
                setDisplayCard(true);
                props.setCurrentListing(listing._id)
            }}>
                <span className="marker-text">
                    ${listing.price}
                </span>
            </div>
            {
                displayCard && props.currentListing === listing._id ? (
                    <ListingCard listing={listing} />
                ) : null
            }
        </>
    );
};

export default Marker;