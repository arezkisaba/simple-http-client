import { Router, Request, Response } from 'express';

const router = Router();

/**
 * @swagger
 * /healthcheck:
 *   post:
 *     summary: Health Check Endpoint 
 *     description: Checks the health of the service.
 *     responses:
 *       200:
 *         status: string
 */
router.get('/healthcheck', async (_req: Request, res: Response) => {
    res.status(200).json({ status: "Healthy" });
});

export default router;