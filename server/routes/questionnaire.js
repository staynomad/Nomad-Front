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
      hobbies,
      userId,
    } = req.body;

    // previous questionnaire-- null if it does not exist
    const prevQuestionnaire = await Questionnaire.findOne({userId: req.params.id});

    // if user is updating their questionnaire preferences
    if (prevQuestionnaire) {
      Questionnaire.findOneAndUpdate({userId: req.params.id}, {$set: req.body})
        .then(() => console.log('success in updating previous questionnaire response!'))
        .catch(err => console.log('this is your error: ', err))
    } 
    
    // if user is submitting a questionnaire for the first time
    else {
      try {
        // newQuestionnaire-- based off of what the user filled out in the form
        const newQuestionnaire = await new Questionnaire({
          name,
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
          hobbies,
          userId
        }).save();

        // request is created. need ui for validation
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
