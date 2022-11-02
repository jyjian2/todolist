const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use("view engine", "ejs");

app.get("/", function(req, res) {
  res.write("Connected");
  res.send();
});

app.listen(3000, function() {
  console.log("all good");
});
