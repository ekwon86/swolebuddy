const puppeteer = require("puppeteer");
const config = require("./config.json");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(
    "https://www.thequadguy.com/features?bnc=1&rsn=noOb&fromProt=&lng="
  );
  await page.focus("#Sentry_email");
  await page.keyboard.type(config.testing.email);

  await page.focus("#Sentry_password");
  await page.keyboard.type(config.testing.password);

  await page.click("#Sentry_button");

  await page.waitForSelector("#folderNav");

  const linkHandlers = await page.$x("//a[contains(text(), 'THE DAILY PUMP')]");

  if (linkHandlers.length > 0) {
    console.log("Link found");
    await linkHandlers[0].click();

    await page.waitForSelector("#content");

    let bodyPart = await page.evaluate(() => {
      return document.querySelector(".sqs-block-content > h1").textContent;
    });

    let workout = await page.evaluate(() => {
      return document.querySelector(".sqs-block-content > p:nth-child(2)")
        .textContent;
    });

    console.log(bodyPart + "\n" + workout);

    // await page.screenshot({ path: "example.png", fullPage: true });
  } else {
    throw new Error("Link not found");
  }

  await browser.close();
})();
