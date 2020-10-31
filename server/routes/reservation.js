const express = require("express");
const router = express.Router();

const Reservation = require("../models/reservation.model");
const { requireUserAuth } = require("../utils");


router.post(
    "/createReservation",
    async (req, res) => {
        try {
            const {email, listing} = req.body;
            const newReservation = await new Reservation({
                email,
                listing
            }).size();
            res.status(201).json({
              "message": "Reservation created successfully"
            });
        }
        catch(error) {
            console.log(error);
            res.status(500).json({
              "errors":
              ["Error creating reservation. Please try again!"]
            });
        }
    }
)
