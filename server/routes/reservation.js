const express = require("express");
const router = express.Router();

const Reservation = require("../models/reservation.model");
const Listing = require("../models/listing.model")
const { requireUserAuth } = require("../utils");

// Create a reservation
// TODO: send email to host and user to confirm
router.post(
    "/createReservation",
    async (req, res) => {
        try {
            const {user, listing, days} = req.body;
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
                user,
                listing,
                active: true,
                days,
            }).save();

            const bookedInfo = {
              start: days[0],
              end: days[1],
              reservationId: newReservation._id
            }

            const bookedListing = await Listing.findOneAndUpdate({ _id: listing }, { $push: { booked: bookedInfo } })

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

// Get all reservations by userId
router.get(
    "/getByUser/:userId",
    async (req, res) => {
        try {
            const reservation = await Reservation.find({ user: req.params.userId });
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

// Replace this with a soft delete so that users can revert if they accidentally delete
/* router.delete(
    "/delete/:reservationId",
    async (req, res) => {
        try {
            const reservation = await Reservation.findByIdandDelete(req.params.reservationId);
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
) */

// Use this when the user checks out of their stay
router.post(
    "/deactivate/:reservationId",
    async (req, res) => {
        try {
            const update = { active: false }
            const reservation = await Reservation.findByIdAndUpdate(req.params.reservationId, update);
            if (!reservation) {
                return res.status(404).json({
                  errors: ["Reservation does not exist"],
              });
            }
            res.status(201).json({
                "message": `Deactivated ${req.params.reservationId}`
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
    "/activate/:reservationId",
    async (req, res) => {
        try {
            const update = { active: true }
            const reservation = await Reservation.findByIdAndUpdate(req.params.reservationId, update);
            if (!reservation) {
                return res.status(404).json({
                  errors: ["Reservation does not exist"],
              });
            }
            res.status(201).json({
                "message": `Activated ${req.params.reservationId}`
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
