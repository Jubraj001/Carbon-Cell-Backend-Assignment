require('dotenv').config();
const express = require('express');
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const connectToMongo = require('./db');
const auth = require('./controllers/auth.controller');
const data = require('./controllers/data.controller');
const cors = require('cors');

const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.3.0/swagger-ui.min.css";

connectToMongo();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json());

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Carbon Cell Backend Assignment',
      version: '1.0.0'
    },
    servers: [
      {
        url: `https://localhost:${port}`
      }
    ]
  },
  apis: ['./controllers/auth.controller.js', './controllers/data.controller.js']
};
const swaggerSpec = swaggerJSDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss:
    '.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }',
  customCssUrl: CSS_URL,
}));

app.use('/api/auth', auth);
app.use('/api/data', data);

app.listen(port, () => {
  console.log(`Started listening on port ${port}`)
});
