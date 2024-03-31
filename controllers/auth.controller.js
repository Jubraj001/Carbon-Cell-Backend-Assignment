const express = require('express');
const { body, validationResult } = require('express-validator');
const { registerService, loginService } = require('../services/auth.service');

const router = express.Router();

const MISSING_FIELDS_ERROR_MESSAGE = 'Certain fields are empty or incorrect';

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication operations
 */


/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: A message describing the result of the operation
 *                   example: Successfully registered!
 *                 authToken:
 *                   type: string
 *                   description: JWT token for authentication
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMTIzNDU2Nzg5MCJ9LCJpYXQiOjE1MTYyMzkwMjJ9.Yqd5rb2Vbce_hxm2ZS7EANUWtbOXr_JCwC_CIVFPFJE
 *       '400':
 *         description: Bad request, invalid input
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
 *                   example: Certain fields are empty or incorrect
 *                 errors:
 *                   type: array
 *                   description: An array containing details of validation errors
 *                   items:
 *                     type: object
 *                     properties:
 *                       param:
 *                         type: string
 *                         description: The name of the parameter with the error
 *                         example: email
 *                       msg:
 *                         type: string
 *                         description: A message describing the error
 *                         example: "Enter a valid email"
 *                       value:
 *                         type: string
 *                         description: The value that caused the validation error
 *                         example: "example.com"
 *       '500':
 *         description: Internal Server error
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

router.post('/register', [
  body('email', 'Enter a valid email').isEmail(),
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: MISSING_FIELDS_ERROR_MESSAGE, errors: errors.array() });
  }

  const { email, name, password } = req.body;
  const [ status, response ] = await registerService(email, name, password);

  res.status(status).json(response);
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in as an existing user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: A message describing the result of the operation
 *                   example: Successfully logged in!
 *                 authToken:
 *                   type: string
 *                   description: JWT token for authentication
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMTIzNDU2Nzg5MCJ9LCJpYXQiOjE1MTYyMzkwMjJ9.Yqd5rb2Vbce_hxm2ZS7EANUWtbOXr_JCwC_CIVFPFJE
 *       '400':
 *         description: Bad request, invalid input
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
 *                   example: Certain fields are empty or incorrect
 *                 errors:
 *                   type: array
 *                   description: An array containing details of validation errors
 *                   items:
 *                     type: object
 *                     properties:
 *                       param:
 *                         type: string
 *                         description: The name of the parameter with the error
 *                         example: email
 *                       msg:
 *                         type: string
 *                         description: A message describing the error
 *                         example: "Enter a valid email"
 *                       value:
 *                         type: string
 *                         description: The value that caused the validation error
 *                         example: "example.com"
*       '500':
 *         description: Internal Server error
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

router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: MISSING_FIELDS_ERROR_MESSAGE, errors: errors.array() });
  }

  const { email, password } = req.body;
  const [ status, response ] = await loginService(email, password);

  res.status(status).json(response);
});

module.exports = router;
