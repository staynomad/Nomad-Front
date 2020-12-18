import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { importCalendar } from "../../redux/actions/calendarSyncActions";

class ImportCalendar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      calendarURL: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({
      calendarURL: e.target.value
    })
  }

  async handleSubmit(e) {
    e.preventDefault()
    if (this.state.calendarURL.indexOf(".ics") === -1) {
      alert("Invalid URL. Please try again.")
    }
    else {
      await this.props.importCalendar(this.state.calendarURL, true)
      this.setState({
        available: this.props.available,
        booked: this.props.booked
      })
    }
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

const mapStateToProps = state => {
    const stateToReturn = {
        ...state,
        loading: state.Loading.loading,
        available: state.Calendar.available,
        booked: state.Calendar.booked
    };
    return stateToReturn;
};

const mapDispatchToProps = dispatch => {
    return {
        importCalendar: (calendarURL) => dispatch(importCalendar(calendarURL)),
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(
    ImportCalendar
));
