const InfrastructureModel = require('../Models/infrastructure.model');

// Controller to create new infrastructure details
async function createInfrastructureDetails(req, res) {
  try {
    const infrastructureDetailsId = await InfrastructureModel.createInfrastructureDetails(req.body);
    res.status(201).json({ message: 'Infrastructure details created successfully', infrastructureDetailsId });
  } catch (error) {
    console.error('Error creating infrastructure details:', error);
    res.status(500).json({ error: 'Failed to create infrastructure details' });
  }
}

// Controller to get all infrastructure details
async function getAllInfrastructureDetails(req, res) {
  try {
    const infrastructureDetails = await InfrastructureModel.getAllInfrastructureDetails();
    res.status(200).json(infrastructureDetails);
  } catch (error) {
    console.error('Error fetching infrastructure details:', error);
    res.status(500).json({ error: 'Failed to fetch infrastructure details' });
  }
}

// Controller to get infrastructure details by ID
async function getInfrastructureDetailsById(req, res) {
  try {
    const { id } = req.params;
    const infrastructureDetails = await InfrastructureModel.getInfrastructureDetailsById(id);

    if (infrastructureDetails) {
      res.status(200).json(infrastructureDetails);
    } else {
      res.status(404).json({ error: 'Infrastructure details not found' });
    }
  } catch (error) {
    console.error('Error fetching infrastructure details by ID:', error);
    res.status(500).json({ error: 'Failed to fetch infrastructure details' });
  }
}

// Controller to update infrastructure details
async function updateInfrastructureDetails(req, res) {
  try {
    const { id } = req.params;
    const updatedCount = await InfrastructureModel.updateInfrastructureDetails(id, req.body);

    if (updatedCount > 0) {
      res.status(200).json({ message: 'Infrastructure details updated successfully' });
    } else {
      res.status(404).json({ error: 'Infrastructure details not found' });
    }
  } catch (error) {
    console.error('Error updating infrastructure details:', error);
    res.status(500).json({ error: 'Failed to update infrastructure details' });
  }
}

// Controller to delete infrastructure details
async function deleteInfrastructureDetails(req, res) {
  try {
    const { id } = req.params;
    const deletedCount = await InfrastructureModel.deleteInfrastructureDetails(id);

    if (deletedCount > 0) {
      res.status(200).json({ message: 'Infrastructure details deleted successfully' });
    } else {
      res.status(404).json({ error: 'Infrastructure details not found' });
    }
  } catch (error) {
    console.error('Error deleting infrastructure details:', error);
    res.status(500).json({ error: 'Failed to delete infrastructure details' });
  }
}

module.exports = {
  createInfrastructureDetails,
  getAllInfrastructureDetails,
  getInfrastructureDetailsById,
  updateInfrastructureDetails,
  deleteInfrastructureDetails
};