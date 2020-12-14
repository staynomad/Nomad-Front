import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import DatePicker, { DateUtils } from "react-day-picker";
import Helmet from "react-helmet";
import "react-day-picker/lib/style.css";
import "./createListing.css";
import {
  incompleteForm,
  completeForm,
} from "../../redux/actions/loadingActions";
import ImportCalendar from './importCalendar.component.js'

class DatesCL extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.handleImportToggle = this.handleImportToggle.bind(this);
  }

  componentDidMount() {
    this.setState({
      displayImport: false
    })
  }

  getInitialState = () => {
    const oldData = this.props.listingData.CreateListing.state.dates;
    const initData = {
      date_range: {
        from: oldData.start_date,
        to: oldData.end_date,
      },
      invalid_date: false,
      today: oldData.today,
    };
    if (oldData.start_date && oldData.end_date) {
      this.props.completeForm();
    } else {
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
      booked: [null, null],
    };
    this.props.handle(cleaned_dates, "dates");
  }
  handleResetClick() {
    this.setState(this.getInitialState());
  }

  handleImportToggle() {
    this.setState({
      displayImport: !this.state.displayImport
    })
    console.log(this.state.displayImport)
  }

  render() {
    const { from, to } = this.state.date_range;
    const modifiers = { start: from, end: to };
    return (
      <>
      {
        this.state.displayImport ?

        <div>
          <ImportCalendar />
          <br />
          <p className="import-calendar" style={{textDecoration: "underline", cursor: "pointer", paddingLeft: "3%", paddingRight: "1%"}} onClick={this.handleImportToggle}>Select</p>
          <p className="import-calendar">dates instead</p>
          <br />
        </div> :

        <div>
          <h1>Availability</h1>
          <div className="questionText">
            When is your property available?
          </div>
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
            <h3 style={{ color: "red" }}>First selection must be after today</h3>
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
          <p className="import-calendar" style={{textDecoration: "underline", cursor: "pointer", paddingLeft: "3%", paddingRight: "1%"}} onClick={this.handleImportToggle}>Import</p>
          <p className="import-calendar">your calendar instead</p>
          <br />
        </div>
      }
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    listingData: state,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    completeForm: () => dispatch(completeForm()),
    incompleteForm: () => dispatch(incompleteForm()),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DatesCL)
);