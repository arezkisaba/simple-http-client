import ICacheService from '../contracts/ICacheService';

interface CacheItem<T> {
    value: T;
    expiresAt: number | null;
}

export class InMemoryCacheService implements ICacheService {
    private cache: Map<string, CacheItem<any>> = new Map();

    public async get<T>(key: string): Promise<T | null> {
        const item = this.cache.get(key);
        if (!item) return null;
        
        if (item.expiresAt && item.expiresAt < Date.now()) {
            this.cache.delete(key);
            return null;
        }
        
        return item.value as T;
    }

    public async set<T>(key: string, value: T, ttlSeconds?: number): Promise<void> {
        const expiresAt = ttlSeconds ? Date.now() + (ttlSeconds * 1000) : null;
        this.cache.set(key, { value, expiresAt });
    }

    public async delete(key: string): Promise<void> {
        this.cache.delete(key);
    }

    public async has(key: string): Promise<boolean> {
        if (!this.cache.has(key)) return false;
        
        const item = this.cache.get(key);
        if (item?.expiresAt && item.expiresAt < Date.now()) {
            this.cache.delete(key);
            return false;
        }
        
        return true;
    }
}
