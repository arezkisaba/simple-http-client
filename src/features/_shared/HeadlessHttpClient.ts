import puppeteer from 'puppeteer';
import he from 'he'; 
import { injectable } from 'tsyringe';
import { IHttpClient } from './contracts/IHttpClient';

@injectable()
export class HeadlessHttpClient implements IHttpClient {

    constructor() {
    }

    async getHtml(url: string): Promise<{ html: string; url: string }> {
        const maxRetries = 3;
        const seconds = 10;
        const timeout = seconds * 1000;
        
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
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
                        timeout: timeout
                    });

                    await page.waitForSelector('body');
                    const htmlContent = await page.content();
                    return {
                        html: he.decode(htmlContent),
                        url: url
                    };
                } finally {
                    await browser.close();
                }
            } catch (error) {
                console.log(`Attempt ${attempt} failed:`, error instanceof Error ? error.message : 'Unknown error');
                
                if (attempt === maxRetries) {
                    throw error;
                }
                
                await new Promise(resolve => setTimeout(resolve, attempt * 1000));
            }
        }
        
        throw new Error('All retry attempts failed');
    }
}
