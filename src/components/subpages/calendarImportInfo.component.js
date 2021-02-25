import React, { Component } from "react";
import "./calendarImportInfo.css"

export default class CalendarImportInfo extends Component {
  render() {
    return (
      <div className="container">
        <h1>Importing and Exporting Your Listing Calendar</h1>
        <div className="spacer_xs"></div>
        <img className="calendar-image" src="images/calendar.jpg" alt="calendar graphic" />
        <h3 className="left underline">Importing: </h3>
        <p>
          <ol className="instructions" type="1">
            <li><b>Create a Listing: </b>Navigate to your Profile and select the My Listings tab on the side menu. At the top of the screen, click on "Create Listing"</li>
            <img className="calendar-image" src="images/calendarImport1.png" alt="create a listing" />
            <li><b>Enter Your Information: </b>Scroll to the bottom of the page until you reach the Availability section. Click on "Import your calendar instead" and enter your calendar URL. For help finding this, click <a className="underline" href="https://www.airbnb.com/help/article/99/how-do-i-sync-my-airbnb-calendar-with-another-calendar">here</a>. Then, click "import" to sync your data.</li>
            <img className="calendar-image" src="images/calendarImport2.png" alt="import your calendar" />
            <li><b>Submit Your Listing: </b>Fill out the rest of the information about your listing and submit. Now, your listing is live and synced with your calendar!</li>
          </ol>
        </p>
        <br />
        <hr />
        <h3 className="left underline">Exporting: </h3>
        <p>
          <ol className="instructions" type="1">
            <li><b>Find your Listing: </b>Navigate to your Profile and select the My Listings tab on the side menu. Find the listing you want to export and select "Edit Listing."</li>
            <img className="calendar-image" src="images/calendarExport1.png" alt="create a listing" />
            <li><b>Generate a Link: </b>Scroll to the bottom of the page and click "Export." This will generate an ical file for you to download or inport. </li>
            <img className="calendar-image" src="images/calendarExport2.png" alt="import your calendar" />
            <li><b>Use the Export: </b>The way to import your newly exported listing calendar may vary depending on the site you are using. Please see the import instructions on the site you are exporting to for more instructions. </li>
          </ol>
        </p>
        <div className="spacer_xl"></div>
      </div>
    )
  }
}
