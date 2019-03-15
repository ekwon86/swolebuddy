const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cron = require("node-cron");
const workouts = require("./routes/api/workouts");
const puppeteer = require("puppeteer");
const devices = require("puppeteer/DeviceDescriptors");
const iPhone = devices["iPhone X"];
const config = require("./config.json");
const dateFormat = require("dateformat");
const cors = require("cors");

// Bring in Workout Model
const Workout = require("./models/Workout");

const app = express();

app.use(cors());

// cron.schedule(
//   "0 12 * * *",
//   () => {
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setViewport({ width: 1280, height: 800 });
  await page.emulate(iPhone);
  await page.goto(
    "https://www.thequadguy.com/features?bnc=1&rsn=noOb&fromProt=&lng="
  );
  await page.focus("#Sentry_email");
  await page.keyboard.type(config.testing.email);

  await page.focus("#Sentry_password");
  await page.keyboard.type(config.testing.password);

  await page.click("#Sentry_button");

  await page.waitForSelector("#folderNav");

  await page.goto("https://www.thequadguy.com/dailypump");

  await page.waitForSelector("#content");

  let date = dateFormat(new Date(), "mm-dd-yyyy");

  let bodyPart = await page.evaluate(() => {
    return document.querySelector(".sqs-block-content > h1").textContent;
  });

  let formattedBodyPart = bodyPart.replace(/\//g, ", ");

  let workout = await page.evaluate(() => {
    return document.querySelector(".sqs-block-content > p:nth-child(2)")
      .innerHTML;
  });

  let imgPath = "./screenshots/" + date + " - " + formattedBodyPart + ".png";

  const workoutContent = await page.$(".sqs-block-content > :nth-child(2)");

  await workoutContent.screenshot({ path: imgPath });

  const newWorkout = new Workout({
    bodypart: bodyPart,
    workout: workout,
    imgUrl: imgPath,
    date: date
  });

  await newWorkout.save(function(err, workout) {
    if (err) return console.error(err);
    console.log(workout.bodypart + " saved to the workout collection");
  });

  await await browser.close();
})();
//   },
//   {
//     scheduled: true,
//     timezone: "America/Los_Angeles"
//   }
// );

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
