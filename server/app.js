const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const { DATABASE_URI, environment } = require("./config");
// const contactRouter = require('./routes/contact');
const loginRouter = require("./routes/login");
const signUpRouter = require("./routes/signup");
const roommateRouter = require("./routes/roommates");
const listingRouter = require("./routes/listing");

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors({ origin: true }));
// app.use('/contact', contactRouter);
app.use("/login", loginRouter);
app.use("/signup", signUpRouter);
app.use("/roommates", roommateRouter);
app.use("/listings", listingRouter);

mongoose.connect(DATABASE_URI, {
  useCreateIndex: true,
  useFindAndModify: false, // flag needed to enable findOneAndUpdate
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// test to see if the backend is connected

mongoose.connection.on('connected', () => {
  console.log('mongoose is connected');
});


app.get("/", async (req, res) => {
  res.json('Server is running!')
});

// error handler\
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
