import { Router, Request, Response } from 'express';
import { container } from 'tsyringe';
import { TOKENS } from '../../../container';
import IHttpClient from '@/features/_shared/contracts/IHttpClient';
import ICacheService from '@/features/_shared/contracts/ICacheService';
import { GetHtmlCommand } from '../commands/GetHtmlCommand';
import crypto from 'crypto';
import { GetHtmlResponse } from '../responses/GetHtmlResponse';

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
 *             Url:
 *               type: string
 *             UseCache:
 *               type: boolean
 *               default: true
 *     responses:
 *       200:
 *         html: string
 *         description: The HTML content of the requested URL.
 *       500:
 *         description: Internal server error
 */
router.post('/api/http-client', async (req: Request, res: Response) => {
    try {
        const request = req.body as GetHtmlCommand;
        const useCache = request.UseCache !== false;
        const cacheKey = `html_${generateCacheKey(request.Url)}`;
        const cacheService = container.resolve<ICacheService>(TOKENS.ICacheService);
        
        if (useCache) {
            const cachedHtml = await cacheService.get<string>(cacheKey);
            if (cachedHtml) {
                return res.status(200).json({ Html: cachedHtml, FromCache: true } as GetHtmlResponse);
            }
        }
        
        const httpClient = container.resolve<IHttpClient>(TOKENS.IHttpClient);
        const html = await httpClient.getHtml(request.Url);
        if (useCache) {
            await cacheService.set(cacheKey, html, DEFAULT_CACHE_TTL);
        }
        
        res.status(200).json({ Html: html, FromCache: false } as GetHtmlResponse);
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