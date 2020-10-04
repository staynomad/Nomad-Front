const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const { DATABASE_URI, environment } = require("./config");
// const contactRouter = require('./routes/contact');
const loginRouter = require("./routes/login");
const signUpRouter = require("./routes/signup");
const roommateRouter = require("./routes/roommates");
const listingRouter = require("./routes/listing");

const app = express();
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
