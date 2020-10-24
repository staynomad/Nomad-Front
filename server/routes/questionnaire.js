const express = require('express');
const router = express.Router();

const Questionnaire = require('../models/questionnaire.model');
const {requireUserAuth} = require ('../utils');
// const { check, validationResult } = require("express-validator");

/* Add a questionnaire response */

router.post('/submit_questionnaire', async(req, res) => {
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
      covidStory
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
      covidStory
    }).save();

    // Request is created
    // Need to talk about return values, validation, etc.
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

// implement a get request

module.exports = router;
