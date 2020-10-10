import React, { Component } from "react";
import Calendar from "react-calendar";
import "./createListing.css";
export default class DatesCL extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start_date: new Date(),
      end_date: new Date(),
    };
    this.onChangeEnd = this.onChangeEnd.bind(this);
    this.onChangeStart = this.onChangeStart.bind(this);
  }
  onChangeStart(e) {
    this.setState({
      start_date: e,
    });
    console.log("start" + this.state.start_date);
  }
  onChangeEnd(e) {
    this.setState({
      end_date: e,
    });
    console.log("end" + this.state.end_date);
  }

  render() {
    return (
      <div>
        <div>
          <div className="questionText">when is it available?</div>
          <div>
            <div>
              <Calendar
                onChange={this.onChangeStart}
                value={this.state.start_date}
              />
            </div>
            <div>
              <Calendar
                name="end"
                onChange={this.onChangeEnd}
                value={this.state.end_date}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
