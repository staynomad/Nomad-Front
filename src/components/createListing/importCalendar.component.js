import React, { Component } from 'react'
import { app } from '../../utils/axiosConfig.js'
import axios from 'axios'

class ImportCalendar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      calendarURL: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    // temporary solution: using allorigins proxy to bypass airbnb access-control-allow-origin server response header
    // https://gist.github.com/jimmywarting/ac1be6ea0297c16c477e17f8fbe51347
    axios.get("https://api.allorigins.win/raw?url=https://www.airbnb.com/calendar/ical/46943704.ics?s=e2cf1d44f063299b1060fea2da160a8d")
    .then((res) => {
      console.log(res.data) // raw text response from ical file
    })
  }

  handleChange(e) {
    this.setState({
      calendarURL: e.target.value
    })
  }

  handleSubmit() {
    console.log("handle submit here")
    // axios request to url via proxy, get calendar data, update redux to and from fields
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Calendar URL"
            value={this.state.calendarURL}
            onChange={this.handleChange}
          />
          <input
            type="submit"
            value="import"
          />
        </form>
      </div>
    )
  }
}

export default ImportCalendar
