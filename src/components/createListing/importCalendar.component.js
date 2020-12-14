import React, { Component } from 'react'
import { app } from '../../utils/axiosConfig.js'
import axios from 'axios'

class ImportCalendar extends Component {
  componentDidMount() {
    // temporary solution: using allorigins proxy to bypass airbnb access-control-allow-origin server response header
    // https://gist.github.com/jimmywarting/ac1be6ea0297c16c477e17f8fbe51347
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
