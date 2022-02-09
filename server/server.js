const express = require("express");
const app = express();
const path=require("path");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3001;

//setting up body bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname,"../client/build","index.html")));

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
  console.log("Name:" + req.body.name);
  res.send("Post request accepted");
});

app.get("/",function(req,res){
  res.sendFile(path.resolve(__dirname,"../client/build","index.html"));
});
