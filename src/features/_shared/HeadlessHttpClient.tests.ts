import 'reflect-metadata';
import { HeadlessHttpClient } from './HeadlessHttpClient';

describe('HeadlessHttpClient', () => {

    test("value of 'value1' must be 'not falsy'", async () => {
        const basicHttpClient = new HeadlessHttpClient();
        const value1 = await basicHttpClient.getHtml("https://www.google.com/");
        expect(value1).not.toBeFalsy();
    });
});

