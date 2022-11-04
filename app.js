const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var items = ["Clean house", "Web course", "Leetcode"];
var newItem = "";

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extension:true}));

app.get("/", function(req, res) {
  const today = new Date();
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric"};
  var dayValue = today.toLocaleDateString("en-US", options);

  res.render("list", {passDay:dayValue, userAddItems: items})

});

app.post("/", function(req, res) {
  newItem = req.body.newItem;
  items.push(newItem);
  res.redirect("/");
})
app.listen(3000, function() {
  console.log("all good");
});
