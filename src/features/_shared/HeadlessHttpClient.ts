import puppeteer from 'puppeteer';
import he from 'he'; 
import IHttpClient from './contracts/IHttpClient';
import { injectable } from 'tsyringe';

@injectable()
export class HeadlessHttpClient implements IHttpClient {

    constructor() {
    }

    async getHtml(url: string): Promise<string> {
        const browser = await puppeteer.launch({
            executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
            headless: true,
            args: [
                '--no-sandbox',  // Required in Docker for security reasons
                '--disable-setuid-sandbox',  // Disable the setuid sandbox
                '--disable-gpu',  // Disable GPU (usually not needed in headless mode)
                '--disable-dev-shm-usage',  // Prevent /dev/shm size issues in Docker
                '--no-zygote', // Disable zygote process to avoid issues in some environments
                '--single-process',  // To avoid some Docker-related issues
                '--disable-background-timer-throttling',
                '--disable-backgrounding-occluded-windows',
                '--disable-renderer-backgrounding',
                '--disable-features=TranslateUI',
                '--disable-ipc-flooding-protection',
                '--disable-extensions',
                '--disable-default-apps',
                '--disable-web-security'
            ],
            ignoreDefaultArgs: ['--disable-extensions'],
            timeout: 30000,
            handleSIGINT: false,
            handleSIGTERM: false,
            handleSIGHUP: false
        });

        try {
            const page = await browser.newPage();
            await page.goto(url, {
                waitUntil: 'domcontentloaded',
                timeout: 20000
            });

            await page.waitForSelector('body');
            const htmlContent = await page.content();
            return he.decode(htmlContent);
        } finally {
            await browser.close();
        }
    }
}
