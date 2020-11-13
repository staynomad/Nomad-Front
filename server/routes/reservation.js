const express = require("express");
const router = express.Router();

const Reservation = require("../models/reservation.model");
const Listing = require("../models/listing.model")
const { requireUserAuth } = require("../utils");

// Create a reservation
router.post(
    "/createReservation",
    async (req, res) => {
        try {
            const {email, listing, days} = req.body;
            const listingInfo = await Listing.findOne({
                _id: listing
            })

            const availableStart = new Date(listingInfo.available[0])
            const availableEnd = new Date(listingInfo.available[1])
            const reservationStart = new Date(days[0])
            const reservationEnd = new Date(days[1])

            if (reservationStart.getTime() < availableStart.getTime() || reservationEnd.getTime() > availableEnd.getTime()) {
                return res.status(400).json({
                    "errors": "Selected days are invalid. Please try again."
                })
            }

            for (let i = 0; i < listingInfo.booked.length; i++) {
              const bookedStart = new Date(listingInfo.booked[i].start)
              const bookedEnd = new Date(listingInfo.booked[i].end)
              if ((reservationStart.getTime() >= bookedStart.getTime() && reservationStart.getTime() <= bookedEnd.getTime()) || (reservationEnd.getTime() >= bookedStart.getTime() && reservationEnd.getTime() <= bookedEnd.getTime())) {
                  return res.status(400).json({
                      "errors": "Selected days are invalid. Please try again."
                  })
              }
            }

            const newReservation = await new Reservation({
                email,
                listing,
                active: true,
                days,
            }).save();

            const bookedDays = {
              start: days[0],
              end: days[1]
            }

            const bookedListing = await Listing.findOneAndUpdate({ _id: listing }, { $push: { booked: bookedDays } })

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

// Change this (and reservation model) to get by id
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

// Get reservations corresponding to listingId
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

// Delete a specific reservation by reservationId
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

// Change this to deactivate by reservationId
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

router.post(
    "/activate/:listing",
    async (req, res) => {
        try {
            const filter = { listing: req.params.listing }
            const update = { active: true }
            const reservation = await Reservation.findOneAndUpdate(filter, update, { new: true });
            if (!reservation) {
                return res.status(404).json({
                  errors: ["Reservation does not exist"],
              });
            }
            res.status(201).json({
                "message": `Activated ${req.params.listing}`
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
