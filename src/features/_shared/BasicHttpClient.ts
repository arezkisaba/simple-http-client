import he from 'he'; 
import IHttpClient from './contracts/IHttpClient';
import { injectable } from 'tsyringe';

@injectable()
export class BasicHttpClient implements IHttpClient {

    constructor() {
    }

    async getHtml(url: string): Promise<string> {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const htmlContent = await response.text();
        const decodedHTML = he.decode(htmlContent);
        return decodedHTML;
    }
}
