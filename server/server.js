const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3001;

//setting up mongoose
mongoose.connect("mongodb://localhost/votingDB");
const Schema = mongoose.Schema;

//creating user schema
const userSchema = new Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
});
const User = mongoose.model("User", userSchema);

//creating polls schema
const pollScahema = new Schema({
  creator: { type: String },
  poll_title: { type: String },
  option1: { type: String },
  option2: { type: String },
  option3: { type: String },
  option4: { type: String },
  option1_votes: { type: Number },
  option2_votes: { type: Number },
  option3_votes: { type: Number },
  option4_votes: { type: Number },
  data: { type: Date, default: Date.now },
});
const Poll = mongoose.model("Poll", pollScahema);

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
      if (result.length > 0) {
        // console.log(result);
        // console.log("Login successful");
        res.send("Login successful");
      } else {
        res.send("User not found");
      }
    }
  });
});

app.post("/generatePoll", function (req, res) {
  console.log(req.body.poll_title);
  const pollData = {
    creator: req.body.username,
    poll_title: req.body.poll_title,
    option1: req.body.option1,
    option2: req.body.option2,
    option3: req.body.option3,
    option4: req.body.option4,
    option1_votes: 0,
    option2_votes: 0,
    option3_votes: 0,
    option4_votes: 0,
  };

  const newPoll = new Poll(pollData);
  newPoll.save();

  console.log("Poll with data: " + JSON.stringify(pollData));
  res.send("Poll created");
});

app.get("/getPolls", function (req, res) {
  Poll.find(function (err, result) {
    if (err) {
      res.send({ message: "Some error occured" });
    } else {
      if (result) {
        res.send(result);
      } else {
        res.send({ message: "No polls available" });
      }
    }
  });
});

app.get("/", function (req, res) {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});
