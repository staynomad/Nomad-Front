import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import DatePicker, { DateUtils } from "react-day-picker";
import Helmet from "react-helmet";
import "react-day-picker/lib/style.css";
import "./createListing.css";

class DatesCL extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
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

  render() {
    const { from, to } = this.state.date_range;
    const modifiers = { start: from, end: to };
    return (
      <div>
        <div className="startText">Availibility</div> <br />
        <h1 className="questionText">When do you want to list it?</h1>
        <p>
          {this.state.invalid_date ? (
            <h3 style={{ color: "red" }}>
              First selection must be after today
            </h3>
          ) : (
            ""
          )}
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
        </p>
        <DatePicker
          className="Selectable"
          numberOfMonths={2}
          selectedDays={[from, { from, to }]}
          modifiers={modifiers}
          onDayClick={this.handleDayClick}
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
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    listingData: state,
  };
};
export default withRouter(connect(mapStateToProps, null)(DatesCL));

/*
 http://react-day-picker.js.org/examples/selected-range
  <div style={{ display: "inline-block" }}>
          <h3>Start Date</h3>
          <DatePicker
            onDayClick={this.handleDayClick}
            selectedDays={this.state.start_date}
          />
        </div>
        <div style={{ display: "inline-block" }}>
          <h3>End Date</h3>
          <DatePicker
            onDayClick={this.handleDayClick}
            selectedDays={this.state.end_date}
          />
        </div>
  
*/
