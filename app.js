const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

let newItem = "";
const workItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extension:true}));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/todolistDB");

const itemSchema = {
  name: String
};

const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({
  name: "Welcome to your todolist!"
});

const item2 = new Item({
  name: "Hit the + button to add a new item."
});

const item3 = new Item({
  name: "<-- Hit this to delete an item."
});

const defaultItems = [item1, item2, item3];

app.get("/", function(req, res) {

  Item.find(function(err, foundItems) {

    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, function(err){
        if (err) {
          console.log(err);
        } else {
          console.log("Save default items to DB");
        }
      });
      res.redirect("/");
    } else {
      res.render("list", {listTitle:"Today", newListItems: foundItems})
    }

  })

});

app.post("/", function(req, res) {
  newItem = req.body.newItem;

  const userAddItem = new Item({
    name: newItem
  });
  userAddItem.save();

  res.redirect("/");
})

app.post("/delete", function(req, res){
  console.log(req.body.checkbox);
})

app.get("/work", function(req, res) {
  res.render("list", {listTitle: "Work", newListItems: workItems});
})

app.get("/About", function(req, res){
  res.render("about");
})

app.listen(3000, function() {
  console.log("all good");
});
