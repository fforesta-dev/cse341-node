const express = require('express');
require('dotenv').config();
const { initDb } = require('./db/connect');
const contactsRoutes = require('./routes/contacts');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const port = process.env.PORT || 3000;

app.set('trust proxy', 1);

app.use(express.json());

app.use(
  '/api-docs',
  (req, res, next) => {
    const host = req.get('host');
    const forwardedProto = req.get('x-forwarded-proto');
    const protocol = forwardedProto || req.protocol;
    const scheme = host && host.includes('onrender.com') ? 'https' : protocol;

    req.swaggerDoc = {
      ...swaggerDocument,
      host,
      schemes: [scheme],
    };
    next();
  },
  swaggerUi.serveFiles(),
  swaggerUi.setup()
);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/contacts', contactsRoutes);

initDb((err) => {
  if (err) {
    console.error('DB init error:', err);
    process.exit(1);
  }

  app.listen(port, () => {
    console.log(`Server running on ${port}`);
  });
});
