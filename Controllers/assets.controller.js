const AssetsModel = require('../Models/assets.model');
const AuditLogsModel = require('../Models/auditLogs.model');
const InfrastructureModel = require('../Models/infrastructure.model');
const StackModel = require('../Models/techstack.model');
const {getDb} = require('../Db/Db')


async function basicDetails(req,res){
    console.log(req.body);
    
    try {
    const id = await AssetsModel.createBasicProfile(req.body);
    res.status(201).json({ message: 'Assets Profile registered successfully', userId: id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating Profile' });
  }
}

// Controller to create a new audit log
async function createAuditLog(req, res) {
  try {
    const auditLogId = await AuditLogsModel.createAuditLog(req.body);
    res.status(201).json({ message: 'Audit log created successfully', auditLogId });
  } catch (error) {
    console.error('Error creating audit log:', error);
    res.status(500).json({ error: 'Failed to create audit log' });
  }
}

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


//main all the 
async function createAsset(req, res) {
  try {
    const { assetsId, assetsDetails } = req.body;

    // Create and retrieve each subdocument
    const basicDetails = assetsDetails.basicDetails;
    basicDetails.createdAt = new Date();

    const auditLog = {
      ...assetsDetails.auditLog,
      auditDate: new Date(assetsDetails.auditLog.auditDate),
      tlsNextExpireDate: new Date(assetsDetails.auditLog.tlsNextExpireDate),
      createdAt: new Date(),
    };

    const infrastructureDetails = {
      ...assetsDetails.infrastructureDetails,
      dateOfVA: new Date(assetsDetails.infrastructureDetails.dateOfVA),
      createdAt: new Date(),
    };

    const techStackDetails = {
      ...assetsDetails.techStackDetails,
      createdAt: new Date(),
    };

    // Create the asset object with full data instead of IDs
    const asset = {
      assetsId,
      basicDetails,
      auditLog,
      infrastructureDetails,
      techStackDetails,
      createdAt: new Date(),
    };

    // Save the asset to the Assets collection
    const db = getDb();
    const result = await db.collection('Assets').insertOne(asset);

    res.status(201).json({
      message: 'Asset created successfully',
      assetId: result.insertedId,
    });
  } catch (error) {
    console.error('Error creating asset:', error);
    res.status(500).json({ error: 'Failed to create asset' });
  }
}

async function getAsset(req, res) {
  try {
    const { assetId } = req.params;
    const db = getDb();
    // Using the custom assetsId field for lookup (instead of _id)
    const asset = await db.collection('Assets').findOne({ assetsId: assetId });

    if (!asset) {
      return res.status(404).json({ error: 'Asset not found' });
    }

    const response = {
      BP: asset.basicDetails,
      SA: asset.auditLog,
      Infra: asset.infrastructureDetails,
      TS: asset.techStackDetails
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching asset:', error);
    res.status(500).json({ error: 'Failed to get asset' });
  }
}

async function deleteAsset(req, res) {
  try {
    const { assetId } = req.params;
    const db = getDb();
    const result = await db.collection('Assets').deleteOne({ assetsId: assetId });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Asset not found' });
    }
    
    res.status(200).json({ message: 'Asset deleted successfully' });
  } catch (error) {
    console.error('Error deleting asset:', error);
    res.status(500).json({ error: 'Failed to delete asset' });
  }
}



module.exports = {
  basicDetails,
  createAuditLog,
  createInfrastructureDetails,
  createStackDetails,
  createAsset,
 getAsset,
 deleteAsset
};