const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3001;

//setting up mongodb
// const uri = "";
// const client = new MongoClient(uri);
// const database = null;
// const usersCollection = null;
// client.connect();
// database = client.db("votingDB");
// usersCollection = database.collection("users");

//setting up mongoose
mongoose.connect("mongodb://localhost/votingDB");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
});
const User = mongoose.model("User", userSchema);

//setting up body bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  express.static(path.resolve(__dirname, "../client/build", "index.html"))
);

app.listen(PORT, function () {
  console.log("Server started at port 3001");
});

app.get("/test", function (res, res) {
  const data = {
    message: "Message from server",
  };
  res.json(data);
});

app.post("/registerUser", function (req, res) {
  console.log("Registering user");
  // console.log("Name:" + req.body.name);
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const newUser = new User({ name: name, email: email, password: password });
  newUser.save();
  console.log("User Resistered: " + newUser);
  res.send("Post request accepted");
});

app.post("/loginUser", function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  console.log(
    "Logging in --------- Email: " + email + " Password: " + password
  );
  User.find({ email: email, password: password }, function (err, result) {
    if (err) {
      res.send("Login Error");
    } else {
      if (result.length>0) {
        // console.log(result);
        // console.log("Login successful");
        res.send("Login successful");
      } else {
        res.send("User not found");
      }
    }
  });
});

app.get("/", function (req, res) {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});
