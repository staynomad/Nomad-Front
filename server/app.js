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
const questionnaireRouter = require("./routes/questionnaire");
const reservationRouter = require("./routes/reservation");
const paymentRouter = require("./routes/payment");
const userRouter = require("./routes/user");
const accountVerificationRouter = require("./routes/accountVerification");
const photosRouter = require("./routes/photos");
const reviewRouter = require("./routes/reviews")


const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: true }));
app.use(morgan("dev"));
// app.use('/contact', contactRouter);
app.use("/login", loginRouter);
app.use("/signup", signUpRouter);
app.use("/roommates", roommateRouter);
app.use("/listings", listingRouter);
app.use("/questionnaire", questionnaireRouter);
app.use("/reservation", reservationRouter);
app.use("/payment", paymentRouter);
app.use("/user", userRouter);
app.use("/accountVerification", accountVerificationRouter);
app.use("/photos", photosRouter);
app.use("/reviews", reviewRouter);

mongoose.connect(DATABASE_URI, {
  useCreateIndex: true,
  useFindAndModify: false, // flag needed to enable findOneAndUpdate
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../client/build/"));
  app.get("*", (_, res) => {
    res.sendFile(
      path.resolve(__dirname, "..", "client", "build", "index.html")
    );
  });
}

app.get("/", async (req, res) => {
  res.json("Server is running!");
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
