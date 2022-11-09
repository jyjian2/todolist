const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items = ["Clean house", "Web course", "Leetcode"];
let newItem = "";
let workItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extension:true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  const today = new Date();
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric"};
  let dayValue = today.toLocaleDateString("en-US", options);

  res.render("list", {listTitle:dayValue, userAddItems: items})

});

app.post("/", function(req, res) {
  newItem = req.body.newItem;
  if (req.body.button === "Work") {
    workItems.push(newItem);
    res.redirect("/Work");
  } else {
    items.push(newItem);
    res.redirect("/");
  }
})

app.get("/work", function(req, res) {
  res.render("list", {listTitle: "Work", userAddItems: workItems});
})

app.get("/About", function(req, res){
  res.render("about");
})

app.listen(3000, function() {
  console.log("all good");
});
