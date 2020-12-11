import React, { useState } from "react";
import Navbar from "./components/homePage/navbar.component";
import Footer from "./components/homePage/footer.component";
import Home from "./components/homePage/newHome.component";
import Login from "./components/authentication/login.component";
import Signup from "./components/authentication/signup.component";
import Contact from "./components/subpages/contact.component.js";
import Matches from "./components/matches/matches.component.js";
import Questionnaire from "./components/matches/questionnaire.component";
import EditProfileInfo from "./components/myAccount/editProfileInfo.component";
import ReservationLookup from './components/reservations/reservationLookupModal.component';
import {
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import CreateListing from "./components/createListing/createListing.component";
import MyAccount from "./components/myAccount/menu.component";
import ListingPage from "./components/listingPage/listingPage.component";
import EditListing from "./components/editListing/editListing";
import PaymentSuccess from "./components/listingPage/paymentSuccess.component";
import AccountVerification from "./components/authentication/verifyAccount.component";
import ActivateReservation from "./components/reservations/activateReservation.component";
import ImportCalendar from "./components/createListing/importCalendar.component"
import "./App.css";

//to add more items just copy the format and add the route path. look at navbar component to see where the path is currently set to
function App() {
  const history = useHistory();
  const [reservationModal, setReservationModal] = useState(false);

  return (
    <>
      <Navbar history={history} setReservationModal={setReservationModal} reservationModal={reservationModal} />
      <div className="App">
        <div className="body-container">
          <Switch>
            <Route path="/" exact component={() => <Home isBlurred={reservationModal} history={history} />} />
            <Route path="/ContactUs" exact component={Contact} />
            <Route path="/Login" exact component={Login} />
            <Route path="/SignUp" exact component={Signup} />
            <Route path="/CreateListing" exact component={CreateListing} />
            <Route path="/Matches" exact component={Matches} history={history} />
            <Route path="/MyAccount" exact component={MyAccount} />
            <Route path="/Questionnaire" exact component={Questionnaire} />
            <Route path="/Listing/:id" exact component={ListingPage} />
            <Route path="/EditListing/:listingId" exact component={EditListing} />
            <Route path="/PaymentSuccess" exact component={PaymentSuccess} />
            <Route path="/AccountVerification/:userId" exact component={AccountVerification} />
            <Route path="/EditProfileInfo" exact component={EditProfileInfo} />
            <Route path="/contact" exact component={Contact} />
            <Route path="/completeReservation/:listingId/:reservationId" exact component={ActivateReservation} />
            <Route path="/test" exact component={ImportCalendar} />
          </Switch>
        </div>
        {reservationModal ? <ReservationLookup reservationModal={reservationModal} setReservationModal={setReservationModal} /> : null}
        <Footer />
      </div>
    </>
  );
}

export default App;
