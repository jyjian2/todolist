const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

let newItem = "";
const workItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extension:true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-jiayi:real.ancient.safari_119036J@cluster0.2icmqht.mongodb.net/todolistDB");

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

const listSchema = {
  name: String,
  // the item document is associate with list document
  items: [itemSchema]
};

const List = mongoose.model("List", listSchema);

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

// custom route
app.get("/:customListName", function(req, res){
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({name: customListName}, function(err, foundList){
    console.log(err, foundList);
    if (err) {
      console.log(err);
    } else {
      if (!foundList) {
        // create a list document named by customListName
        const list = new List({
          name: customListName,
          items: defaultItems
        });
        list.save();
        res.redirect("/" + customListName);
      } else {
        res.render("list", {listTitle:foundList.name, newListItems:foundList.items})
      }
    }
  })
})

app.post("/", function(req, res) {
  newItem = req.body.newItem;
  const listName = req.body.list;

  const userAddItem = new Item({
    name: newItem
  });

  if (listName === "Today") {
    userAddItem.save();
    res.redirect("/");
  } else {
    List.findOne({name: listName}, function(err, foundList){
      console.log(foundList);
      if (err) {
        console.log(err);
      } else {
        foundList.items.push(userAddItem);
        foundList.save();
        res.redirect("/" + listName);
      }
    });
  }
});

app.post("/delete", function(req, res){
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === "Today") {
    Item.deleteOne({_id: checkedItemId}, function(err, res){
      if (err) {
        console.log(err);
      }
    });
    res.redirect("/");
  } else {
    List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}, function(err, foundList){
      if (err) {
        console.log(err);
      } else {
        res.redirect("/" + listName);
      }
    })
  }
});

app.get("/work", function(req, res) {
  res.render("list", {listTitle: "Work", newListItems: workItems});
})

app.get("/About", function(req, res){
  res.render("about");
})

app.listen(3000, function() {
  console.log("all good");
});
