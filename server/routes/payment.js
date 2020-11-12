const express = require('express');
const router = express.Router();
const Listing = require('../models/listing.model');

const port = process.env.PORT
const YOUR_DOMAIN = 'http://localhost:' + port;

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY

const stripe = require('stripe')(stripeSecretKey);


router.post('/create-session', async (req, res) => {
    try{
      const { listingId, days } = req.body

      console.log(listingId);
      console.log(days);

      const listingDetails = await Listing.findOne({
        '_id': listingId
      })
      .catch((err) => {
        return res.status(404).json({
          'error': 'Listing not Found'
        });

      })

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: listingDetails.description + '\n' + listingDetails.location.city,
                images: ['https://i.imgur.com/EHyR2nP.png'],
              },
              unit_amount: listingDetails.price * days * 100,
            },
            quantity: 1,
          },
        ],

        mode: 'payment',
        success_url: `${YOUR_DOMAIN}/success.html`,
        cancel_url: `${YOUR_DOMAIN}/canceled.html`,
      });
      console.log("checkout session creation")
      res.status(200).json({
        id: session.id ,
        'output': listingDetails.price * days * 100
      });
    }
    catch(error){
      console.error(error);
      res.status(500).json({
        'error': 'invalid'
      });

    }
});

module.exports = router;
