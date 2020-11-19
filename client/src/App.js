import React from "react";
import Navbar from "./components/general/navbar.component";
import Footer from "./components/general/footer.component";
import Home from "./components/homePage/home.component";
import Login from "./components/authentication/login.component";
import Signup from "./components/authentication/signup.component";
import Contact from "./components/subpages/contact.component.js";
import Services from "./components/subpages/services.component.js";
import Reservation from "./components/reservations/findReservation.component";
import Matches from "./components/matches/matches.component.js";
import Questionnaire from "./components/matches/questionnaire.component";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import CreateListing from "./components/createListing/createListing.component";
import MyAccount from "./components/myAccount/menu.component";
import ListingPage from "./components/listingPage/listingPage.component";
import EditListing from "./components/editListing/editListing";
import PaymentSuccess from "./components/listingPage/paymentSuccess.component"
import "./App.css";

//to add more items just copy the format and add the route path. look at navbar component to see where the path is currently set to
function App() {
  const history = useHistory();

  return (
    <Router>
      <Navbar history={history} />
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/ContactUs" exact component={Contact} />
          <Route path="/Login" exact component={Login} />
          <Route path="/SignUp" exact component={Signup} />
          <Route path="/Services" exact component={Services} />
          <Route path="/Reservations" exact component={Reservation} />
          <Route path="/CreateListing" exact component={CreateListing} />
          <Route path="/Matches" exact component={Matches} />
          <Route path="/MyAccount" exact component={MyAccount} />
          <Route path="/Questionnaire" exact component={Questionnaire} />
          <Route path="/Listing/:id" exact component={ListingPage} />
          <Route path="/EditListing/:id" exact component={EditListing} />
          <Route path="/PaymentSuccess" exact component={PaymentSuccess} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
