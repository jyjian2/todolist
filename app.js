const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res) {
  var today = new Date();
  var todaysWeekDay = today.getDay();
  var weekdayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  res.render("list", {passDay: weekdayArray[todaysWeekDay]});
});

app.listen(3000, function() {
  console.log("all good");
});
