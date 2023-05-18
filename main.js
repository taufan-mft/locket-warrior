import {executablePath} from "puppeteer";
import pluginStealth from "puppeteer-extra-plugin-stealth";
import puppeteer from "puppeteer-extra";

import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween.js"

dayjs.extend(isBetween)
puppeteer.use(pluginStealth())

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}

function generateRandom() {
    const min = 650
    const max = 1300
    // find diff
    let difference = max - min;

    // generate random number
    let rand = Math.random();

    // multiply with difference
    rand = Math.floor(rand * difference);

    // add with min value
    rand = rand + min;

    return rand;
}

const conquerLocket = async () => {
    const browser = await puppeteer.launch({headless: false, executablePath: executablePath()});
    const page = await browser.newPage();
    let url = 'coldplay';
    await page.setViewport({width: 1728, height: 1117});
    await page.setExtraHTTPHeaders({
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/112.0',
        'upgrade-insecure-requests': '1',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en-US,en;q=0.9,en;q=0.8'
    });
    await page.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/112.0")
    await page.evaluateOnNewDocument(() => {
        delete navigator.__proto__.webdriver;
    });
    await page.goto('https://google.com')
    await delay(600);
    await page.goto('https://coldplayinjakarta.com', {
        waitUntil: "domcontentloaded",
    });
    let is10Clock = false;
    let tania = 1;
    while(!is10Clock) {
        if (dayjs().isBetween('2023-05-19T10:00', '2023-05-19T14:44')) {
            is10Clock = true;
        }
        tania += 1;
        console.log('tania masih jalan', tania);
        await delay(500);
    }

    while (url.includes('coldplay')) {
        await page.goto('https://coldplayinjakarta.com')
        const [button] = await page.$x("//button[contains(., 'BUY PUBLIC ON-SALE TICKETS')]");
        if (button) {
            await button.scrollIntoView();
            await delay(200);
            await button.click();
        }
        await delay(generateRandom());
        url = page.url();
        console.log(page.url());
    }
}

conquerLocket()