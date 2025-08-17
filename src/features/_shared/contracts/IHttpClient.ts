export interface IHttpClient {
    getHtml(url: string): Promise<HttpClientResponse>;
}

export interface HttpClientResponse {
    html: string;
    url: string;
}