const { MongoClient } = require('mongodb');
require('dotenv').config();

let database;

const initDb = (callback) => {
    if (database) {
        console.log('Database is already initialized');
        return callback(null, database);
    }

    const dbName = process.env.MONGODB_DB_NAME;
    if (!dbName) {
        return callback(new Error('Missing MONGODB_DB_NAME in environment variables'));
    }

    MongoClient.connect(process.env.MONGODB_URI)
        .then((client) => {
            database = client.db(dbName);
            console.log('Database connected successfully');
            callback(null, database);
        })
        .catch((err) => {
            console.error('Failed to connect to database:', err);
            callback(err);
        });
};

const getDb = () => {
    if (!database) {
        throw new Error('Database not initialized');
    }
    return database;
};

module.exports = { initDb, getDb };
