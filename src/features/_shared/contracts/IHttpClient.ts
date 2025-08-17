export default interface IHttpClient {
    getHtml(url: string): Promise<string>;
}
