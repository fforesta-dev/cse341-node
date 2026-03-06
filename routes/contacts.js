const express = require('express');
const router = express.Router();
const { getDb } = require('../db/connect');
const { ObjectId } = require('mongodb');

/**
 * GET /contacts
 * @summary Get all contacts
 * @description Retrieve a list of all contacts from the database
 * @responses 200 - Array of all contacts
 * @responses 500 - Internal server error
 */
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

/**
 * GET /contacts/query/by-id
 * @summary Get a contact by query parameter ID
 * @description Retrieve a specific contact using an ID provided as a query parameter
 * @param {string} id - Contact ID (query parameter)
 * @responses 200 - Contact object
 * @responses 400 - Missing or invalid ID
 * @responses 404 - Contact not found
 * @responses 500 - Internal server error
 */
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

/**
 * GET /contacts/:id
 * @summary Get a contact by ID
 * @description Retrieve a specific contact by its MongoDB ID from the URL path
 * @param {string} id - Contact ID (URL parameter)
 * @responses 200 - Contact object
 * @responses 404 - Contact not found
 * @responses 500 - Internal server error
 */
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

/**
 * POST /contacts
 * @summary Create a new contact
 * @description Create a new contact with required fields. Returns the new contact ID and full contact object
 * @body {NewContact} required - Contact data (firstName, lastName, email, favoriteColor, birthday are required)
 * @responses 201 - Contact created successfully with ID and full object
 * @responses 400 - Missing required fields
 * @responses 500 - Internal server error
 */
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    // Validate all required fields
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({
        error: 'Missing required fields: firstName, lastName, email, favoriteColor, and birthday are required',
      });
    }

    const db = getDb();
    const newContact = {
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday,
    };

    const result = await db.collection('contacts').insertOne(newContact);

    res.status(201).json({
      message: 'Contact created successfully',
      id: result.insertedId,
      contact: { ...newContact, _id: result.insertedId },
    });
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ error: 'Failed to create contact' });
  }
});

/**
 * PUT /contacts/:id
 * @summary Update a contact
 * @description Update an existing contact with any of the contact fields. At least one field must be provided
 * @param {string} id - Contact ID (URL parameter)
 * @body {Contact} required - Contact data to update (at least one field required)
 * @responses 204 - Contact updated successfully
 * @responses 400 - Invalid ID or no fields to update
 * @responses 404 - Contact not found
 * @responses 500 - Internal server error
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid contact id' });
    }

    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    // Validate that at least some fields are provided
    if (!firstName && !lastName && !email && !favoriteColor && !birthday) {
      return res.status(400).json({ error: 'At least one field is required to update' });
    }

    const db = getDb();
    const updateFields = {};
    if (firstName) updateFields.firstName = firstName;
    if (lastName) updateFields.lastName = lastName;
    if (email) updateFields.email = email;
    if (favoriteColor) updateFields.favoriteColor = favoriteColor;
    if (birthday) updateFields.birthday = birthday;

    const result = await db
      .collection('contacts')
      .updateOne({ _id: new ObjectId(id) }, { $set: updateFields });

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({ error: 'Failed to update contact' });
  }
});

/**
 * DELETE /contacts/:id
 * @summary Delete a contact
 * @description Delete a specific contact from the database
 * @param {string} id - Contact ID (URL parameter)
 * @responses 204 - Contact deleted successfully
 * @responses 400 - Invalid ID
 * @responses 404 - Contact not found
 * @responses 500 - Internal server error
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid contact id' });
    }

    const db = getDb();
    const result = await db.collection('contacts').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ error: 'Failed to delete contact' });
  }
});

module.exports = router;
