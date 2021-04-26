import React from 'react'
import './payout.css'
import { app } from "../../utils/axiosConfig.js";
import handleReq from "../../utils/fetchRequest";

const Payout = () => {

   const stripeConnected = false;

   const handleClick = () => {
      const body = {

      };

      const url = "/payouts/payout";
      const data = {

      };

      // TODO: connect stripe properly in the BE, payout.js. 
      let link = handleReq(
            url,
            "POST",
            body, 
            data
      ); 
 
      window.location.href = link;      

      console.log(link);

      console.log("here");

      
   };

   return (
         <>
         {!stripeConnected ? 
         <div className="container">
         <div onClick={() => handleClick()} className="stripe-connect" ><span>Connect with</span></div>
         </div> :
         null}
         </>
   ) 
}

export default Payout; 