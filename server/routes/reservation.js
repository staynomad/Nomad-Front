const axios = require('axios')

const express = require("express");
const router = express.Router();

const Reservation = require("../models/reservation.model");
const Listing = require("../models/listing.model")
const { requireUserAuth } = require("../utils");
const nodemailer = require('nodemailer');

// Create a reservation
router.post(
    "/createReservation",
    async (req, res) => {
        try {
            const { user, listing, days } = req.body;
            const listingInfo = await Listing.findOne({
                _id: listing
            })
            // Parse string dates to new date objects
            const availableStart = new Date(listingInfo.available[0])
            const availableEnd = new Date(listingInfo.available[1])
            const reservationStart = new Date(days[0])
            const reservationEnd = new Date(days[1])
            const totalDays = (reservationEnd - reservationStart) / (1000 * 3600 * 24) + 1
            // Verify that the booked dates and available dates do not conflict with reservation
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
            // Create a new object in reservations collection and update 'booked' field in listing
            const newReservation = await new Reservation({
                user,
                listing,
                active: true,
                days
            })
            // .save();
            const bookedInfo = {
                start: days[0],
                end: days[1],
                reservationId: newReservation._id
            }
            // const bookedListing = await Listing.findOneAndUpdate({ _id: listing }, { $push: { booked: bookedInfo } })
            const bookedListing = await Listing.findOne({ _id: listing })

            // Create nodemailer transport to send reservation confirmation emails
            const transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: 'vhomesgroup@gmail.com',
                pass: 'yowguokryuzjmbhj'
              }
            })

            // Send confirmation email to guest
            axios.get(`http://localhost:8080/user/getUserInfo/${req.body.user}`)
            .then((res) => {
              const userMailOptions = {
                from: '"VHomes" <reservations@vhomesgroup.com>',
                to: res.data.email,
                subject: 'Your Reservation has been Confirmed',
                text:
                  `Thank you for booking with VHomes! Here's your reservation information:

                  ${bookedListing.description}
                  Address: ${bookedListing.location.street}, ${bookedListing.location.city}, ${bookedListing.location.state}, ${bookedListing.location.zipcode}
                  Total cost: $${bookedListing.price * totalDays}
                  Days: ${newReservation.days[0]} to ${newReservation.days[1]}
                  Host name:

                  If you have any questions or concerns, please reach out to the host at [add host email]. Hope you enjoy your stay!`
              }
              transporter.sendMail(userMailOptions, (error, info) => {
                if (error) {
                  console.log(error)
                }
                else {
                  console.log(`Email sent to guest`)
                }
              })
            })
            .catch((err) => {
              return res.status(500).json({
                  "errors": "Error sending confirmation email to guest."
              })
            })

            // Send confirmation email to host
            axios.get(`http://localhost:8080/user/getUserInfo/${bookedListing.userId}`)
            .then((res) => {
              const hostMailOptions = {
                from: '"VHomes" <reservations@vhomesgroup.com>',
                to: res.data.email,
                subject: 'Your listing has been booked',
                text:
                `Thank you for listing on VHomes! Here's the information regarding your listing reservation:

                ${bookedListing.description}
                Address: ${bookedListing.location.street}, ${bookedListing.location.city}, ${bookedListing.location.state}, ${bookedListing.location.zipcode}
                Total cost: $${bookedListing.price * totalDays}
                Days: ${newReservation.days[0]} to ${newReservation.days[1]}
                Guest name:

                If you have any questions or concerns, please reach out to the guest at [add guest email]. Thank you for choosing VHomes!`
              }
              transporter.sendMail(hostMailOptions, (error, info) => {
                if (error) {
                  console.log(error)
                }
                else {
                  console.log(`Email sent to host`)
                }
              })
            })
            .catch((err) => {
              return res.status(500).json({
                  "errors": "Error sending confirmation email to guest."
              })
            })

            res.status(200).json({
                "message": "Reservation created successfully"
            });
        }
        catch (error) {
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
    "/getByUser",
    requireUserAuth,
    async (req, res) => {
        try {
            const reservation = await Reservation.find({ user: req.user._id });
            if (!reservation) {
                return res.status(404).json({
                    errors: ["User has not made any reservations"],
                });
            }
            res.status(200).json({
                "reservations": reservation
            });
        }
        catch (error) {
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
        catch (error) {
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
        catch (error) {
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
        catch (error) {
            console.log(error);
            res.status(500).json({
                "errors":
                    ["Error creating reservation. Please try again!"]
            });
        }
    }
)

module.exports = router;
