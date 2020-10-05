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
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import CreateListing from "./components/createListing/createListing.component";
//to add more items just copy the format and add the route path. look at navbar component to see where the path is currently set to
function App() {
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/ContactUs' exact component={Contact} />
          <Route path='/Login' exact component={Login} />
          <Route path='/SignUp' exact component={Signup} />
          <Route path='/Services' exact component={Services} />
          <Route path='/Reservations' exact component={Reservation} />
          <Route path='/CreateListing' exact component={CreateListing} />
          <Route path='/Matches' exact component={Matches} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
