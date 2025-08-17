import he from 'he'; 
import { injectable } from 'tsyringe';
import { HttpClientResponse, IHttpClient } from './contracts/IHttpClient';

@injectable()
export class BasicHttpClient implements IHttpClient {

    constructor() {
    }

    async getHtml(url: string): Promise<HttpClientResponse> {
        const response = await fetch(url, {
            headers: {
                method: 'GET',
                redirect: 'follow',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const htmlContent = await response.text();
        const decodedHTML = he.decode(htmlContent);
        return {
            html: decodedHTML,
            url: response.url
        };
    }
}
