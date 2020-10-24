import React from "react";
import "./services.css";
import Calendar from '../calendar/cal.component'

const Services = () => {
  return (
    <div className="services-content">
      <div className="services-title">
        <h2>What do we do?</h2>
      </div>
      <div className="basic-info">
        <div className="question-statement">
          Want to travel for cheap or easily find rentors?
        </div>
        <div className="question-answer">look no further</div>
        <br />
        <div className="solution-statement">
          At VHomes we help people find both roomates and places so that anyone
          can travel anywhere without the burden of hotel costs.
        </div>
      </div>
      <div>
        <a className="btn" href="/Home" style={{ textDecoration: "none" }}>
          return to home
        </a>
      </div>

      <div>
        <Calendar/>
      </div>
    </div>
  );
};

export default Services;
