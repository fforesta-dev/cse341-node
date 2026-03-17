const { ObjectId } = require('mongodb');
const { getDb } = require('../db/connect');

const getAllEvents = async (req, res) => {
  try {
    const events = await getDb().collection('events').find({}).toArray();
    res.status(200).json(events);
  } catch (error) {
    console.error('Could not fetch events:', error);
    res.status(500).json({ error: 'Could not get events' });
  }
};

const createEvent = async (req, res) => {
  try {
    const { title, description, date, time, location, capacity, organizerName, eventType } =
      req.body;

    if (
      !title ||
      !description ||
      !date ||
      !time ||
      !location ||
      capacity === undefined ||
      !organizerName ||
      !eventType
    ) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (typeof capacity !== 'number' || capacity <= 0) {
      return res.status(400).json({ error: 'Capacity must be a positive number' });
    }

    const newEvent = {
      title,
      description,
      date,
      time,
      location,
      capacity,
      organizerName,
      eventType,
      createdAt: new Date(),
    };

    const result = await getDb().collection('events').insertOne(newEvent);

    res.status(201).json({
      message: 'Event created',
      id: result.insertedId,
    });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Could not create event' });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date, time, location, capacity, organizerName, eventType } =
      req.body;

    if (
      !title ||
      !description ||
      !date ||
      !time ||
      !location ||
      capacity === undefined ||
      !organizerName ||
      !eventType
    ) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (typeof capacity !== 'number' || capacity <= 0) {
      return res.status(400).json({ error: 'Capacity must be a positive number' });
    }

    const query = ObjectId.isValid(id) ? { _id: new ObjectId(id) } : { _id: id };
    const result = await getDb().collection('events').replaceOne(query, {
      title,
      description,
      date,
      time,
      location,
      capacity,
      organizerName,
      eventType,
    });

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.status(200).json({ message: 'Event updated' });
  } catch (error) {
    console.error('Update event failed:', error);
    res.status(500).json({ error: 'Could not update event' });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const query = ObjectId.isValid(id) ? { _id: new ObjectId(id) } : { _id: id };
    const result = await getDb().collection('events').deleteOne(query);

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.status(200).json({ message: 'Event deleted' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Could not delete event' });
  }
};

module.exports = {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
