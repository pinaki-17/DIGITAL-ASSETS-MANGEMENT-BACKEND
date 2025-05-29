const AssetsModel = require('../Models/assets.model');

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


async function createAsset(req, res) {
  try {
    const { assetsId, assetsDetails } = req.body;

    if (!assetsId || !assetsDetails) {
      return res.status(400).json({ error: 'assetsId and assetsDetails are required' });
    }

    // Optionally, add createdAt timestamps and convert date fields within assetsDetails
    if (assetsDetails.BP) {
      assetsDetails.BP.createdAt = new Date();
    }
    if (assetsDetails.SA) {
      assetsDetails.SA.createdAt = new Date();
      assetsDetails.SA.auditDate = new Date(assetsDetails.SA.auditDate);
      // You can also add a field for tlsNextExpireDate if needed, using the tlsnextexpiry value
      assetsDetails.SA.tlsNextExpireDate = new Date(assetsDetails.SA.tlsnextexpiry);
    }
    if (assetsDetails.Infra) {
      assetsDetails.Infra.createdAt = new Date();
      assetsDetails.Infra.dateOfVA = new Date(assetsDetails.Infra.dateofva);
    }
    if (assetsDetails.TS) {
      assetsDetails.TS.createdAt = new Date();
    }

    // Assemble asset object preserving the original nested assetsDetails format
    const asset = {
      assetsId,
      assetsDetails,
      createdAt: new Date()
    };

    const db = getDb();
    const result = await db.collection('Assets').insertOne(asset);

    res.status(201).json({
      message: 'Asset created successfully',
      assetId: result.insertedId
    });
  } catch (error) {
    console.error('Error creating asset:', error);
    res.status(500).json({ error: 'Failed to create asset' });
  }
}

async function getAsset(req, res) {
  try {
    const { assetsId } = req.params;
    const db = getDb();
    // Using the custom assetsId field for lookup (instead of _id)
    const asset = await db.collection('Assets').findOne({ assetsId: assetsId });
    
    if (!asset) {
      return res.status(404).json({ error: 'Asset not found' });
    }
    
    // Return the nested assetsDetails or break it out as needed
    const response = {
      BP: asset.assetsDetails.BP,
      SA: asset.assetsDetails.SA,
      Infra: asset.assetsDetails.Infra,
      TS: asset.assetsDetails.TS
    };
    
    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching asset:', error);
    res.status(500).json({ error: 'Failed to get asset' });
  }
}

async function deleteAsset(req, res) {
  try {
    // Use a consistent parameter name (assetsId) to match what you store
    const { assetsId } = req.params;
    const db = getDb();
    const result = await db.collection('Assets').deleteOne({ assetsId: assetsId });
    
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