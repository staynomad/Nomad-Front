import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./payout.css";
import handleReq from "../../utils/fetchRequest";

const Payout = () => {
  const user = useSelector((state) => state.User);
  const isConnect = user.userInfo.stripeId !== null;
  const [stripeConnected, setConnect] = useState(isConnect);
  const email = user.userInfo.email;

  // Put users into the workflow to connect their stripe accounts.
  const handleStripeClick = async () => {
    const body = {};
    const url = "/payouts/setup";
    const data = {
      email: email,
    };

    let res = await handleReq(url, "POST", body, data);
    if (res.status === 200) {
      setConnect(true);
      window.location.href = res.data.link;
    } else if (res.status === 500) {
      return <h1>Something went wrong. Please try again later!</h1>;
    }
  };

  // Give users a link to their Express Dashboards
  const handleDashboardClick = async () => {
    const url = "/payouts/express";
    const body = {};
    const data = {
      email: email,
    };
    let res = await handleReq(url, "POST", body, data);
    if (res.status === 200) {
      window.location.href = res.data.link;
    } else if (res.status === 500) {
      return <h1>Something went wrong. Please try again later!</h1>;
    }
  };

  return (
    <>
      {!stripeConnected ? (
        <div className="stripe-container">
          <div onClick={() => handleStripeClick()} className="stripe-connect">
            <span>Connect with</span>
          </div>
        </div>
      ) : (
        <div>
          <div> You're connected to stripe! </div>
          <div onClick={() => handleDashboardClick()} className="stripe-dash">
            <span>dashboard</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Payout;
