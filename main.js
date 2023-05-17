import { executablePath} from "puppeteer";
import pluginStealth from "puppeteer-extra-plugin-stealth";
import puppeteer from "puppeteer-extra";

import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween.js"

dayjs.extend(isBetween)
puppeteer.use(pluginStealth())
const conquerLocket = async () => {
    const browser = await puppeteer.launch({headless: false, executablePath: executablePath()});
    const page = await browser.newPage();
    await page.setViewport({width: 1080, height: 1024});
    await page.setExtraHTTPHeaders({
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
        'upgrade-insecure-requests': '1',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en-US,en;q=0.9,en;q=0.8'
    });
    await page.evaluateOnNewDocument(() => {
        delete navigator.__proto__.webdriver;
    });
    await page.goto('https://google.com')
    await page.goto('https://coldplayinjakarta.com', {
        waitUntil: "domcontentloaded",
    });
    let is10Clock = false;

    while(!is10Clock) {
        if (dayjs().isBetween('2023-05-17T10:00', '2023-05-17T14:44')) {
            is10Clock = true;
        }
    }

    await page.reload()
    const [button] = await page.$x("//button[contains(., 'BUY BCA PRESALE TICKETS')]");
    if (button) {
        await button.click();
    }
}

conquerLocket()