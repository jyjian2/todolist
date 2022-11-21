const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");

const app = express();

const items = ["Clean house", "Web course", "Leetcode"];
let newItem = "";
const workItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extension:true}));
app.use(express.static("public"));

mongoose.connect("mongodb://120.0.0.7:27017/todolistDB");

app.get("/", function(req, res) {
  let dayValue = date.getDay();
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
