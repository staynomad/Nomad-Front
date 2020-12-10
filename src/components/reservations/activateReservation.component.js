import React, { Component } from "react";
import { connect } from "react-redux"
import { withRouter } from "react-router-dom";

import { app } from '../../utils/axiosConfig.js'

class ActivateReservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        };
    }

    async componentDidMount() {
        const { listingId, reservationId } = this.props.match.params;
        try {
            const activateReservationRes = await app({
                url: '/reservation/activateReservation',
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.props.userSession.token}`,
                },
                data: JSON.stringify({ listingId, reservationId })
            });

            if (activateReservationRes.status === 200) {
                return this.props.history.push("/PaymentSuccess");
            }
        } catch (e) {
            console.error(e.response.data);
            this.setState({
                isLoading: false,
            });
            alert(e.response.data);
        }

    };

    render() {
        return (
            <>
                {
                    this.state.isLoading ?
                        (
                            <div id="spinner" />
                        ) : (
                            <div>An error occurred while activating reservation.  Please contact us immediately.</div>
                        )
                }
            </>
        );
    }
}

const mapStateToProps = state => {
    const stateToReturn = { ...state };
    if (state.Login.userInfo) stateToReturn['userSession'] = state.Login.userInfo.session;
    return stateToReturn;
};

export default withRouter(connect(
    mapStateToProps,
)(
    ActivateReservation
));
