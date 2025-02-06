/*eslint no-console: 0*/
"use strict";
const express = require("express");
const passport = require("passport");
const xsenv = require("@sap/xsenv");
const JWTStrategy = require("@sap/xssec").JWTStrategy;
const bodyParser = require("body-parser");
const routes = require("./service/index");
//crear el servidor
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV != "production") {
  xsenv.loadEnv(__dirname + "/default-env.json");
}

const services = xsenv.getServices({ uaa: { tag: 'xsuaa' } });
passport.use(new JWTStrategy(services.uaa));

app.use(passport.initialize());
app.use(passport.authenticate("JWT", { session: false }));

app.use("/", routes());

const port = process.env.PORT || 3400;

app.listen(port, function () {
  console.log("app listening on port " + port);
});
