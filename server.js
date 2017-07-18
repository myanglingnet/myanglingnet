// ============================================
// SETUP
// ============================================
// Express
var session = require("express-session");
var express = require("express");
var app = express();

// Port
var port = process.env.PORT || 8080;

// Database
var configDB = require("./config/database.js");
var mongoose = require("mongoose");

// Middleware
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var flash = require("connect-flash");
var morgan = require("morgan");
var passport = require("passport");
var serveStatic = require("serve-static");

// ============================================
// CONFIGURATION
// ============================================
// Database
mongoose.connect(configDB.url);

// Passport Authentication
require("./config/passport")(passport);

// Marko
require("marko/node-require").install();
require("marko/express");

// Express Setup
app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("./static", serveStatic(__dirname + "./static"));

// Passport Setup
app.use(session({
    secret: "ilovescotchscotchyscotchscotch",
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// ============================================
// ROUTES
// ============================================
require("./routing/routes.js")(app, passport);

// ============================================
// LAUNCH
// ============================================
app.listen(port);
console.log("Application Started on Port: " + port);