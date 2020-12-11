import React, { Component } from 'react'
import { app } from '../../utils/axiosConfig.js'
var ical2json = require("ical2json");

class ImportCalendar extends Component {
  componentDidMount() {
    const url = 'https://www.airbnb.com/calendar/ical/46943704.ics?s=e2cf1d44f063299b1060fea2da160a8d'
    fetch(url)
      .then( r => r.text() )
      .then( t => console.log(t))
    var output = ical2json.convert('https://www.airbnb.com/calendar/ical/46943704.ics?s=e2cf1d44f063299b1060fea2da160a8d');
    console.log(output)
  }
  render() {
    return (
      <div>this works</div>
    )
  }
}

export default ImportCalendar
