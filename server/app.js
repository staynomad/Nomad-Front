const bodyParser = require('body-parser')
const cors = require('cors');
const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');

const { DATABASE_URI, environment } = require("./config");
const contactRouter = require('./routes/contact');
const loginRouter = require("./routes/login");
const signUpRouter = require("./routes/signup");

const app = express();
app.use(bodyParser.json())
app.use(cors({ origin: true }));
app.use('/contact', contactRouter);
app.use("/login", loginRouter);
app.use("/signup", signUpRouter);

mongoose.connect(DATABASE_URI, {
  useCreateIndex: true,
  useFindAndModify: false, // flag needed to enable findOneAndUpdate
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/', (req, res, next) => {
  res.json('App is running...')
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500);
  const isProduction = environment === "production";
  res.json({
    title: err.title || "Server Error",
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
});

module.exports = app;
