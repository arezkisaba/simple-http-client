import crypto from 'crypto';
import { Router, Request, Response } from 'express';
import { container } from 'tsyringe';
import { TOKENS } from '../../../container';
import { GetHtmlCommand } from '../commands/GetHtmlCommand';
import { GetHtmlResponse } from '../responses/GetHtmlResponse';
import { BasicHttpClient } from '../../_shared/BasicHttpClient';
import { HeadlessHttpClient } from '../../_shared/HeadlessHttpClient';
import ICacheService from '../../_shared/contracts/ICacheService';

const DEFAULT_CACHE_TTL = 3600;
const router = Router();

/**
 * @swagger
 * /api/http-client:
 *   post:
 *     summary: Get HTML content from a URL
 *     description: Fetches the HTML content of a given URL using a headless browser.
 *     parameters:
 *       - in: body
 *         name: request
 *         schema:
 *           type: object
 *           properties:
 *             url:
 *               type: string
 *             useCache:
 *               type: boolean
 *               default: true
 *     responses:
 *       200:
 *         html: string
 *         fromCache: boolean
 *         description: The HTML content of the requested URL and whether it was served from cache.
 *       500:
 *         description: Internal server error
 */
router.post('/api/http-client', async (req: Request, res: Response) => {
    try {
        const command = req.body as GetHtmlCommand;
        const useCache = command.useCache !== false;
        const cacheKey = `html_${generateCacheKey(command.url)}`;
        const cacheService = container.resolve<ICacheService>(TOKENS.ICacheService);
        
        if (useCache) {
            const cachedHtml = await cacheService.get<string>(cacheKey);
            if (cachedHtml) {
                return res.status(200).json({ html: cachedHtml, fromCache: true } as GetHtmlResponse);
            }
        }
        
        let httpClient = null;
        if (command.useBasicHttpClient) {
            httpClient = new BasicHttpClient();
        } else {
            httpClient = new HeadlessHttpClient();
        }

        const response = await httpClient.getHtml(command.url);
        if (useCache) {
            await cacheService.set(cacheKey, response, DEFAULT_CACHE_TTL);
        }
        
        res.status(200).json({ html: response.html, url: response.url, fromCache: false } as GetHtmlResponse);
    } catch (error) {
        console.error('HTTP client request failed:', error);
        const errorResponse = {
            message: error instanceof Error ? error.message : 'Unknown error occurred',
            timestamp: new Date().toISOString(),
            url: req.body.Url,
            path: req.path,
            status: 500
        };
        res.status(500).json(errorResponse);
    }
});

function generateCacheKey(url: string): string {
    return crypto.createHash('md5').update(url).digest('hex');
}

export default router;