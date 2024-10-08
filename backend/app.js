var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var eventsRouter = require('./routes/events');
var tutorsRouter = require('./routes/tutor');
var shopRouter = require('./routes/shop');
var postRouter = require('./routes/post');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use("/uploads", express.static('uploads'));

app.use('/api/', indexRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/events', eventsRouter);
app.use('/api/tutors', tutorsRouter);
app.use('/api/shops', shopRouter);
app.use('/api/forum', postRouter);

module.exports = app;
