const express = require("express");
const router = express.Router();

const Reservation = require("../models/reservation.model");
const { requireUserAuth } = require("../utils");


router.post(
    "/createReservation",
    async (req, res) => {
        try {
            const {email, listing, days} = req.body;
            const newReservation = await new Reservation({
                email,
                listing,
                active: true,
                days,
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

router.get(
    "/getByListing/:listing",
    async (req, res) => {
        try {
            const reservation = await Reservation.find({ listing: req.params.listing });
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

router.delete(
    "/delete/:listing",
    async (req, res) => {
        try {
            const reservation = await Reservation.deleteOne({ listing: req.params.listing });
            if (!reservation) {
                return res.status(404).json({
                  errors: ["Reservation does not exist"],
              });
            }
            res.status(201).json({
                "message": `Deleted ${req.params.listing}`
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

router.post(
    "/deactivate/:listing",
    async (req, res) => {
        try {
            const filter = { listing: req.params.listing }
            const update = { active: false }
            const reservation = await Reservation.findOneAndUpdate(filter, update, { new: true });
            if (!reservation) {
                return res.status(404).json({
                  errors: ["Reservation does not exist"],
              });
            }
            res.status(201).json({
                "message": `Deactivated ${req.params.listing}`
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
