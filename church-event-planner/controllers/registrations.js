const { ObjectId } = require('mongodb');
const { getDb } = require('../db/connect');

const getAllRegistrations = async (req, res) => {
  try {
    const registrations = await getDb().collection('registrations').find({}).toArray();
    res.status(200).json(registrations);
  } catch (error) {
    console.error('Error getting registrations:', error);
    res.status(500).json({ error: 'Could not get registrations' });
  }
};

const createRegistration = async (req, res) => {
  try {
    const { eventId, memberId, status, notes } = req.body;

    if (!eventId || !memberId || !status) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!ObjectId.isValid(eventId) || !ObjectId.isValid(memberId)) {
      return res.status(400).json({ error: 'eventId and memberId must be valid ObjectId strings' });
    }

    const newRegistration = {
      eventId: new ObjectId(eventId),
      memberId: new ObjectId(memberId),
      status,
      notes: notes || '',
      createdAt: new Date(),
    };

    const result = await getDb().collection('registrations').insertOne(newRegistration);

    res.status(201).json({
      message: 'Registration created',
      id: result.insertedId,
    });
  } catch (error) {
    console.error('Error creating registration:', error);
    res.status(500).json({ error: 'Could not create registration' });
  }
};

module.exports = {
  getAllRegistrations,
  createRegistration,
};
