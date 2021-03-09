const scrapeEvents = require("./scraper");

const companyLinkedinUrl = "https://www.linkedin.com/company/swapcard";

const cookies = [{ name: "li_at", value: process.env.LI_AT, domain: ".www.linkedin.com" }];

scrapeEvents(companyLinkedinUrl, cookies);
