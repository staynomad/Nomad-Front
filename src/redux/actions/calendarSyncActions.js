import { app } from '../../utils/axiosConfig.js'
import axios from 'axios'
import { setLoadingTrue, setLoadingFalse } from "./loadingActions";

// Called every time reservation calendar is displayed
export const calendarSync = (token, listingId) => async dispatch => {
    dispatch(setLoadingTrue())
    await app.get(`/listings/byId/${listingId}`)
      .then((res) => {
        if (res.data.calendarURL) {
          importCalendar(res.data.calendarURL, false)
        }
      })
      .catch(() => {
        alert('Unable to retrieve calendar. Please try again.') // change from alert to conditional render (see authActions for example)
      })
    dispatch(setLoadingFalse());
};

// Called when new URL used to import calendar availability
export const importCalendar = (calendarURL, newImport) => async dispatch => {
  // add some verification for URL here
  dispatch(setLoadingTrue())
  // temporary solution: using allorigins proxy to bypass airbnb access-control-allow-origin server response header
  // https://gist.github.com/jimmywarting/ac1be6ea0297c16c477e17f8fbe51347
  // https://www.airbnb.com/calendar/ical/46943704.ics?s=e2cf1d44f063299b1060fea2da160a8d
  await axios.get(`https://api.allorigins.win/raw?url=${calendarURL}`)
    .then((res) => {
      if (newImport) {
        // get start and end availability
        return {
          available: ['2021-01-01', '2021-01-31']
        }
      }
      else {
        // get reserved dates
        return {
          // array of objects
          booked: [
            {
              start: '2021-01-01',
              end: '2021-01-01',
              reservationId: null
            }
          ]
        }
      }
    })
  dispatch(setLoadingFalse());
}
