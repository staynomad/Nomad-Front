import React, { Component } from "react";
import DatePicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import "./createListing.css";
export default class DatesCL extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start_date: null,
      end_date: null,
      dates: [null, null]
    };
    this.handleDayClick = this.handleDayClick.bind(this)
  }
  
  handleDayClick(day, {selected}) {
    //work is needed here to make sure the dates selected are valid
    if (this.state.start_date == null) {
      let temp = this.state.dates
      temp[0] = day
      this.setState({
        start_date: selected ? undefined : day,
        dates: temp
      })
    }

    else if (this.state.end_date == null) {
      let temp = this.state.dates
      temp[1] = day
      this.setState({
        end_date: selected ? undefined : day,
        dates: temp
      })
    }
    this.props.handle(this.state, "dates");
  }
  render() {
    return (
      <div>
        <div>
          <div className="startText">Availibility</div> <br/>
          <div className="questionText">When do you want to list it?</div>
          <div>
            <div>
            <DatePicker onDayClick={this.handleDayClick} selectedDays={this.state.dates}/>
            </div>
            
          </div>
        </div>
      </div>
    );
  }
}
