import React, {useState} from 'react';

var STATE_ABBREV = ['Select your home state!', 'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT',
                    'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IO', 'KS', 'KY', 'LA', 'ME',
                    'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM',
                    'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX',
                    'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];

var PERSONALITY_TYPES = ['INTJ- The Architect', 'INTP- The Logician', 'ENJT- The Commander',
                         'ENTP- The Debater', 'INFJ- The Advocate', 'INFP- The Mediator',
                         'ENFJ- The Protagonist', 'ENFP- The Campaigner', 'ISTJ- The Logistician',
                         'ISFJ- The Defender', 'ESTJ- The Executive', 'ESFJ- The Consul',
                         'ISTP- The Virtuoso', 'ISFP- The Adventurer', 'ESTP- The Entrepreneur',
                         'ESFP- The Entertainer', "I don't really know what this means!"];

const HOBBIES = ['Reading', 'Watching TV', 'Spending Time with Family', 'Going to the Movies',
                 'Fishing', 'Computer Programming', 'Gardening', 'Walking', 'Exercising',
                 'Listening to Music', 'Hunting', 'Team Sports', 'Shopping', 'Traveling',
                 'Sleeping', 'Socializing', 'Sewing', 'Golf', 'Church', 'Relaxing', 'Watching Sports',
                 'Biking', 'Playing Cards', 'Hiking', 'Cooking', 'Swimming', 'Camping', 'Ski/Snowboarding',
                 'Writing', 'Boating', 'Horseback Riding', 'Practicing an instrument', 'Dancing'];

export default function Questionnaire () {
  const [name, setName] = useState (null);
  const [stateUS, setStateUS] = useState (null);
  const [numberOfRoommates, setNumberOfRoommates] = useState (null);
  const [bedtime, setBedtime] = useState (null);
  const [petPreference, setPetPreference] = useState (false);
  const [workFromHome, setWorkFromHome] = useState (false);
  const [workFromHomePreference, setWorkFromHomePreference] = useState (null);
  const [fridayNight, setFridayNight] = useState (null);
  const [cleaning, setCleaning] = useState (null);
  const [cleaningPreference, setCleaningPreference] = useState (null);
  const [cooking, setCooking] = useState (null);
  const [cookingPreference, setCookingPreference] = useState (null);
  const [friends, setFriends] = useState (null);
  const [friendsPreference, setFriendsPreference] = useState (null);
  const [smoke, setSmoke] = useState (null);
  const [personalityType, setPersonalityType] = useState (null);
  const [hobbies, setHobbies] = useState ({});
  const [selfDescription, setSelfDescription] = useState (null);
  const [roommateStory, setRoommateStory] = useState (null);
  const [covidStory, setCovidStory] = useState (null);

  const handleChangeName = event => {
    setName (event.target.value);
  };

  const handleChangeStateUS = event => {
    setStateUS (event.target.value);
  };

  const handleChangeNumberOfRoommates = event => {
    setNumberOfRoommates (event.target.value);
  };

  const handleChangeBedtime = event => {
    setBedtime (event.target.value);
  };

  const handleChangePetPreference = event => {
    setPetPreference (event.target.value);
  };

  const handleChangeWorkFromHome = event => {
    setWorkFromHome (event.target);
  };

  const handleChangeWorkFromHomePreference = event => {
    setWorkFromHomePreference (event.target.value);
  };

  const handleChangeFridayNight = event => {
    setFridayNight (event.target.value);
  };

  const handleChangeCleaning = event => {
    setCleaning (event.target.value);
  };

  const handleChangeCleaningPreference = event => {
    setCleaningPreference (event.target.value);
  };

  const handleChangeCooking = event => {
    setCooking (event.target.value);
  };

  const handleChangeCookingPreference = event => {
    setCookingPreference (event.target.value);
  };

  const handleChangeFriends = event => {
    setFriends (event.target.value);
  };

  const handleChangeFriendsPreference = event => {
    setFriendsPreference (event.target.value);
  };

  const handleChangeSmoke = event => {
    setSmoke (event.target.value);
  };

  const handleChangePersonalityType = event => {
    setPersonalityType (event.target.value);
  };

  const handleChangeHobbies = event => {
    console.log (event.target.name);
    console.log ('Checked value: ', event.target.checked);
    const newHobbies = {...hobbies, [event.target.name]: event.target.checked};
    console.log ('Your new hobbies list: ', newHobbies);
    setHobbies (newHobbies);
  };

  const handleChangeSelfDescription = event => {
    setSelfDescription (event.target.value);
  };

  const handleChangeRoommateStory = event => {
    setRoommateStory (event.target.value);
  };

  const handleChangeCovidStory = event => {
    setCovidStory (event.target.value);
  };

  const handleSubmit = event => {
  event.preventDefault ();
  return (
    {name: name, stateUS: stateUS, numberOfRoommates: numberOfRoommates, bedtime: bedtime, 
    petPreference: petPreference, workFromHome: workFromHome, workFromHomePreference: workFromHomePreference,
    fridayNight: fridayNight, cleaning: cleaning, cleaningPreference: cleaningPreference, cooking: cooking,
    cookingPreference: cookingPreference, friends: friends, friendsPreference: friendsPreference, smoke: smoke,
    personalityType: personalityType, selfDescription: selfDescription, roommateStory: roommateStory,
    covidStory: covidStory, hobbies: hobbies}
  );
};

  return (
    <div>
      <h1>Roommate Preferences Form</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <label id="name">
          <h3>Write your name here!</h3>
          <input
            type="text"
            id="questionnaireNameInput"
            placeholder="Your full name"
            onChange={handleChangeName}
          />
        </label>
        <label id="stateUS">
          <h3>What state are you from?</h3>
          <select id="questionnaireStateUS" onChange={handleChangeStateUS}>
            {STATE_ABBREV.map (stateUS => (
              <option value={stateUS} key={stateUS}>{stateUS}</option>
            ))}
          </select>
        </label>
        <label id="numberOfRoommates">
          <h3>How many roommates would you prefer to live with?</h3>
          <select
            id="questionnaireNumberOfRoommates"
            onChange={handleChangeNumberOfRoommates}
          >
            <option value="_" key="_">Select your roommate preference!</option>
            <option value="0" key="0">0 roommates</option>
            <option value="1-2" key="1-2">1-2 roommates</option>
            <option value="3-4" key="3-4">3-4 roommates</option>
            <option value="5-7" key="5-7">5-7 roommates</option>
            <option value="8+" key="8+">8+ roommates</option>
          </select>
        </label>
        <label id="bedtime">
          <h3>What is your ideal bedtime?</h3>
          <select id="questionnaireBedtime" onChange={handleChangeBedtime}>
            <option value="_" key="_">Select your bedtime preference!</option>
            <option value="9" key="9">9 PM - 10 PM</option>
            <option value="10" key="10">10 PM - 11 PM</option>
            <option value="11" key="11">11 PM - 12 AM</option>
            <option value="12" key="12">12 AM - 1 AM</option>
            <option value="1" key="1">Past 1 AM</option>
          </select>
        </label>
        <label id="petPreference">
          <h3>If applicable, do you plan on bringing a pet?</h3>
          <select
            id="questionnairePetPreference"
            onChange={handleChangePetPreference}
          >
            <option value="_" key="_">Select your pet preference!</option>
            <option value={true} key="yes">Yes, of course!</option>
            <option value={false} key="no">
              No / this does not apply to me.
            </option>
          </select>
        </label>
        <label id="workFromHome">
          <h3>WIll you be working from home?</h3>
          <select
            id="questionnaireWorkFromHome"
            onChange={handleChangeWorkFromHome}
          >
            <option value="_" key="_">Select your work preference!</option>;
            <option value={true} key="yes">
              Yes, I will be working from home.
            </option>
            <option value={false} key="no">
              No, I will not be working from home.
            </option>
          </select>
        </label>
        <label id="workFromHomePreference">
          <h3>
            Would you like to live with someone who would be working from home?
          </h3>
          <select
            id="questionnaireWorkFromHomePreference"
            onChange={handleChangeWorkFromHomePreference}
          >
            <option value="_" key="_">Select your roommate preference!</option>
            <option value="yes" key="yes">Sure!</option>
            <option value="no" key="no">No, I would not.</option>
            <option value="maybe" key="maybe">No preference.</option>
          </select>
        </label>
        <label id="fridayNight">
          <h3>Would you rather stay home or go out on a Friday night?</h3>
          <select
            id="questionnaireFridayNight"
            onChange={handleChangeFridayNight}
          >
            <option value="_" key="_">
              Select your Friday night preference!
            </option>
            <option value="stayHome">Stay home, of course!</option>
            <option value="goOut">Go out, duh!</option>
          </select>
        </label>
        <label id="cleaning">
          <h3>How often do you plan to clean your living space?</h3>
          <select id="questionnaireCleaning" onChange={handleChangeCleaning}>
            <option value="_" key="_">Select your cleaning preference!</option>
            <option value="mostOften">2-3 times per week</option>
            <option value="mediumOften">About once per week</option>
            <option value="notOften">
              Once every few weeks, or when I need to
            </option>
          </select>
        </label>
        <label id="cleaningPreference">
          <h3>
            How important is it to you that your roommate frequently cleans the living space?
          </h3>
          <select
            id="questionnaireCleaningPreference"
            onChange={handleChangeCleaningPreference}
          >
            <option value="_" key="_">Select your roommate preference!</option>
            <option value="most">It is extremely important to me!</option>
            <option value="medium">
              It is important, but not the most critical thing.
            </option>
            <option value="low">It is not very important to me!</option>
          </select>
        </label>
        <label id="cooking">
          <h3>How often do you plan to cook?</h3>
          <select id="questionnaireCooking" onChange={handleChangeCooking}>
            <option value="_" key="_">Select your cooking preference!</option>
            <option value="mostOften">Almost every day!</option>
            <option value="mediumOften">A few times per week.</option>
            <option value="notOften">Not very often!</option>
          </select>
        </label>
        <label id="cookingPreference">
          <h3>How important is it to you that your roommate plans to cook?</h3>
          <select
            id="questionnaireCookingPreference"
            onChange={handleChangeCookingPreference}
          >
            <option value="_" key="_">Select your roommate preference!</option>
            <option value="most">It is extremely important to me.</option>
            <option value="medium">
              It is important, but not the most critical thing.
            </option>
            <option value="low">It is not very important to me!</option>
          </select>
        </label>
        <label id="friends">
          <h3>How often do you plan to have friends over?</h3>
          <select id="questionnaireFriends" onChange={handleChangeFriends}>
            <option value="_" key="_">Select your social preference!</option>
            <option value="6-7">Nearly every day</option>
            <option value="4-5">About 4-5 times per week</option>
            <option value="3-4">About 3-4 times per week</option>
            <option value="2-3">About 2-3 times per week</option>
            <option value="0-1">Once every few weeks</option>
          </select>
        </label>
        <label id="friendsPreference">
          <h3>
            How would you feel about your roommate(s) having friends over?
          </h3>
          <select
            id="questionnaireFriendsPreference"
            onChange={handleChangeFriendsPreference}
          >
            <option value="_" key="_">Select your roommate preference!</option>
            <option value="good">The more, the merrier!</option>
            <option value="medium">
              I would be fine with it, as long as my space is respected.
            </option>
            <option value="bad">
              I would prefer if my roommate did not have friends over often.
            </option>
          </select>
        </label>
        <label id="smoke">
          <h3>Do you smoke?</h3>
          <select id="questionnaireSmoke" onChange={handleChangeSmoke}>
            <option value="_" key="_">Select your smoking preference!</option>
            <option value="no">
              No, and I would not like to live with someone who smokes.
            </option>
            <option value="noInfreq">
              No, but I would not mind living with someone who smokes infrequently.
            </option>
            <option value="noFreq">
              No, but I would not mind living with someone who smokes frequently.
            </option>
            <option value="yesInfreq">Yes, but not very often.</option>
            <option value="yesFreq">
              Yes, I smoke, and I would not mind living with someone who smokes.
            </option>
          </select>
        </label>
        <label id="personalityType">
          <h3>What is your Myers Briggs personality type?</h3>
          <select
            id="questionnairePersonalityType"
            onChange={handleChangePersonalityType}
          >
            {PERSONALITY_TYPES.map (personality => (
              <option value={personality} key={personality}>
                {personality}
              </option>
            ))}
          </select>
        </label>
        <label>
          <h3>What are your favorite hobbies? Check all that apply!</h3>
          {HOBBIES.map (hobby => (
            <label id={hobby} key={hobby}>
              {hobby}:
              <input
                type="checkbox"
                id={hobby}
                name={hobby}
                onClick={handleChangeHobbies}
                value={hobby}
              />
              <br />
            </label>
          ))}
        </label>
        <label id="selfDescription">
          <h3>
            Use this space to tell your future roommate(s) a little about yourself!
          </h3>
          <p>
            For instance, are you a student? Do you love Game of Thrones as much as the rest of us?
            {' '}
            Got any pet peeves?
          </p>
          <br />
          <textarea
            id="questionnaireSelfDescription"
            onChange={handleChangeSelfDescription}
          />
        </label>
        <label id="roommateStory">
          <h3>Expand a bit on your past roommate experience, if applicable!</h3>
          <p>
            Are you still friends with your old roommates? How did you manage living with others?
          </p>
          <br />
          <textarea
            id="questionnaireRoommateStory"
            onChange={handleChangeRoommateStory}
          />
        </label>
        <label id="covidStory">
          <h3>
            Tell us about your experience social distancing, if applicable!
          </h3>
          <p>
            What is the size of your social circle? How did you manage the shutdown?
          </p>
          <br />
          <textarea
            id="questionnaireCovidStory"
            onChange={handleChangeCovidStory}
          />
        </label>
        <hr />
        <input
          type="submit"
          id="questionnaireSubmit"
          value="Submit your preferences!"
        />
      </form>
    </div>
  );
}