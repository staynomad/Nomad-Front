import React, { useState, useEffect } from "react";
import { app } from "../../utils/axiosConfig.js";
import { NavLink } from "react-router-dom";
import "./questionnaire.css";
import { useSelector } from "react-redux";

import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

var PERSONALITY_TYPES = [
  "INTJ- The Architect",
  "INTP- The Logician",
  "ENJT- The Commander",
  "ENTP- The Debater",
  "INFJ- The Advocate",
  "INFP- The Mediator",
  "ENFJ- The Protagonist",
  "ENFP- The Campaigner",
  "ISTJ- The Logistician",
  "ISFJ- The Defender",
  "ESTJ- The Executive",
  "ESFJ- The Consul",
  "ISTP- The Virtuoso",
  "ISFP- The Adventurer",
  "ESTP- The Entrepreneur",
  "ESFP- The Entertainer",
  "I don't really know what this means!",
];

/*const HOBBIES = [
  "Reading",
  "Watching TV",
  "Spending Time with Family",
  "Going to the Movies",
  "Fishing",
  "Computer Programming",
  "Gardening",
  "Walking",
  "Exercising",
  "Listening to Music",
  "Hunting",
  "Team Sports",
  "Shopping",
  "Traveling",
  "Sleeping",
  "Socializing",
  "Sewing",
  "Golf",
  "Church",
  "Relaxing",
  "Watching Sports",
  "Biking",
  "Playing Cards",
  "Hiking",
  "Cooking",
  "Swimming",
  "Camping",
  "Ski/Snowboarding",
  "Writing",
  "Boating",
  "Horseback Riding",
  "Practicing an instrument",
  "Dancing",
];*/

