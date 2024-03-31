const express = require('express');
const { dataService } = require('../services/data.service');

const router = express.Router();

router.get('/', async (req, res) => {
  const { limit, category } = req.query;

  const [ status, response ] = await dataService(limit, category);

  res.status(status).json(response);
});

module.exports = router;
