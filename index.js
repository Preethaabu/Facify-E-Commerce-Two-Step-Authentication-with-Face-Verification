const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); // Import the body-parser module

const app = express();
const data = require("./models/model");
const path = require("path");
app.use(express.static("views"));
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Connection with database
const mongo = "mongodb+srv://sowmi:12345@cluster0.qtnzql4.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("db connected");
    app.listen(3007, () => {
      console.log("server is ready");
    });
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/index.html"));
});

app.post("/submit", (req, res) => {
  const email = new data(req.body);
  email.save()
    .then(() => {
      console.log("Email stored in db");
      res.sendFile(path.join(__dirname, "/views/welcome.html"));
      
    })
    .catch((error) => {
      console.error("Error saving email:", error);
      res.status(500).send("Internal Server Error");
      
    });
});
  