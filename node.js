const express = require('express');
const puppeteer = require('puppeteer');
var cors = require('cors');
const app = express();

app.use(cors());

app.get('/', async function (req, res) {
    res.send('Hi');
});

app.get('/getData', async function (req, res) {
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto(
            'https://blob.sportslottery.com.tw/apidata/Pre/ListByLeague/10300.json?1669452205000'
        );

        // Type into search box.
        // await page.type('.devsite-search-field', 'Headless Chrome');

        // Wait for suggest overlay to appear and click "show all results".
        // const allResultsSelector = '.devsite-suggest-all-results';
        // await page.waitForSelector(allResultsSelector);
        // await page.click(allResultsSelector);

        // Wait for the results page to load and display the results.
        // const resultsSelector = '.gsc-results .gs-title';
        // await page.waitForSelector(resultsSelector);

        // Extract the results from the page.
        // const links = await page.evaluate((resultsSelector) => {
        //     return [...document.querySelectorAll(resultsSelector)].map(
        //         (anchor) => {
        //             const title = anchor.textContent.split('|')[0].trim();
        //             return `${title} - ${anchor.href}`;
        //         }
        //     );
        // }, resultsSelector);

        // Print all the files.
        // console.log(links.join('++++++++++'));

        await page.content();

        let data = await page.evaluate(() => {
            return JSON.parse(document.querySelector('body').innerText);
        });

        console.log('innerText now contains the JSON');
        // console.log(innerText);

        console.log(data);

        await browser.close();
        res.send(data);
    })();
    // console.log(response);
});

app.listen(3001);
