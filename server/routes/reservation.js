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
            }).save();
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

router.get(
    "/getByEmail/:email",
    async (req, res) => {
        try {
            const reservation = await Reservation.find({ email: req.params.email });
            if (!reservation) {
                return res.status(404).json({
                  errors: ["User has not made any reservations"],
                });
            }
            res.status(201).json({
                "reservations": reservation
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

module.exports = router;
