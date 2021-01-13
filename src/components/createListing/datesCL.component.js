import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import DatePicker, { DateUtils } from "react-day-picker";
import Helmet from "react-helmet";
import "react-day-picker/lib/style.css";
import "./createListing.css";
import {
  incompleteForm,
  completeForm,
} from "../../redux/actions/loadingActions";
import { newListing } from "../../redux/actions/createListingActions";
import { importCalendar } from "../../redux/actions/calendarSyncActions";

class DatesCL extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.handleImportToggle = this.handleImportToggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      displayImport: false,
      available: null,
      booked: null,
    });
  }

  getInitialState = () => {
    const oldData = this.props.listingData.dates;
    const initData = {
      date_range: {
        from: oldData.start_date,
        to: oldData.end_date,
      },
      invalid_date: false,
      today: oldData.today,
    };
    if (oldData.start_date && oldData.end_date) {
      console.log("enter");
      this.props.completeForm();
    } else {
      console.log("incomplete");
      this.props.incompleteForm();
    }
    return initData;
  };
  handleDayClick(day) {
    let range = {};
    if (DateUtils.isDayBefore(this.state.today, day)) {
      range = DateUtils.addDayToRange(day, this.state.date_range);
      this.setState({ invalid_date: false, date_range: range });
    } else {
      this.setState({ invalid_date: true });
    }
    this.props.completeForm();

    const cleaned_dates = {
      start_date: range.from,
      end_date: range.to,
    };
    this.props.newListing({ value: cleaned_dates, name: "dates" });
  }
  handleResetClick() {
    this.setState(this.getInitialState());
  }

  handleImportToggle() {
    this.setState({
      displayImport: !this.state.displayImport,
    });
    console.log(this.state.displayImport);
  }

  handleChange(e) {
    this.setState({
      calendarURL: e.target.value,
    });
  }

  async handleSubmit(e) {
    this.setState({
      importLoading: true,
    });
    e.preventDefault();
    if (this.state.calendarURL.indexOf(".ics") === -1) {
      alert("Invalid URL. Please try again.");
    } else {
      await this.props.importCalendar(this.state.calendarURL, null);
      const cleaned_dates = {
        start_date: this.props.available[0],
        end_date: this.props.available[1],
      };
      this.props.newListing({ value: cleaned_dates, name: "dates" });
      this.props.completeForm();
      this.setState({
        importDone: true,
      });
    }
    this.setState({
      importLoading: false,
    });
  }

  render() {
    const { from, to } = this.state.date_range;
    const modifiers = { start: from, end: to };
    return (
      <>
        <div className="questionText">Availability</div>
        {this.state.displayImport ? (
          <div>
            <form onSubmit={this.handleSubmit}>
              <input
                className="input login-input"
                style={{ paddingBottom: "0", marginBottom: "0" }}
                type="text"
                placeholder="Calendar URL"
                value={this.state.calendarURL}
                onChange={this.handleChange}
              />
              <br />
              {this.state.importLoading ? (
                <div id="spinner"></div>
              ) : (
                <input
                  className="btn green"
                  style={{ width: "auto" }}
                  type="submit"
                  value="import"
                />
              )}
              {this.state.importDone === true ? (
                <div style={{ color: "#00b183" }}>Import successful!</div>
              ) : null}
            </form>
            <br />
            <span className="import-info">
              <NavLink to="/how-to-import-or-export-calendar">&#9432;</NavLink>{" "}
              What's this?
            </span>
            <br />
            <p
              className="import-calendar"
              style={{
                textDecoration: "underline",
                cursor: "pointer",
                paddingLeft: "3%",
                paddingRight: "1%",
              }}
              onClick={this.handleImportToggle}
            >
              Select
            </p>
            <p className="import-calendar">dates instead</p>
            <br />
            <div className="spacer_m"></div>
          </div>
        ) : (
          <div>
            <div className="spacer_xs"></div>
            <div>
              {!from && !to && "Please select the first day."}
              {from && !to && "Please select the last day."}
              {from &&
                to &&
                `Selected from ${from.toLocaleDateString()} to
                  ${to.toLocaleDateString()}`}{" "}
              {from && to && (
                <button className="link" onClick={this.handleResetClick}>
                  Reset
                </button>
              )}
            </div>
            {this.state.invalid_date ? (
              <div style={{ color: "red" }}>
                First selection must be after today
              </div>
            ) : (
              ""
            )}
            <DatePicker
              className="Selectable"
              numberOfMonths={2}
              selectedDays={[from, { from, to }]}
              modifiers={modifiers}
              onDayClick={this.handleDayClick}
              inputProps={{ required: true }}
            />
            <Helmet>
              <style>{`
            .Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
              background-color: #f0f8ff !important;
              color: #4a90e2;
            }
            .Selectable .DayPicker-Day {
              border-radius: 0 !important;
            }
            .Selectable .DayPicker-Day--start {
              border-top-left-radius: 50% !important;
              border-bottom-left-radius: 50% !important;
            }
            .Selectable .DayPicker-Day--end {
              border-top-right-radius: 50% !important;
              border-bottom-right-radius: 50% !important;
            }
          `}</style>
            </Helmet>
            <br />
            <p
              className="import-calendar"
              style={{
                textDecoration: "underline",
                cursor: "pointer",
                paddingLeft: "3%",
                paddingRight: "1%",
              }}
              onClick={this.handleImportToggle}
            >
              Import
            </p>
            <p className="import-calendar">your calendar instead</p>
            <br />
            <div className="spacer_m"></div>
          </div>
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    listingData: state.CreateListing,
    available: state.Calendar.available,
    booked: state.Calendar.booked,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    newListing: (updatedData) => dispatch(newListing(updatedData)),
    completeForm: () => dispatch(completeForm()),
    incompleteForm: () => dispatch(incompleteForm()),
    importCalendar: (calendarURL, listingId) =>
      dispatch(importCalendar(calendarURL, listingId)),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DatesCL)
);
