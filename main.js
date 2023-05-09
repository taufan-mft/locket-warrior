import puppeteer from "puppeteer";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween.js"

dayjs.extend(isBetween)

const conquerLocket = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.setViewport({width: 1080, height: 1024});
    await page.goto('https://fujiikazeinjakarta.com/');
    let is10Clock = false;

    while(!is10Clock) {
        if (dayjs().isBetween('2023-05-09T14:32', '2023-05-09T14:44')) {
            is10Clock = true;
        }
    }

    await page.reload()
    const [button] = await page.$x("//button[contains(., 'BUY TICKETS')]");
    if (button) {
        await button.click();
    }

}

conquerLocket()