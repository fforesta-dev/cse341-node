const { ObjectId } = require('mongodb');
const { getDb } = require('../db/connect');

const getAllRegistrations = async (req, res) => {
  try {
    const registrations = await getDb().collection('registrations').find({}).toArray();
    res.status(200).json(registrations);
  } catch (error) {
    console.error('Failed to load registrations:', error);
    res.status(500).json({ error: 'Could not get registrations' });
  }
};

const createRegistration = async (req, res) => {
  try {
    const { eventId, memberId, status, notes } = req.body;

    if (!eventId || !memberId || !status) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!ObjectId.isValid(memberId)) {
      return res.status(400).json({ error: 'memberId must be a valid ObjectId string' });
    }

    const eventsCollection = getDb().collection('events');
    const membersCollection = getDb().collection('members');
    const eventQuery = ObjectId.isValid(eventId)
      ? { _id: new ObjectId(eventId) }
      : { _id: eventId };

    const [eventExists, memberExists] = await Promise.all([
      eventsCollection.findOne(eventQuery),
      membersCollection.findOne({ _id: new ObjectId(memberId) }),
    ]);

    if (!eventExists) {
      return res.status(404).json({ error: 'Event not found for provided eventId' });
    }

    if (!memberExists) {
      return res.status(404).json({ error: 'Member not found for provided memberId' });
    }

    const newRegistration = {
      eventId,
      memberId,
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
    console.error('Registration insert failed:', error);
    res.status(500).json({ error: 'Could not create registration' });
  }
};

const updateRegistration = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid registration ID' });
    }

    const { eventId, memberId, status, notes } = req.body;

    if (!eventId || !memberId || !status) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!ObjectId.isValid(memberId)) {
      return res.status(400).json({ error: 'memberId must be a valid ObjectId string' });
    }

    const result = await getDb()
      .collection('registrations')
      .replaceOne({ _id: new ObjectId(id) }, { eventId, memberId, status, notes: notes || '' });

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Registration not found' });
    }

    res.status(200).json({ message: 'Registration updated' });
  } catch (error) {
    console.error('Error updating registration:', error);
    res.status(500).json({ error: 'Could not update registration' });
  }
};

const deleteRegistration = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid registration ID' });
    }

    const result = await getDb()
      .collection('registrations')
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Registration not found' });
    }

    res.status(200).json({ message: 'Registration deleted' });
  } catch (error) {
    console.error('Error deleting registration:', error);
    res.status(500).json({ error: 'Could not delete registration' });
  }
};

module.exports = {
  getAllRegistrations,
  createRegistration,
  updateRegistration,
  deleteRegistration,
};
