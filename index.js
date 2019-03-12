const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cron = require("node-cron");
const swole = require("./swole");
const workouts = require("./routes/api/workouts");

const app = express();

// cron.schedule(
// "0 12 * * *",
// () => {
// swole.getWorkout();
// },
// {
// scheduled: true,
// timezone: "America/Los_Angeles"
// }
// );

console.log(swole.getWorkout());

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Use routes
app.use("/api/workouts", workouts);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port: ${port}`));
