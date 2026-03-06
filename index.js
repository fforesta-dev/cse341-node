const express = require('express');
require('dotenv').config();
const { initDb } = require('./db/connect');
const contactsRoutes = require('./routes/contacts');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/contacts', contactsRoutes);

// Initialize database and start server
initDb((err) => {
  if (err) {
    console.error('Failed to initialize database:', err);
    process.exit(1);
  }

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
