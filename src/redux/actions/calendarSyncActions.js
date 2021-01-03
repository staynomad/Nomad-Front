import { app } from '../../utils/axiosConfig.js'
import axios from 'axios'
import ical from 'ical'

/* Types */
export const SET_AVAILABLE = 'VHomes/dates/SET_AVAILABLE';
export const SET_BOOKED = 'VHomes/dates/SET_BOOKED';
export const SET_CALENDAR_URL = 'VHomes/dates/SET_CALENDAR_URL'

/* Actions */
const setAvailable = dates => ({ type: SET_AVAILABLE, dates });
const setBooked = dates => ({ type: SET_BOOKED, dates });
const setCalendarURL = dates => ({ type: SET_CALENDAR_URL, dates })

/* Fetch Calls */
// Called every time reservation calendar is displayed
export const getCalendarURL = (listingId) => async dispatch => {
    await app.get(`/listings/byId/${listingId}`)
      .then( async (res) => {
        if (res.data.listing.calendarURL) {
          dispatch(setCalendarURL(res.data.listing.calendarURL))
        }
      })
      .catch(() => {
        alert('Unable to sync calendar.')
      })
};

// Called when new URL used to import calendar availability
export const importCalendar = (calendarURL, listingId) => async dispatch => {
  // add some verification for URL here
  // temporary solution: using allorigins proxy to bypass airbnb access-control-allow-origin server response header
  // https://gist.github.com/jimmywarting/ac1be6ea0297c16c477e17f8fbe51347
  // https://www.airbnb.com/calendar/ical/47099387.ics?s=ebf2806742045a636872a57a62b9e90e
  await axios.get(`https://api.allorigins.win/raw?url=${calendarURL}`)
    .then(async (res) => {
      const data = ical.parseICS(String(res.data))
      var availableStart = []
      var availableEnd = []
      // Get the start/end dates in ical file and add them to booked
      for (const section in data) {
        if (data[section].end && data[section].start) {
          availableStart.push(data[section].start)
          availableEnd.push(data[section].end)
        }
      }
      // Only parse ical data if dates were present in file
      if (availableStart.length > 0 && availableEnd.length > 0 && availableStart.length === availableEnd.length) {
        // Set availability to earliest end date and latest start date
        var earliestEnd = availableEnd[0]
        var latestStart = availableStart[0]
        for (let i = 1; i < availableStart.length; i++) {
          if (availableEnd[i].getTime() < earliestEnd.getTime()) {
            earliestEnd = availableEnd[i]
          }
          if (availableStart[i].getTime() > latestStart.getTime()) {
            latestStart = availableStart[i]
          }
        }
        // Set blocked days from ical file as "booked"
        var booked = []
        for (let i = 0; i < availableStart.length; i++) {
          if (availableEnd[i].getTime() === earliestEnd.getTime() || availableStart[i].getTime() === latestStart.getTime()) {
            continue
          }
          booked.push({
            start: availableStart[i].toISOString().substring(0, availableStart[i].toISOString().indexOf("T")),
            end: availableEnd[i].toISOString().substring(0, availableEnd[i].toISOString().indexOf("T")),
            reservationId: null
          })
        }
        if (!listingId) {
          dispatch(setAvailable([earliestEnd, latestStart]))
          dispatch(setBooked(booked))
        }
        else {
          const data = {
            available: [
              earliestEnd.toISOString().substring(0, earliestEnd.toISOString().indexOf("T")),
              latestStart.toISOString().substring(0, latestStart.toISOString().indexOf("T"))
            ],
            booked: booked
          }
          await app.put('/listings/syncListing/' + listingId, data)
            .catch(() => {
              alert("Unable to sync calendar.")
            })
        }
      }
      if (!listingId) {
        dispatch(setCalendarURL(calendarURL))
      }
    })
    .catch((err) => {
      alert("Unable to sync calendar. Please try again.")
    })
}
