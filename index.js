const express = require('express');
require('dotenv').config();
const { initDb } = require('./db/connect');
const contactsRoutes = require('./routes/contacts');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

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
