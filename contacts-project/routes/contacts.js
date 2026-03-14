const express = require('express');
const router = express.Router();
const { getDb } = require('../db/connect');
const { ObjectId } = require('mongodb');

router.get('/', async (req, res) => {
  try {
    const db = getDb();
    const contacts = await db.collection('contacts').find({}).toArray();
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Could not get contacts' });
  }
});

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
    res.status(500).json({ error: 'Could not get contact' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    // Validate all required fields
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({
        error: 'Missing required fields',
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
      message: 'Contact created',
      id: result.insertedId,
      contact: { ...newContact, _id: result.insertedId },
    });
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ error: 'Could not create contact' });
  }
});

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
    res.status(500).json({ error: 'Could not update contact' });
  }
});

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
    res.status(500).json({ error: 'Could not delete contact' });
  }
});

module.exports = router;
