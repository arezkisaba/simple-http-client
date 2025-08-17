import 'reflect-metadata';
import { InMemoryCacheService } from './InMemoryCacheService';

describe('InMemoryCacheService', () => {

    test("value of 'key1' must be 'null'", async () => {
        const cacheService = new InMemoryCacheService();
        const value = await cacheService.get("key1");
        expect(value).toBe(null);
    });

    test("value of 'key1' must be 'value1'", async () => {
        const cacheService = new InMemoryCacheService();
        await cacheService.set("key1", "value1", 60);
        const value = await cacheService.get("key1");
        expect(value).toBe("value1");
    });

    test("value of 'key1' must be 'value1'", async () => {
        const cacheService = new InMemoryCacheService();
        await cacheService.set("key1", "value1", 60);
        const value = await cacheService.get("key1");
        expect(value).toBe("value1");
        await cacheService.delete("key1");
        const hasValue = await cacheService.has("key1");
        expect(hasValue).toBe(false);
    });
});

