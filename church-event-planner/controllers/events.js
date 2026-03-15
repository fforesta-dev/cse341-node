const { getDb } = require('../db/connect');

const getAllEvents = async (req, res) => {
  try {
    const events = await getDb().collection('events').find({}).toArray();
    res.status(200).json(events);
  } catch (error) {
    console.error('Error getting events:', error);
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

module.exports = {
  getAllEvents,
  createEvent,
};
