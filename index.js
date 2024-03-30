require('dotenv').config();
const express = require('express');
const connectToMongo = require('./db');
const auth = require('./controllers/auth.controller');
var cors = require('cors');

connectToMongo();

const app = express();
const port = 5000;

app.use(cors())
app.use(express.json());

app.use('/api/auth', auth);

app.listen(port, () => {
  console.log(`Started listening on port ${port}`)
})
