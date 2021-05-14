import React, { useState } from 'react'
import './payout.css'
import handleReq from "../../utils/fetchRequest";

const Payout = () => {
   const [stripeConnected, setConnect] = useState(false);

   const handleClick = async () => {
      const body = {

      };

      const url = "/payouts/setup";
      const data = {

      };

      // TODO: connect stripe properly in the BE, payout.js. 
      let res = await handleReq(
            url,
            "POST",
            body, 
            data
      )
      if(res.status === 200){
            window.location.href = res.data.link;
            setConnect(true);
      }
      else if(res.status === 500){
            return <h1>Something went wrong. Please try again later!</h1>
      }
 
      //             
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