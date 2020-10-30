const express = require('express');
const router = express.Router();

const Questionnaire = require('../models/questionnaire.model');
const {requireUserAuth} = require ('../utils');
const {check, validationResult} = require ('express-validator');

/* Post a questionnaire response */
router.post(
  '/submit_questionnaire/:id', 
  async(req, res) => {

    // formatting req body
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
      hobbies,
      userId,
    } = req.body;

    // newQuestionnaire-- based off of what the user filled out in the form
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
      hobbies,
      userId
    }).save();

    // previous questionnaire-- null if it does not exist
    const prevQuestionnaire = await Questionnaire.findOne({userId: req.params.id});

    // if user is updating their questionnaire preferences
    if (prevQuestionnaire) {
      Questionnaire.findOneAndUpdate({userId: req.params.id}, {$set: newQuestionnaire})
        .then(() => console.log('success in updating previous questionnaire response!'))
        .catch(err => console.log('this is your error: ', err))
    } 
    
    // if user is submitting a questionnaire for the first time
    else {
      try {
        // request is created. ****** needs more validation ******
        res.status(201).json ({
          newQuestionnaire
        });
      } catch (e) {
        res.status (500).json ({
          errors: ['Error occurred while submitting questionnaire. Please try again!'],
      });
    };
  };
});

module.exports = router;
