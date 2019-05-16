const createError  = require('http-errors');
const express      = require('express');
const cookieParser = require('cookie-parser');
const logger       = require('morgan');
const cors         = require("cors");
const session      = require("express-session")
const moment       = require("moment")
const PORT         = process.env.PORT || 8888;



const apiRouter = require('./routes/api');
const usersRouter = require('./routes/users');
const authRouter = require("./routes/auth")

require("dotenv").config();
require("./db/db")

console.log(PORT)

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));


const corsOptions = {
  origin: "https://leagueofesportlegends.herokuapp.com",
  credentials: true,
  optionsSuccessStatus: 200 
}

app.use(cors(corsOptions));


app.use('/api', apiRouter);
app.use('/users', usersRouter);
app.use("/login", authRouter)

// catch 404 and forward to error handler
app.use((req, res, next)=>{
  next(createError(404));
});

// error handler
// app.use((err, req, res, next) =>{
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
