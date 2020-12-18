import { app } from '../../utils/axiosConfig.js'
import axios from 'axios'
import { setLoadingTrue, setLoadingFalse } from "./loadingActions";
import ical from 'ical'

/* Types */
const SET_AVAILABLE = 'VHomes/dates/SET_AVAILABLE';
const SET_BOOKED = 'VHomes/dates/SET_BOOKED';

/* Actions */
const setAvailable = dates => ({ type: SET_AVAILABLE, dates });
const setBooked = dates => ({ type: SET_BOOKED, dates });

/* Fetch Calls */
// Called every time reservation calendar is displayed
export const calendarSync = (token, listingId) => async dispatch => {
    dispatch(setLoadingTrue())
    await app.get(`/listings/byId/${listingId}`)
      .then((res) => {
        if (res.data.calendarURL) {
          importCalendar(res.data.calendarURL)
        }
      })
      .catch(() => {
        alert('Unable to retrieve calendar. Please try again.') // change from alert to conditional render (see authActions for example)
      })
    dispatch(setLoadingFalse());
};

// Called when new URL used to import calendar availability
export const importCalendar = (calendarURL) => async dispatch => {
  // add some verification for URL here
  dispatch(setLoadingTrue())
  // temporary solution: using allorigins proxy to bypass airbnb access-control-allow-origin server response header
  // https://gist.github.com/jimmywarting/ac1be6ea0297c16c477e17f8fbe51347
  // https://www.airbnb.com/calendar/ical/47099387.ics?s=ebf2806742045a636872a57a62b9e90e
  await axios.get(`https://api.allorigins.win/raw?url=${calendarURL}`)
    .then((res) => {
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
        // TODO: parse reserved dates and blocked dates
      }
      console.log([earliestEnd.toISOString(), latestStart.toISOString()])
      dispatch(setAvailable([earliestEnd.toISOString(), latestStart.toISOString()]))
    })
  dispatch(setLoadingFalse());
}
