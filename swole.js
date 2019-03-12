const puppeteer = require("puppeteer");
const devices = require("puppeteer/DeviceDescriptors");
const iPhone = devices["iPhone X"];
const config = require("./config.json");
const dateFormat = require("dateformat");

const getWorkout = async () => {
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

  let formattedBodyPart = bodyPart.replace(/\//g, ",");

  let workout = await page.evaluate(() => {
    return document.querySelector(".sqs-block-content > p:nth-child(2)")
      .innerHTML;
  });

  let imgPath = "./screenshots/" + date + "-" + formattedBodyPart + ".png";

  const workoutContent = await page.$(".sqs-block-content > :nth-child(2)");

  await workoutContent.screenshot({ path: imgPath });

  await browser.close();
};

module.exports = { getWorkout };
