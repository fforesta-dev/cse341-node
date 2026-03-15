const express = require('express');
require('dotenv').config();
const { initDb } = require('./db/connect');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const port = process.env.PORT || 3000;

app.set('trust proxy', 1);
app.use(express.json());

app.get('/swagger.json', (req, res) => {
  const host = req.get('host');
  const forwardedProto = req.get('x-forwarded-proto');
  const protocol = forwardedProto || req.protocol;

  res.json({
    ...swaggerDocument,
    host,
    schemes: [protocol],
  });
});

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(null, {
    swaggerOptions: {
      url: '/swagger.json',
    },
  })
);
app.use('/', require('./routes'));

initDb((err) => {
  if (err) {
    console.error('DB init error:', err);
    process.exit(1);
  }

  app.listen(port, () => {
    console.log(`Server running on ${port}`);
  });
});
