# linkedin-company-events-scraper

A Node.js scraper using Puppeteer that can extract basic information about a specific company's events from LinkedIn.

## Set up

Set an environment variable named `LI_AT` in a `.env` file inside the project to the value of LinkedIn's `li_at` cookie.

To find this value:
* Open a LinkedIn page in a tab on a browser where you're logged in
* Open the Developer Tools
* Go into the "Application" tab, then select "Cookies" in the sidebar
* Copy and paste the value of the `li_at` cookie into the `.env` file

And of course, run `npm install` to install all the dependencies after cloning the repo.

## Usage

In `index.js` specify the link to the company's LinkedIn page e.g. `"https://www.linkedin.com/company/swapcard/"`

Run the script with `node index.js`. If everything works as expected, you should have a file `out.json` that contains the information about the events.
