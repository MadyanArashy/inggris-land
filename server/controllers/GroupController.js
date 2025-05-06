import Group from '../models/Group.js';

export const getGroups = async (req, res) => {
  try {
    const groups = await Group.findAll();
    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching groups', error });
  }
};

export const getGroupById = async (req, res) => {
  const { id } = req.params;
  try {
    const group = await Group.findByPk(id);
    if (!group) return res.status(404).json({ message: "Group not found" });
    res.json(group);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const createGroup = async (req, res) => {
  try {
    const group = await Group.create(req.body);
    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateGroup = async (req, res) => {
  const { id } = req.params; // Get group ID from the URL params
  const { name, level, description, duration, imageUrl } = req.body; // Get the fields to update from the request body

  try {
    // Find the group by its ID
    const group = await Group.findByPk(id);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Update the group with the new data
    const updatedGroup = await group.update({
      name,
      level,
      description,
      duration,
      imageUrl,
    });

    // Return the updated group
    res.status(200).json(updatedGroup);
  } catch (error) {
    console.error('Error updating group:', error);
    res.status(500).json({ message: 'Error updating group', error });
  }
};

// Delete Group
export const deleteGroup = async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete the group by its ID
    const group = await Group.findByPk(id);
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    await group.destroy(); // Deletes the group from the database
    return res.status(200).json({ message: 'Group deleted successfully' });
  } catch (err) {
    console.error('Error deleting group:', err);
    return res.status(500).json({ message: 'Failed to delete group', error: err.message });
  }
};