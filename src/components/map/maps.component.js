import React, { Component } from 'react';
import { connect } from "react-redux";
import GoogleMapReact from 'google-map-react';

import Marker from './marker.component';
import { getListingInRadius } from '../../redux/actions/searchListingActions';

class ListingMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            center: {
                lat: null,
                lng: null,
            },
            defaultCenter: {
                lat: null,
                lng: null,
            },
            currentListing: null,
            radius: 25,
            zoom: 10
        }

        this.findLocationFail = this.findLocationFail.bind(this);
        this.findLocationSuccess = this.findLocationSuccess.bind(this);
        this.setCurrentListing = this.setCurrentListing.bind(this);
        this.onMapChange = this.onMapChange.bind(this);
    }

    componentDidMount() {
        // Get browser lat and lng for current user
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
        } else {
            navigator.geolocation.getCurrentPosition(this.findLocationSuccess, this.findLocationFail);
        }
    }

    findLocationFail() {
        alert('Unable to retrieve your location');
    }

    findLocationSuccess(position) {
        const { latitude, longitude } = position.coords;
        this.setState({
            defaultCenter: {
                lat: latitude,
                lng: longitude,
            },
            center: {
                lat: latitude,
                lng: longitude,
            },
        });

        this.props.getListingInRadius(latitude, longitude, this.state.radius, false);
    };

    onMapChange(e) {
        console.log(e);
        const { lat, lng } = e.center;
        if (this.state.center.lat !== e.center.lat || this.state.center.lng !== e.center.lng) {
            this.setState({
                center: {
                    lat: lat,
                    lng: lng,
                },
                radius: (40000 / (2 ^ e.zoom)) * 2
            }, () => this.props.getListingInRadius(lat, lng, this.state.radius))
        }
    }

    setCurrentListing(listingId) {
        this.setState({ currentListing: listingId })
    }

    render() {
        return (
            <div style={{ height: "100%", width: "100%" }}
                onClick={(e) => {
                    if (
                        e.target.className !== "marker-text" &&
                        e.target.className !== "marker" &&
                        e.target.className !== "marker-active"
                    ) {
                        this.setCurrentListing(null)
                    };

                }}
            >
                { this.state.center.lat && this.state.center.lng ? (
                    <GoogleMapReact
                        defaultCenter={this.state.defaultCenter}
                        defaultZoom={this.state.zoom}
                        center={this.state.center}
                        onChange={this.onMapChange}
                    >
                        {this.props.mapListings && this.props.mapListings.length > 0 ? (
                            this.props.mapListings.map((listing, idx) => {
                                return (
                                    <Marker
                                        lat={listing.coords.listingLat['$numberDecimal']}
                                        lng={listing.coords.listingLng['$numberDecimal']}
                                        key={`Map_Listing_${idx}`}
                                        listing={listing}
                                        currentListing={this.state.currentListing}
                                        setCurrentListing={this.setCurrentListing}
                                    />
                                );
                            })
                        ) : null}
                    </GoogleMapReact>
                ) : null}
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    const stateToReturn = { ...state, loading: state.Loading.loading };
    if (state.Login.userInfo) stateToReturn["userSession"] = state.Login.userInfo.session;
    if (state.Listing.mapListings) stateToReturn["mapListings"] = state.Listing.mapListings;
    return stateToReturn;
};

const mapDispatchToProps = (dispatch) => {
    return {
        getListingInRadius: (...args) => dispatch(getListingInRadius(...args)),
    };
};

export default (connect(mapStateToProps, mapDispatchToProps)(ListingMap));
