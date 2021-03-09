require("dotenv").config();
const puppeteer = require("puppeteer");
const fs = require("fs");

const writeJson = (data) => {
  fs.writeFileSync("out.json", JSON.stringify(data));
};

const parseElement = async (element) => {
  const name = await element.$eval("div > h4", (e) => e.textContent.trim());
  const dateString = await element.$eval("div > span.t-black", (e) => e.textContent.trim());
  const type = await element.$eval("div:nth-child(3)", (e) => e.textContent.trim());
  const attendantCountString = await element.$eval("div > span.t-black--light", (e) => e.textContent.trim());
  const attendantCount = attendantCountString.replace(/[^0-9]/g, "");
  return {
    name,
    dateString,
    type,
    attendantCount,
  };
};

const scrapeEvents = async (companyLinkedinUrl, cookies) => {
  if (!companyLinkedinUrl.includes("https://www.linkedin.com/company/")) return writeJson({ errorMessage: "Invalid company url." });

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setCookie(...cookies);

  try {
    await page.goto(`${companyLinkedinUrl}/events`, { waitUntil: "domcontentloaded" });

    const eventElements = await page.$$(".org-event-card__event-name-container");

    let events = [];

    for await (element of eventElements) {
      events.push(await parseElement(element));
    }
    await browser.close();
    writeJson(events);
  } catch (error) {
    console.log(error);
    await browser.close();
  }
};

module.exports = scrapeEvents;
