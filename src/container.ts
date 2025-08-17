import 'reflect-metadata';
import { container } from 'tsyringe';
import IHttpClient from './features/_shared/contracts/IHttpClient';
import { HeadlessHttpClient } from './features/_shared/HeadlessHttpClient';
import ICacheService from './features/_shared/contracts/ICacheService';
import { InMemoryCacheService } from './features/_shared/services/InMemoryCacheService';

const TOKENS = {
    IHttpClient: 'IHttpClient',
    ICacheService: 'ICacheService',
} as const;

container.register<IHttpClient>(TOKENS.IHttpClient, {
    useFactory: () => {
        return new HeadlessHttpClient();
    }
});

container.registerSingleton<ICacheService>(TOKENS.ICacheService, InMemoryCacheService);

export { container, TOKENS };