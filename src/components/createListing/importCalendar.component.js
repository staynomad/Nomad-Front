import React, { Component } from 'react'
import { app } from '../../utils/axiosConfig.js'
import axios from 'axios'

class ImportCalendar extends Component {
  componentDidMount() {
    /*fetch('https://www.airbnb.com/calendar/ical/46943704.ics?s=e2cf1d44f063299b1060fea2da160a8d', {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then(t => {
      console.log(t)
    })
    .catch( err => console.log(err))*/

    /*var icalfile = new XMLHttpRequest();
    if (icalfile) {
      icalfile.open("GET", "https://www.airbnb.com/calendar/ical/46943704.ics?s=e2cf1d44f063299b1060fea2da160a8d", true);
      icalfile.withCredentials = false
      icalfile.send(null);
      console.log(icalfile.getResponseHeader("*"))
    }*/

    // Using allorigins proxy to bypass airbnb access-control-allow-origin server response header
    axios.get("https://api.allorigins.win/raw?url=https://www.airbnb.com/calendar/ical/46943704.ics?s=e2cf1d44f063299b1060fea2da160a8d")
    .then((res) => {
      console.log(res.data) // raw text response from ical file
    })
  }

  render() {
    return (
      <div>this works</div>
    )
  }
}

export default ImportCalendar
