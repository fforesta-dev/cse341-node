const { ObjectId } = require('mongodb');
const { getDb } = require('../db/connect');

const getAllMembers = async (req, res) => {
  try {
    const members = await getDb().collection('members').find({}).toArray();
    res.status(200).json(members);
  } catch (error) {
    console.error('Failed to retrieve members:', error);
    res.status(500).json({ error: 'Could not get members' });
  }
};

const createMember = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, ward, calling, isActive } = req.body;

    if (!firstName || !lastName || !email || !phone || !ward || !calling) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (typeof isActive !== 'boolean') {
      return res.status(400).json({ error: 'isActive must be true or false' });
    }

    const newMember = {
      firstName,
      lastName,
      email,
      phone,
      ward,
      calling,
      isActive,
      createdAt: new Date(),
    };

    const result = await getDb().collection('members').insertOne(newMember);

    res.status(201).json({
      message: 'Member created',
      id: result.insertedId,
    });
  } catch (error) {
    console.error('Error creating member:', error);
    res.status(500).json({ error: 'Could not create member' });
  }
};

const updateMember = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid member ID' });
    }

    const { firstName, lastName, email, phone, ward, calling, isActive } = req.body;

    if (!firstName || !lastName || !email || !phone || !ward || !calling) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (typeof isActive !== 'boolean') {
      return res.status(400).json({ error: 'isActive must be true or false' });
    }

    const result = await getDb()
      .collection('members')
      .replaceOne(
        { _id: new ObjectId(id) },
        { firstName, lastName, email, phone, ward, calling, isActive }
      );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Member not found' });
    }

    res.status(200).json({ message: 'Member updated' });
  } catch (error) {
    console.error('Error updating member:', error);
    res.status(500).json({ error: 'Could not update member' });
  }
};

const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid member ID' });
    }

    const result = await getDb()
      .collection('members')
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Member not found' });
    }

    res.status(200).json({ message: 'Member deleted' });
  } catch (error) {
    console.error('Delete member error:', error);
    res.status(500).json({ error: 'Could not delete member' });
  }
};

module.exports = {
  getAllMembers,
  createMember,
  updateMember,
  deleteMember,
};
