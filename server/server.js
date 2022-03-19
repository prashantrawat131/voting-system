const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3001;

// setting up mongoose
mongoose.connect("mongodb://localhost/votingDB");
const Schema = mongoose.Schema;

// creating user schema
const voteSchema = new Schema({
  poll_id: { type: String },
  voter_email: { type: String },
  option_selected: { type: Number, default: -1 },
});
const Vote = mongoose.model("Vote", voteSchema);

const userSchema = new Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
});
const User = mongoose.model("User", userSchema);

// creating polls schema
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
  date: { type: Date, default: Date.now },
});
const Poll = mongoose.model("Poll", pollScahema);

//setting up body bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, "../client/build")));

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

  User.findOne({ email: email }, function (err, result) {
    if (err) {
      res.send({ message: "Some error occurred while registering." });
    } else {
      if (result) {
        res.send({ message: "Email already present" });
      } else {
        const newUser = new User({
          name: name,
          email: email,
          password: password,
        });
        newUser.save();
        console.log("User Registered: " + newUser);
        res.send({ message: "Registered successfully" });
      }
    }
  });
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

  // console.log("Poll with data: " + JSON.stringify(pollData));
  res.send("Poll created");
});

app.get("/getPolls", function (req, res) {
  Poll.find(function (err, result) {
    if (err) {
      res.send({ message: "Some error occured" });
    } else {
      if (result) {
        // console.log("Sending: " + result);
        res.send(result);
      } else {
        res.send({ message: "No polls available" });
      }
    }
  });
});

app.post("/vote", function (req, res) {
  const { voter_email, poll_id, optionNumber, lastSelectedOptionNumber } =
    req.body;

  Poll.findById(poll_id, function (err, poll) {
    if (err) {
      res.send({ message: "Voting error" });
    } else {
      var update = {
        option1_votes:
          optionNumber === 1 ? poll.option1_votes + 1 : poll.option1_votes,
        option2_votes:
          optionNumber === 2 ? poll.option2_votes + 1 : poll.option2_votes,
        option3_votes:
          optionNumber === 3 ? poll.option3_votes + 1 : poll.option3_votes,
        option4_votes:
          optionNumber === 4 ? poll.option4_votes + 1 : poll.option4_votes,
      };

      var update = {
        option1_votes:
          lastSelectedOptionNumber === 1
            ? update.option1_votes - 1
            : update.option1_votes,
        option2_votes:
          lastSelectedOptionNumber === 2
            ? update.option2_votes - 1
            : update.option2_votes,
        option3_votes:
          lastSelectedOptionNumber === 3
            ? update.option3_votes - 1
            : update.option3_votes,
        option4_votes:
          lastSelectedOptionNumber === 4
            ? update.option4_votes - 1
            : update.option4_votes,
      };

      // if (optionNumber === 1) {
      //   update = { option1_votes: poll.option1_votes + 1 };
      // } else if (optionNumber === 2) {
      //   update = { option2_votes: poll.option2_votes + 1 };
      // } else if (optionNumber === 3) {
      //   update = { option3_votes: poll.option3_votes + 1 };
      // } else {
      //   update = { option4_votes: poll.option4_votes + 1 };
      // }

      //updating poll
      Poll.findByIdAndUpdate(
        poll._id,
        update,
        { new: true },
        function (err, doc, result) {
          if (err) {
            // console.log("Poll update unsuccessful\rErr:" + err);
          } else {
            // console.log("Poll update successfull");
            // console.log("Doc: " + doc);
          }
        }
      );

      //deleting previous vote
      try {
        Vote.findOneAndDelete(
          {
            voter_email: voter_email,
            poll_id: poll_id,
          },
          function (err) {
            if (err) {
              console.log("Error deleting vote: " + err);
            } else {
              console.log("Vote deleted successfully");
            }
          }
        );
      } catch (e) {}

      //inserting new vote
      const newVote = new Vote({
        voter_email: voter_email,
        poll_id: poll_id,
        option_selected: optionNumber,
      });
      newVote.save();
      res.send({ message: "Voted successfully" });
    }
  });
});

app.get("/getSelected", function (req, res) {
  const poll_id = req.query.poll_id;
  const voter_email = req.query.voter_email;

  // console.log("" + poll_id + "\t" + voter_email);

  Vote.findOne(
    { voter_email: voter_email, poll_id: poll_id },
    function (err, result) {
      if (err) {
        res.send({ optionSelected: -1 });
      } else {
        // console.log(JSON.stringify(result));
        if (result) {
          res.send({ optionSelected: result.option_selected });
        } else {
          res.send({ optionSelected: -1 });
        }
      }
    }
  );
});

app.get("/search", function (req, res) {
  const searchInput = req.query.searchInput;
  User.find({ name: searchInput }, function (err, result) {
    if (err) {
      res.send({ message: "Some error occurred" });
    } else {
      if (result) {
        res.send(result);
      } else {
        res.send({ message: "User not found" });
      }
    }
  });
});

app.get("/getUserPolls", function (req, res) {
  const personEmail = req.query.personEmail;
  Poll.find({ creator: personEmail }, function (err, result) {
    if (err) {
      res.send({ message: "Some error occurred" });
    } else {
      if (result) {
        res.send(result);
      } else {
        res.send("No polls found");
      }
    }
  });
});

app.get("/getPoll", function (req, res) {
  const poll_id = req.query.poll_id;
  console.log("Poll id:" + poll_id);
  Poll.findById(poll_id, function (err, poll) {
    if (err || !poll) {
      res.send({ message: "Error" });
    } else {
      res.send(poll);
    }
  });
});

app.get("/", function (req, res) {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});
