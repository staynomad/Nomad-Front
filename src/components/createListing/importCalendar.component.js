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

  handleSubmit(e) {
    e.preventDefault()
    // add url validation here
    this.props.importCalendar(this.state.calendarURL, true)
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
  };
  return stateToReturn;
};

const mapDispatchToProps = dispatch => {
  return {
    importCalendar: (calendarURL, newImport) => dispatch(importCalendar(calendarURL, newImport)),
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(
  ImportCalendar
));
