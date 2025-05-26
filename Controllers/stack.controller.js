const StackModel = require('../Models/stack.model');

// Controller to create new stack details
async function createStackDetails(req, res) {
  try {
    const stackDetailsId = await StackModel.createStackDetails(req.body);
    res.status(201).json({ message: 'Stack details created successfully', stackDetailsId });
  } catch (error) {
    console.error('Error creating stack details:', error);
    res.status(500).json({ error: 'Failed to create stack details' });
  }
}

// Controller to get all stack details
async function getAllStackDetails(req, res) {
  try {
    const stackDetails = await StackModel.getAllStackDetails();
    res.status(200).json(stackDetails);
  } catch (error) {
    console.error('Error fetching stack details:', error);
    res.status(500).json({ error: 'Failed to fetch stack details' });
  }
}

// Controller to get stack details by ID
async function getStackDetailsById(req, res) {
  try {
    const { id } = req.params;
    const stackDetails = await StackModel.getStackDetailsById(id);

    if (stackDetails) {
      res.status(200).json(stackDetails);
    } else {
      res.status(404).json({ error: 'Stack details not found' });
    }
  } catch (error) {
    console.error('Error fetching stack details by ID:', error);
    res.status(500).json({ error: 'Failed to fetch stack details' });
  }
}

// Controller to update stack details
async function updateStackDetails(req, res) {
  try {
    const { id } = req.params;
    const updatedCount = await StackModel.updateStackDetails(id, req.body);

    if (updatedCount > 0) {
      res.status(200).json({ message: 'Stack details updated successfully' });
    } else {
      res.status(404).json({ error: 'Stack details not found' });
    }
  } catch (error) {
    console.error('Error updating stack details:', error);
    res.status(500).json({ error: 'Failed to update stack details' });
  }
}

// Controller to delete stack details
async function deleteStackDetails(req, res) {
  try {
    const { id } = req.params;
    const deletedCount = await StackModel.deleteStackDetails(id);

    if (deletedCount > 0) {
      res.status(200).json({ message: 'Stack details deleted successfully' });
    } else {
      res.status(404).json({ error: 'Stack details not found' });
    }
  } catch (error) {
    console.error('Error deleting stack details:', error);
    res.status(500).json({ error: 'Failed to delete stack details' });
  }
}

module.exports = {
  createStackDetails,
  getAllStackDetails,
  getStackDetailsById,
  updateStackDetails,
  deleteStackDetails
};