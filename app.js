var express = require("express");
var path = require("path");
var createError = require("http-errors");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var bodyParser = require("body-parser");
var cors = require("cors");
var logger = require("morgan");
var passport = require("passport");
var indexRouter = require("./routes/index");
var announce = require("./routes/announce");
var review = require("./routes/review");
var communication = require("./routes/communication");
var login = require("./routes/login");
var generalLogin = require("./routes/generalLogin");
var signup = require("./routes/signup");
var auth = require("./routes/auth");
var app = express();
var corsOptions = {
  origin: "https://5fbb97296307b89fc0704d36--molab.netlify.app", // 허용되는 Origin
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cookieParser("keyboard cat"));
<<<<<<< HEAD
app.enable('trust proxy');
=======
app.enable('trust proxy'); 
>>>>>>> cbf8e5a6e12c1af022673c33d834ce3a266d84f1
app.use(
  session({ secret: "keyboard cat", resave: true, proxy: true, saveUninitialized: false })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors(corsOptions));

app.use("/", indexRouter);
app.use("/api/announce", announce);
app.use("/review", review);
app.use("/api/communication", communication);
app.use("/api/login", login);
app.use("/login", login);
app.use("/api/auth", auth);
app.use("/api/signup", signup);
app.use("/auth", auth);
app.use("/api/another_login",generalLogin);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

module.exports = app;
