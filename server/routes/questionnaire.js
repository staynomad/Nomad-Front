const express = require('express');
const router = express.Router();

const Questionnaire = require('../models/questionnaire.model');
const {requireUserAuth} = require ('../utils');
const {check, validationResult} = require ('express-validator');

/* Post a questionnaire response */
router.post(
  '/submit_questionnaire', 
  async(req, res) => {
    try {
      const {
        name,
        email,
        stateUS,
        numberOfRoommates,
        bedtime,
        petPreference,
        workFromHome,
        workFromHomePreference,
        fridayNight,
        cleaning,
        cleaningPreference,
        cooking,
        cookingPreference,
        friends,
        friendsPreference,
        smoke,
        personalityType,
        selfDescription,
        roommateStory,
        covidStory,
        hobbies
      } = req.body;

      const newQuestionnaire = await new Questionnaire({
        name,
        email,
        stateUS,
        numberOfRoommates,
        bedtime,
        petPreference,
        workFromHome,
        workFromHomePreference,
        fridayNight,
        cleaning,
        cleaningPreference,
        cooking,
        cookingPreference,
        friends,
        friendsPreference,
        smoke,
        personalityType,
        selfDescription,
        roommateStory,
        covidStory,
        hobbies
      }).save();
    
      // request is created. needs more validation
      res.status(201).json ({
        newQuestionnaire
      });
    } catch (e) {
      console.log("there has been an error")
      console.error (error);
      res.status (500).json ({
        errors: ['Error occurred while submitting questionnaire. Please try again!'],
      });
    }
});

/* Get a previous questionnaire response */
/* Will eventually be edit a previous questionnaire response */
router.get('/get_questionnaire', async (req, res) => {
  console.log ('IN QUESTIONNAIRE GET REQUEST. HERE IS MY REQUEST BODY: ', req);
  const questionnaires = await Questionnaire.find({});
  console.log("IN QUESTIONNAIRE GET REQUEST. HERE ARE QUESTIONNAIRES")
  // const userQuestionnaire = await Questionnaire.findById(req.params.userId, (err, data) => {
  //   if (err) {
  //     console.log("there has been an error!")
  //   } else {
  //     console.log("here is the data: ", data);
  //   }
  // });
});

module.exports = router;
