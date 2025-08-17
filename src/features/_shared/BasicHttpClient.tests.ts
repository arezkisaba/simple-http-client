import 'reflect-metadata';
import { BasicHttpClient } from './BasicHttpClient';

describe('BasicHttpClient', () => {

    test("value of 'value1' must be 'not falsy'", async () => {
        const basicHttpClient = new BasicHttpClient();
        const value1 = await basicHttpClient.getHtml("https://www.google.com/");
        expect(value1).not.toBeFalsy();
    });
});