export default function Questionnaire(props) {
  const loginInfo = useSelector((state) => state.Login);

  // const [hobbies, setHobbies] = useState({});
  const [successfulPost, setSuccessfulPost] = useState(false);
  const [notLoggedIn, setNotLoggedIn] = useState(props.userId === "");
  const [error, setError] = useState(false);
  const [totalState, setTotalState] = useState({
    numberOfRoommates: "",
    bedtime: "",
    petPreference: "",
    workFromHome: "",
    workFromHomePreference: "",
    fridayNight: "",
    cleaning: "",
    cleaningPreference: "",
    cooking: "",
    cookingPreference: "",
    friends: "",
    friendsPreference: "",
    smoke: "",
    personalityType: "",
  });

  useEffect(() => {
    if (!loginInfo.userInfo.session) {
      alert("Please log in to view your profile.");
      return props.history.push("/login");
    }
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (event) => {
    const value = event.target.value;
    setTotalState({
      ...totalState,
      [event.target.name]: value,
    });
  };

  /*const handleChangeHobbies = (event) => {
    const newHobbies = {
      ...hobbies,
      [event.target.name]: event.target.checked,
    };
    setHobbies(newHobbies);
  };*/

  const handleSubmit = (event) => {
    event.preventDefault();
    var noErrors = true;
    var fieldsFilledOut = true;
    const newQuestionnaire = {
      ...totalState,
      // hobbies: hobbies,
      userId: props.userId,
    };
    // post request

    // checks to make sure all fields are filled out
    for (var key in totalState) {
      if (totalState[key] === "") {
        fieldsFilledOut = false;
      }
    }

    app
      .post(
        `/questionnaire/submit_questionnaire/${props.userId}`,
        newQuestionnaire
      )
      .catch((res) => {
        noErrors = false;
      });

    if (noErrors && fieldsFilledOut) {
      setError(false);
      setSuccessfulPost(true);
    } else {
      setError(true);
    }
  };

  return (
    <div className="questionnaire-container">
      <div className="questionnaire-content-container">
        <div className="questionnaire-header">
          <NavLink to="/MyAccount">
            <KeyboardBackspaceIcon className="questionnaire-back-icon" />
          </NavLink>
          <h2>Roommate Preferences Form</h2>
        </div>
        {successfulPost ? (
          <h3 className="successful-text" style={{ color: "green" }}>
            Your responses have been recorded!
          </h3>
        ) : (
          <>
            <form className="questionnaire-form" onSubmit={handleSubmit}>
              <label id="numberOfRoommates">
                <h3 className="question">
                  How many roommates would you prefer to live with?
                </h3>
                <select
                  className="answer"
                  id="questionnaireNumberOfRoommates"
                  name="numberOfRoommates"
                  value={totalState.numberOfRoommates}
                  onChange={handleChange}
                >
                  <option value="_" key="_">
                    Select your roommate preference!
                  </option>
                  <option value="0" key="0">
                    0 roommates
                  </option>
                  <option value="1-2" key="1-2">
                    1-2 roommates
                  </option>
                  <option value="3-4" key="3-4">
                    3-4 roommates
                  </option>
                  <option value="5-7" key="5-7">
                    5-7 roommates
                  </option>
                  <option value="8+" key="8+">
                    8+ roommates
                  </option>
                </select>
              </label>
              <label id="bedtime">
                <h3 className="question">What is your ideal bedtime?</h3>
                <select
                  className="answer"
                  id="questionnaireBedtime"
                  value={totalState.bedtime}
                  name="bedtime"
                  onChange={handleChange}
                >
                  <option value="_" key="_">
                    Select your bedtime preference!
                  </option>
                  <option value="9" key="9">
                    9 PM - 10 PM
                  </option>
                  <option value="10" key="10">
                    10 PM - 11 PM
                  </option>
                  <option value="11" key="11">
                    11 PM - 12 AM
                  </option>
                  <option value="12" key="12">
                    12 AM - 1 AM
                  </option>
                  <option value="1" key="1">
                    Past 1 AM
                  </option>
                </select>
              </label>
              <label id="petPreference">
                <h3 className="question">
                  If applicable, do you plan on bringing a pet?
                </h3>
                <select
                  className="answer"
                  id="questionnairePetPreference"
                  name="petPreference"
                  value={totalState.petPreference}
                  onChange={handleChange}
                >
                  <option value="_" key="_">
                    Select your pet preference!
                  </option>
                  <option value={true} key="yes">
                    Yes, of course!
                  </option>
                  <option value={false} key="no">
                    No / this does not apply to me.
                  </option>
                </select>
              </label>
              <label id="workFromHome">
                <h3 className="question">WIll you be working from home?</h3>
                <select
                  className="answer"
                  id="questionnaireWorkFromHome"
                  name="workFromHome"
                  value={totalState.workFromHome}
                  onChange={handleChange}
                >
                  <option value="_" key="_">
                    Select your work preference!
                  </option>
                  ;
                  <option value={true} key="yes">
                    Yes, I will be working from home.
                  </option>
                  <option value={false} key="no">
                    No, I will not be working from home.
                  </option>
                </select>
              </label>
              <label id="workFromHomePreference">
                <h3 className="question">
                  Would you like to live with someone who would be working from
                  home?
                </h3>
                <select
                  className="answer"
                  id="questionnaireWorkFromHomePreference"
                  name="workFromHomePreference"
                  value={totalState.workFromHomePreference}
                  onChange={handleChange}
                >
                  <option value="_" key="_">
                    Select your roommate preference!
                  </option>
                  <option value="yes" key="yes">
                    Sure!
                  </option>
                  <option value="no" key="no">
                    No, I would not.
                  </option>
                  <option value="maybe" key="maybe">
                    No preference.
                  </option>
                </select>
              </label>
              <label id="fridayNight">
                <h3 className="question">
                  Would you rather stay home or go out on a Friday night?
                </h3>
                <select
                  className="answer"
                  id="questionnaireFridayNight"
                  name="fridayNight"
                  value={totalState.fridayNight}
                  onChange={handleChange}
                >
                  <option value="_" key="_">
                    Select your Friday night preference!
                  </option>
                  <option value="stayHome">Stay home, of course!</option>
                  <option value="goOut">Go out, duh!</option>
                </select>
              </label>
              <label id="cleaning">
                <h3 className="question">
                  How often do you plan to clean your living space?
                </h3>
                <select
                  className="answer"
                  id="questionnaireCleaning"
                  value={totalState.cleaning}
                  name="cleaning"
                  onChange={handleChange}
                >
                  <option value="_" key="_">
                    Select your cleaning preference!
                  </option>
                  <option value="mostOften">2-3 times per week</option>
                  <option value="mediumOften">About once per week</option>
                  <option value="notOften">
                    Once every few weeks, or when I need to
                  </option>
                </select>
              </label>
              <label id="cleaningPreference">
                <h3 className="question">
                  How important is it to you that your roommate frequently
                  cleans the living space?
                </h3>
                <select
                  id="questionnaireCleaningPreference"
                  value={totalState.cleaningPreference}
                  name="cleaningPreference"
                  onChange={handleChange}
                >
                  <option value="_" key="_">
                    Select your roommate preference!
                  </option>
                  <option value="most">It is extremely important to me!</option>
                  <option value="medium">
                    It is important, but not the most critical thing.
                  </option>
                  <option value="low">It is not very important to me!</option>
                </select>
              </label>
              <label id="cooking">
                <h3 className="question">How often do you plan to cook?</h3>
                <select
                  className="answer"
                  id="questionnaireCooking"
                  value={totalState.cooking}
                  name="cooking"
                  onChange={handleChange}
                >
                  <option value="_" key="_">
                    Select your cooking preference!
                  </option>
                  <option value="mostOften">Almost every day!</option>
                  <option value="mediumOften">A few times per week.</option>
                  <option value="notOften">Not very often!</option>
                </select>
              </label>
              <label id="cookingPreference">
                <h3 className="question">
                  How important is it to you that your roommate plans to cook?
                </h3>
                <select
                  className="answer"
                  id="questionnaireCookingPreference"
                  name="cookingPreference"
                  value={totalState.cookingPreference}
                  onChange={handleChange}
                >
                  <option value="_" key="_">
                    Select your roommate preference!
                  </option>
                  <option value="most">It is extremely important to me.</option>
                  <option value="medium">
                    It is important, but not the most critical thing.
                  </option>
                  <option value="low">It is not very important to me!</option>
                </select>
              </label>
              <label id="friends">
                <h3 className="question">
                  How often do you plan to have friends over?
                </h3>
                <select
                  className="answer"
                  id="questionnaireFriends"
                  value={totalState.friends}
                  name="friends"
                  onChange={handleChange}
                >
                  <option value="_" key="_">
                    Select your social preference!
                  </option>
                  <option value="6-7">Nearly every day</option>
                  <option value="4-5">About 4-5 times per week</option>
                  <option value="3-4">About 3-4 times per week</option>
                  <option value="2-3">About 2-3 times per week</option>
                  <option value="0-1">Once every few weeks</option>
                </select>
              </label>
              <label id="friendsPreference">
                <h3 className="question">
                  How would you feel about your roommate(s) having friends over?
                </h3>
                <select
                  className="answer"
                  id="questionnaireFriendsPreference"
                  name="friendsPreference"
                  value={totalState.friendsPreference}
                  onChange={handleChange}
                >
                  <option value="_" key="_">
                    Select your roommate preference!
                  </option>
                  <option value="good">The more, the merrier!</option>
                  <option value="medium">
                    I would be fine with it, as long as my space is respected.
                  </option>
                  <option value="bad">
                    I would prefer if my roommate did not have friends over
                    often.
                  </option>
                </select>
              </label>
              <label id="smoke">
                <h3 className="question">Do you smoke?</h3>
                <select
                  className="answer"
                  id="questionnaireSmoke"
                  value={totalState.smoke}
                  name="smoke"
                  onChange={handleChange}
                >
                  <option value="_" key="_">
                    Select your smoking preference!
                  </option>
                  <option value="no">
                    No, and I would not like to live with someone who smokes.
                  </option>
                  <option value="noInfreq">
                    No, but I would not mind living with someone who smokes.
                  </option>
                  <option value="yesInfreq">
                    Yes, but I would not like to live with someone who smokes.
                  </option>
                  <option value="yesFreq">
                    Yes, I smoke, and I would not mind living with someone who
                    smokes.
                  </option>
                </select>
              </label>
              <label id="personalityType">
                <h3 className="question">
                  What is your Myers Briggs personality type?
                </h3>
                <select
                  className="answer"
                  id="questionnairePersonalityType"
                  name="personalityType"
                  value={totalState.personalityType}
                  onChange={handleChange}
                >
                  {PERSONALITY_TYPES.map((personality) => (
                    <option value={personality} key={personality}>
                      {personality}
                    </option>
                  ))}
                </select>
              </label>
              {/*<label>
          <h3 className="question">What are your favorite hobbies? Check all that apply!</h3>
          {HOBBIES.map((hobby) => (
            <label id={hobby} key={hobby} className="questionnaire-cb-labels">
              <input
                className="questionnaire-checkbox"
                type="checkbox"
                id={hobby}
                name={hobby}
                onClick={handleChangeHobbies}
                value={hobby}
              />
              {hobby}
            </label>
          ))}
        </label>*/}
              <div className="spacer_xxs"></div>
              <input
                className="btn green questionnaire-btn"
                type="submit"
                id="questionnaireSubmit"
                value="Submit your preferences!"
              />
            </form>

            <h3 className="success-text" style={{ color: "red" }}>
              Your responses have not been recorded. Please make sure that all
              forms are filled out and press Submit your preferences!
            </h3>

            {error ? (
              <h3 className="questionnaire-error-message">
                Please fill out all of the fields!
              </h3>
            ) : (
              ""
            )}
          </>
        )}
      </div>
    </div>
  );
}
