const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res) {
  const today = new Date();
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric"};
  var dayValue = today.toLocaleDateString("en-US", options);

  res.render("list", {
    passDay: dayValue
  })

});

app.listen(3000, function() {
  console.log("all good");
});
