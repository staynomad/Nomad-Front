var bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const cors = require('cors');
const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');

const { DATABASE_URI, environment } = require("./config");
const loginRouter = require('./routes/login');
const usersRouter = require('./routes/users');
const { requireUserAuth } = require('./auth');

const app = express();
app.use(bodyParser.json())
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(cors({ origin: true }));
app.use('/login', loginRouter);
app.use('/signup', usersRouter);

mongoose.connect(DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.get('/', requireUserAuth, (req, res, next) => {
  res.json('App is running...')
});

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
