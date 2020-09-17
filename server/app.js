const createError = require("http-errors");
const express = require("express");
const mongoose = require("mongoose");

const loginRouter = require("./routes/login");
const signUpRouter = require("./routes/signup");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

require("dotenv").config();

mongoose.connect(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false 
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log('connected to db');
});

// app.use("/login", loginRouter);
app.use("/signup", signUpRouter);

app.listen(port, () => {
  console.log(`app running on the port ${port}`);
});

module.exports = app;
