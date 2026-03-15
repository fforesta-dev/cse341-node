const { getDb } = require('../db/connect');

const getAllMembers = async (req, res) => {
  try {
    const members = await getDb().collection('members').find({}).toArray();
    res.status(200).json(members);
  } catch (error) {
    console.error('Error getting members:', error);
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

module.exports = {
  getAllMembers,
  createMember,
};
