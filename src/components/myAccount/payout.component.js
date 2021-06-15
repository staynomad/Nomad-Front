import React, { useState } from 'react'
// import { useSelector, useDispatch } from "react-redux";
import './payout.css'
import handleReq from "../../utils/fetchRequest";

const Payout = () => {
   const [stripeConnected, setConnect] = useState(false);
//    const user = useSelector((state) => state.User);
//    const email = user.userInfo.email;
   let id = ""; 

   // Put users into the workflow to connect their stripe accounts. 
   const handleStripeClick = async () => {
      const body = {};
      const url = "/payouts/setup";
      const data = {};
 
      let res = await handleReq(
            url,
            "POST",
            body, 
            data
      )
      if(res.status === 200){
            setConnect(true);
            id = "hi" // res.data.id;
            // window.location.href = res.data.link;
      }
      else if(res.status === 500){
            return <h1>Something went wrong. Please try again later!</h1>
      }            
   };

   // Give users a link to their Express Dashboards
   const handleDashboardClick = async () => {
      const body = {};
      const url = "/payouts/express";
      const data = {
            userId: id,
      };
      let res = await handleReq(
            url,
            "POST",
            body, 
            data
      )
      if(res.status === 200){
            window.location.href = res.data.link;
      }
      else if(res.status === 500){
            return <h1>Something went wrong. Please try again later!</h1>
      }
   }

   return (
         <>
         {!stripeConnected ? 
         <div className="container">
         <div onClick={() => handleStripeClick()} className="stripe-connect" ><span>Connect with</span></div>
         </div> :
         <div> 
            <div> You're connected to stripe!  </div> 
            <div onClick={()=> handleDashboardClick()}>Click here to view your dashboard</div>
         </div>} {/* Click <a href={}>here</a> */}
         </>
   ) 
}

export default Payout; 