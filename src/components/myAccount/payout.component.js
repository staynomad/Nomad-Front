import React from 'react'
import './payout.css'
import { app } from "../../utils/axiosConfig.js";

const Payout = () => {

   const stripeConnected = app.get()

   return (
       <>
          <br/>
          <br/>
           <a href="#" class="stripe-connect"><span>Connect with</span></a>
        </>
   ) 
}

export default Payout; 