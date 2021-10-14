const puppeteer = require('puppeteer');
let browserWSEndpoint = null;

async function getBrowser() {
    if (browserWSEndpoint) {
        try {
            return await puppeteer.connect({browserWSEndpoint});
        } catch (e) {
            browserWSEndpoint = null;
        }
    }

    if (!browserWSEndpoint) {
        const browser = await puppeteer.launch({
            headless: true,
            defaultViewport: {
                height: 720,
                width: 1280
            },
            ignoreHTTPSErrors: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox'
            ]
        });
        browserWSEndpoint = browser.wsEndpoint();
        return browser
    }
}

async function SSR(renderUrl) {
    const browser = await getBrowser()
    const page = await browser.newPage();

    // 1. 监听网络请求
    await page.setRequestInterception(true);

    page.on('request', req => {
        // 2. 忽略不必要的请求，如图片，视频样式等等
        const whitelist = ['document', 'script', 'xhr', 'fetch'];
        if (!whitelist.includes(req.resourceType())) {
            return req.abort();
        }

        // 3. 其它请求正常继续
        req.continue();
    });

    await page.goto(renderUrl, {waitUntil: 'networkidle0'});
    const html = await page.content();
    await page.close()

    return {
        html
    };
}

module.exports = {SSR}