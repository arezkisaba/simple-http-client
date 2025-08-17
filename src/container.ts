import 'reflect-metadata';
import { container } from 'tsyringe';
import ICacheService from './features/_shared/contracts/ICacheService';
import { InMemoryCacheService } from './features/_shared/services/InMemoryCacheService';

const TOKENS = {
    ICacheService: 'ICacheService',
} as const;

container.registerSingleton<ICacheService>(TOKENS.ICacheService, InMemoryCacheService);

export { container, TOKENS };