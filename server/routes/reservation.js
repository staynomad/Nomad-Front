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
  requireUserAuth,
  async (req, res) => {
    try {
      const { user, listing, days } = req.body;
      const listingInfo = await Listing.findOne({
        _id: listing
      })
      if (!listingInfo) {
        return res.status(400).json({
          "errors": "Listing does not exist. Please try again."
        })
      }
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
      }).save();
      const bookedInfo = {
        start: days[0],
        end: days[1],
        reservationId: newReservation._id
      }
      const bookedListing = await Listing.findOneAndUpdate({ _id: listing }, { $push: { booked: bookedInfo } })

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
            subject: `Your Reservation has been Confirmed: ${bookedListing.title}`,
            text:
              `Thank you for booking with VHomes! Here's your reservation information:

                  ${bookedListing.title}
                  Reservation number: ${newReservation._id}
                  Address: ${bookedListing.location.street}, ${bookedListing.location.city}, ${bookedListing.location.state}, ${bookedListing.location.zipcode}
                  Total cost: $${bookedListing.price * totalDays}
                  Days: ${newReservation.days[0]} to ${newReservation.days[1]}
                  Host name: ${res.data.name}

                  When you arrive at the property, make sure to checkin via the VHomes website in order to alert the host that you have arrived. If you have any questions or concerns, please reach out to the host at ${res.data.email}. Hope you enjoy your stay!`
          }
          transporter.sendMail(userMailOptions, (error, info) => {
            if (error) {
              console.log(error)
            }
            else {
              console.log(`Reservation confirmation email sent to guest ${res.data.email}`)
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
            subject: `Your listing has been booked: ${bookedListing.title}`,
            text:
              `Thank you for listing on VHomes! Here's the information regarding your listing reservation:

                ${bookedListing.title}
                Reservation number: ${newReservation._id}
                Address: ${bookedListing.location.street}, ${bookedListing.location.city}, ${bookedListing.location.state}, ${bookedListing.location.zipcode}
                Total cost: $${bookedListing.price * totalDays}
                Days: ${newReservation.days[0]} to ${newReservation.days[1]}
                Guest name: ${res.data.name}

                We'll send you another email once the guest has checked in. If you have any questions or concerns, please reach out to the guest at ${res.data.email}. Thank you for choosing VHomes!`
          }
          transporter.sendMail(hostMailOptions, (error, info) => {
            if (error) {
              console.log(error)
            }
            else {
              console.log(`Reservation confirmation email sent to host ${res.data.email}`)
            }
          })
        })
        .catch((err) => {
          return res.status(500).json({
            "errors": "Error sending confirmation email to host."
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
      res.status(200).json({
        "message": `Deactivated ${req.params.reservationId}`,
        reservation,
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

// This will be called when the user checks in
router.post(
  "/activate/:reservationId",
  requireUserAuth,
  async (req, res) => {
    try {
      const update = { active: true }
      const reservation = await Reservation.findByIdAndUpdate(req.params.reservationId, update);
      const bookedListing = await Listing.findById(reservation.listing)
      if (!reservation) {
        return res.status(404).json({
          errors: ["Reservation does not exist"],
        });
      }
      // Crete nodemailer transport to send emails from
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'vhomesgroup@gmail.com',
          pass: 'yowguokryuzjmbhj'
        }
      })
      // Send checkin confirmation email to guest
      axios.get(`http://localhost:8080/user/getUserInfo/${req.user._id}`)
        .then((res) => {
          const userMailOptions = {
            from: '"VHomes" <reservations@vhomesgroup.com>',
            to: res.data.email,
            subject: `Thanks for checking in to ${bookedListing.title}!`,
            text:
              `You have successfully checked in to your stay! The host has been notified and will let you in soon. If you have any questions or concerns, please reach out to the host at ${res.data.email}.

                  ${bookedListing.title}
                  Reservation number: ${reservation._id}
                  Address: ${bookedListing.location.street}, ${bookedListing.location.city}, ${bookedListing.location.state}, ${bookedListing.location.zipcode}
                  Days: ${reservation.days[0]} to ${reservation.days[1]}
                  Host name: ${res.data.name}

              Hope you enjoy your stay!`
          }
          transporter.sendMail(userMailOptions, (error, info) => {
            if (error) {
              console.log(error)
            }
            else {
              console.log(`Checkin confirmation email sent to guest ${res.data.email}`)
            }
          })
        })
        .catch((err) => {
          console.log(err)
        })

      // Send checkin confirmation email to host
      axios.get(`http://localhost:8080/user/getUserInfo/${bookedListing.userId}`)
        .then((res) => {
          const hostMailOptions = {
            from: '"VHomes" <reservations@vhomesgroup.com>',
            to: res.data.email,
            subject: `Your guest has checked in to ${bookedListing.title}!`,
            text:
              `Your guest has just checked in! Please provide them with the next steps to begin their stay. If you have any questions or concerns, please reach out to the guest at ${res.data.email}.

                ${bookedListing.title}
                Address: ${bookedListing.location.street}, ${bookedListing.location.city}, ${bookedListing.location.state}, ${bookedListing.location.zipcode}
                Days: ${reservation.days[0]} to ${reservation.days[1]}
                Guest name: ${res.data.name}

              Thank you for choosing VHomes!`
          }
          transporter.sendMail(hostMailOptions, (error, info) => {
            if (error) {
              console.log(error)
            }
            else {
              console.log(`Checkin confirmation email sent to host ${res.data.email}`)
            }
          })
        })
        .catch((err) => {
          console.log(err)
        })

      res.status(200).json({
        "message": `Activated ${req.params.reservationId}`,
        reservation,
      });
    }
    catch (error) {
      console.log(error);
      res.status(500).json({
        "errors":
          ["Error checking in. Please try again!"]
      });
    }
  }
)

module.exports = router;
