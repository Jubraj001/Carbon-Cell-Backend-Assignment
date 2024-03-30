const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const fetchUser = require('../middleware/fetchUser');
const { registerService, loginService } = require('../services/auth.service');

const router = express.Router();
const JWT_SECRET = 'Jubraj@Dev';

router.post('/register', [
  body('email', 'Enter a valid email').isEmail(),
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: 'Certain fields are empty or incorrect', errors: errors.array() });
  }

  const { email, name, password } = req.body;
  const [ status, response ] = await registerService(email, name, password);

  res.status(status).json(response);
})

router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: 'Certain fields are empty or incorrect', errors: errors.array() });
  }

  const { email, password } = req.body;
  const [ status, response ] = await loginService(email, password);

  res.status(status).json(response);
})

module.exports = router;
