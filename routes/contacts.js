const express = require('express');
const router = express.Router();
const { getDb } = require('../db/connect');
const { ObjectId } = require('mongodb');

// GET all contacts
router.get('/', async (req, res) => {
    try {
        const db = getDb();
        const contacts = await db.collection('contacts').find({}).toArray();
        res.status(200).json(contacts);
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({ error: 'Failed to fetch contacts' });
    }
});

// GET single contact by query parameter id
router.get('/query/by-id', async (req, res) => {
    try {
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({ error: 'Missing required query parameter: id' });
        }

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid contact id' });
        }

        const db = getDb();
        const contact = await db.collection('contacts').findOne({ _id: new ObjectId(id) });

        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' });
        }

        res.status(200).json(contact);
    } catch (error) {
        console.error('Error fetching contact by query id:', error);
        res.status(500).json({ error: 'Failed to fetch contact' });
    }
});

// GET single contact by ID
router.get('/:id', async (req, res) => {
    try {
        const db = getDb();
        const contactId = new ObjectId(req.params.id);

        const contact = await db.collection('contacts').findOne({ _id: contactId });

        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' });
        }

        res.status(200).json(contact);
    } catch (error) {
        console.error('Error fetching contact:', error);
        res.status(500).json({ error: 'Failed to fetch contact' });
    }
});

module.exports = router;
