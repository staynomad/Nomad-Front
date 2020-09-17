const createError = require("http-errors");
const express = require("express");
const mongoose = require("mongoose");
const { DATABASE_URI, environment } = require("./config/index");

const loginRouter = require("./routes/login");
const signUpRouter = require("./routes/signup");


const app = express();
app.use(express.json());


mongoose.connect(DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false 
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log('connected to db');
});

app.use("/login", loginRouter);
app.use("/signup", signUpRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
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
