const express = require('express');
const { dataService } = require('../services/data.service');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Data
 *   description: Operations related to fetching data
 */

/**
 * @swagger
 * /api/data:
 *   get:
 *     summary: Get data from public APIs
 *     tags: [Data]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of entries to return
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Category of entries to filter
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                   example: true
 *                 data:
 *                   type: array
 *                   description: Array of data entries from public APIs
 *                   items:
 *                     type: object
 *                     properties:
 *                       API:
 *                         type: string
 *                         description: Name of the API
 *                       Description:
 *                         type: string
 *                         description: Description of the API
 *                       Auth:
 *                         type: string
 *                         description: Authentication method required
 *                       HTTPS:
 *                         type: boolean
 *                         description: Indicates if the API supports HTTPS
 *                       Cors:
 *                         type: string
 *                         description: Cross-Origin Resource Sharing support
 *                       Link:
 *                         type: string
 *                         description: URL to the API documentation
 *                       Category:
 *                         type: string
 *                         description: Category of the API
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: A message describing the error
 *                   example: Internal Server Error!
 */

router.get('/', async (req, res) => {
  const { limit, category } = req.query;

  const [ status, response ] = await dataService(limit, category);

  res.status(status).json(response);
});

module.exports = router;
