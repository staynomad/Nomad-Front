const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const {String, Object} = Schema.Types;

const QuestionnaireSchema = new Schema({
    name: {
        type: String,
        required: true,
        default: "",
    },
    email: {
        type: String,
        required: true,
        default: "",
    },
    stateUS: {
        type: String,
        required: true,
        default: "",
    },
    numberOfRoommates: {
        type: String,
        required: true,
        default: "0",
    },
    bedtime: {
        type: String,
        required: true,
        default: "11",
    },
    petPreference: {
        type: String,
        required: true,
        default: "no",
    },
    workFromHome: {
        type: String,
        required: true,
        default: "no",
    },
    workFromHomePreference: {
        type: String,
        required: true,
        default: "maybe",
    },
    fridayNight: {
        type: String,
        required: true,
        default: "stayHome",
    },
    cleaning: {
        type: String,
        required: true,
        default: "mediumOften",
    },
    cleaningPreference: {
        type: String,
        required: true,
        default: "medium",
    },
    cooking: {
        type: String,
        required: true,
        default: "mediumOften",
    },
    cookingPreference: {
        type: String,
        required: true,
        default: "medium",
    },
    friends: {
        type: String,
        required: true,
        default: "0-1",
    },
    friendsPreference: {
        type: String,
        required: true,
        default: "medium",
    },
    smoke: {
        type: String,
        required: true,
        default: "no",
    },
    personalityType: {
        type: String,
        required: true,
        default: "",
    },
    selfDescription: {
        type: String,
        required: true,
        default: "",
    },
    roommateStory: {
        type: String,
        required: true,
        default: "",
    },
    covidStory: {
        type: String,
        required: true,
        default: "",
    },
    hobbies: {
        type: Object,
        required: true,
        default: "",
    },
    userId: {
        type: String,
        required: true,
        default: ""
    }
});

const Questionnaire = mongoose.model('questionnaire', QuestionnaireSchema);
module.exports = Questionnaire;
