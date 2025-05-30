// const AssetsModel = require('../Models/assets.model');

// const {getDb} = require('../Db/Db')


// async function basicDetails(req,res){
//     console.log(req.body);
    
//     try {
//     const id = await AssetsModel.createBasicProfile(req.body);
//     res.status(201).json({ message: 'Assets Profile registered successfully', userId: id });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Error creating Profile' });
//   }
// }

// // Controller to create a new audit log
// async function createAuditLog(req, res) {
//   try {
//     const auditLogId = await AuditLogsModel.createAuditLog(req.body);
//     res.status(201).json({ message: 'Audit log created successfully', auditLogId });
//   } catch (error) {
//     console.error('Error creating audit log:', error);
//     res.status(500).json({ error: 'Failed to create audit log' });
//   }
// }

// // Controller to create new infrastructure details
// async function createInfrastructureDetails(req, res) {
//   try {
//     const infrastructureDetailsId = await InfrastructureModel.createInfrastructureDetails(req.body);
//     res.status(201).json({ message: 'Infrastructure details created successfully', infrastructureDetailsId });
//   } catch (error) {
//     console.error('Error creating infrastructure details:', error);
//     res.status(500).json({ error: 'Failed to create infrastructure details' });
//   }
// }

// // Controller to create new stack details
// async function createStackDetails(req, res) {
//   try {
//     const stackDetailsId = await StackModel.createStackDetails(req.body);
//     res.status(201).json({ message: 'Stack details created successfully', stackDetailsId });
//   } catch (error) {
//     console.error('Error creating stack details:', error);
//     res.status(500).json({ error: 'Failed to create stack details' });
//   }
// }


// async function createAsset(req, res) {
//   try {
//     const { assetsId, assetsDetails } = req.body;

//     if (!assetsId || !assetsDetails) {
//       return res.status(400).json({ error: 'assetsId and assetsDetails are required' });
//     }

//     // Optionally, add createdAt timestamps and convert date fields within assetsDetails
//     if (assetsDetails.BP) {
//       assetsDetails.BP.createdAt = new Date();
//     }
//     if (assetsDetails.SA) {
//       assetsDetails.SA.createdAt = new Date();
//       assetsDetails.SA.auditDate = new Date(assetsDetails.SA.auditDate);
//       // You can also add a field for tlsNextExpireDate if needed, using the tlsnextexpiry value
//       assetsDetails.SA.tlsNextExpireDate = new Date(assetsDetails.SA.tlsnextexpiry);
//     }
//     if (assetsDetails.Infra) {
//       assetsDetails.Infra.createdAt = new Date();
//       assetsDetails.Infra.dateOfVA = new Date(assetsDetails.Infra.dateofva);
//     }
//     if (assetsDetails.TS) {
//       assetsDetails.TS.createdAt = new Date();
//     }

//     // Assemble asset object preserving the original nested assetsDetails format
//     const asset = {
//       assetsId,
//       assetsDetails,
//       createdAt: new Date()
//     };

//     const db = getDb();
//     const result = await db.collection('Assets').insertOne(asset);

//     res.status(201).json({
//       message: 'Asset created successfully',
//       assetId: result.insertedId
//     });
//   } catch (error) {
//     console.error('Error creating asset:', error);
//     res.status(500).json({ error: 'Failed to create asset' });
//   }
// }

// async function getAsset(req, res) {
//   try {
//     const { assetsId } = req.params;
//     const db = getDb();
//     // Using the custom assetsId field for lookup (instead of _id)
//     const asset = await db.collection('Assets').findOne({ assetsId: assetsId });
    
//     if (!asset) {
//       return res.status(404).json({ error: 'Asset not found' });
//     }
    
//     // Return the nested assetsDetails or break it out as needed
//     const response = {
//       BP: asset.assetsDetails.BP,
//       SA: asset.assetsDetails.SA,
//       Infra: asset.assetsDetails.Infra,
//       TS: asset.assetsDetails.TS
//     };
    
//     res.status(200).json(response);
//   } catch (error) {
//     console.error('Error fetching asset:', error);
//     res.status(500).json({ error: 'Failed to get asset' });
//   }
// }

// async function deleteAsset(req, res) {
//   try {
//     // Use a consistent parameter name (assetsId) to match what you store
//     const { assetsId } = req.params;
//     const db = getDb();
//     const result = await db.collection('Assets').deleteOne({ assetsId: assetsId });
    
//     if (result.deletedCount === 0) {
//       return res.status(404).json({ error: 'Asset not found' });
//     }
    
//     res.status(200).json({ message: 'Asset deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting asset:', error);
//     res.status(500).json({ error: 'Failed to delete asset' });
//   }
// }
// // ✅ Update BP section
// const updateBP = async (req, res) => {
//   const db = getDb();
//   const { assetId } = req.params;
//   const data = req.body;

//   try {
//     const result = await db.collection('Assets').updateOne(
//       { assetId: assetId },
//       {
//         $set: {
//           'BP.name': data.name,
//           'BP.prismId': data.prismid,
//           'BP.deptName': data.deptname,
//           'BP.url': data.url,
//           'BP.publicIp': data.public_ip,
//           'BP.nodalOfficerNIC': {
//             name: data.nodalofficerNIC.Name,
//             empCode: data.nodalofficerNIC.Emp_code,
//             mobile: data.nodalofficerNIC.Mob,
//             email: data.nodalofficerNIC.Email,
//           },
//           'BP.nodalOfficerDept': {
//             name: data.nodalofficerDept.Name,
//             designation: data.nodalofficerDept.Designation,
//             mobile: data.nodalofficerDept.Mob,
//             email: data.nodalofficerDept.Email,
//           },
//         },
//       }
//     );
//     res.status(200).json({ message: 'BP section updated successfully', modifiedCount: result.modifiedCount });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to update BP section', details: err.message });
//   }
// };

// // ✅ Update SA section
// const updateSA = async (req, res) => {
//   const db = getDb();
//   const { assetId } = req.params;
//   const data = req.body;

//   try {
//     const result = await db.collection('Assets').updateOne(
//       { assetId: assetId },
//       {
//         $set: {
//           'SA.typeOfAudit': data.typeofaudit,
//           'SA.auditDate': new Date(data.auditDate),
//           'SA.auditingAgency': data.auditingahency,
//           'SA.certificate': data.certi,
//           'SA.sslLabScore': data.ssllabscore,
//           'SA.tlsNextExpiry': new Date(data.tlsnextexpiry),
//           'SA.secondaryAudits': data.Secaudits,
//         },
//       }
//     );
//     res.status(200).json({ message: 'SA section updated successfully', modifiedCount: result.modifiedCount });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to update SA section', details: err.message });
//   }
// };

// // ✅ Update Infra section
// const updateInfra = async (req, res) => {
//   const db = getDb();
//   const { assetId } = req.params;
//   const data = req.body;

//   try {
//     const result = await db.collection('Assets').updateOne(
//       { assetId: assetId },
//       {
//         $set: {
//           'Infra.typeOfServer': data.typeofserver,
//           'Infra.location': data.location,
//           'Infra.deployment': data.deployment,
//           'Infra.dataCentre': data.datacentre,
//           'Infra.gitURL': data.giturl,
//           'Infra.ipAddress': data.ipaddress,
//           'Infra.purposeOfUse': data.puposeofuse,
//           'Infra.vaScore': data.vascore,
//           'Infra.dateOfVA': new Date(data.dateofva),
//           'Infra.additionalInfra': data.infra,
//         },
//       }
//     );
//     res.status(200).json({ message: 'Infra section updated successfully', modifiedCount: result.modifiedCount });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to update Infra section', details: err.message });
//   }
// };

// // ✅ Update TS section
// const updateTS = async (req, res) => {
//   const db = getDb();
//   const { assetId } = req.params;
//   const data = req.body;

//   try {
//     const result = await db.collection('Assets').updateOne(
//       { assetId: assetId },
//       {
//         $set: {
//           'TS.frontEnd': data.frontend,
//           'TS.framework': data.framework,
//           'TS.database': data.database,
//           'TS.os': data.OS,
//         },
//       }
//     );
//     res.status(200).json({ message: 'TS section updated successfully', modifiedCount: result.modifiedCount });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to update TS section', details: err.message });
//   }
// };



// module.exports = {
//   basicDetails,
//   createAuditLog,
//   createInfrastructureDetails,
//   createStackDetails,
//   createAsset,
//  getAsset,
//  deleteAsset,
//  updateBP,
//  updateSA,
//  updateInfra,
//  updateTS
// };
const AssetsModel = require('../Models/assets.model');
const { getDb } = require('../Db/Db');

async function createAsset(req, res) {
  try {
    const id = await AssetsModel.createBasicProfile(req.body);
    res.status(201).json({ message: 'Asset created successfully', assetId: id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating asset' });
  }
}

async function getAsset(req, res) {
  try {
    const { assetsId } = req.params;
    const db = getDb();
    const asset = await db.collection('Assets').findOne({ assetsId });

    if (!asset) return res.status(404).json({ error: 'Asset not found' });

    res.status(200).json({
      BP: asset.BP,
      SA: asset.SA,
      Infra: asset.Infra,
      TS: asset.TS
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get asset' });
  }
}

async function deleteAsset(req, res) {
  try {
    const { assetsId } = req.params;
    const db = getDb();
    const result = await db.collection('Assets').deleteOne({ assetsId });

    if (result.deletedCount === 0)
      return res.status(404).json({ error: 'Asset not found' });

    res.status(200).json({ message: 'Asset deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete asset' });
  }
}

// Update BP section
async function updateBP(req, res) {
  const db = getDb();
  const { assetsId } = req.params;
  const data = req.body;

  try {
    const result = await db.collection('Assets').updateOne(
      { assetsId },
      {
        $set: {
          'BP.name': data.name,
          'BP.prismId': data.prismid,
          'BP.deptName': data.deptname,
          'BP.url': data.url,
          'BP.publicIp': data.public_ip,
          'BP.nodalOfficerNIC': {
            name: data.nodalofficerNIC.Name,
            empCode: data.nodalofficerNIC.Emp_code,
            mobile: data.nodalofficerNIC.Mob,
            email: data.nodalofficerNIC.Email,
          },
          'BP.nodalOfficerDept': {
            name: data.nodalofficerDept.Name,
            designation: data.nodalofficerDept.Designation,
            mobile: data.nodalofficerDept.Mob,
            email: data.nodalofficerDept.Email,
          }
        }
      }
    );
    res.status(200).json({ message: 'BP section updated', modifiedCount: result.modifiedCount });
  } catch (err) {
    res.status(500).json({ error: 'Update BP failed', details: err.message });
  }
}

async function updateSA(req, res) {
  const db = getDb();
  const { assetsId } = req.params;
  const data = req.body;

  try {
    const result = await db.collection('Assets').updateOne(
      { assetsId },
      {
        $set: {
          'SA.typeOfAudit': data.typeofaudit,
          'SA.auditDate': new Date(data.auditDate),
          'SA.auditingAgency': data.auditingahency,
          'SA.certificate': data.certi,
          'SA.sslLabScore': data.ssllabscore,
          'SA.tlsNextExpiry': new Date(data.tlsnextexpiry),
          'SA.secondaryAudits': data.Secaudits
        }
      }
    );
    res.status(200).json({ message: 'SA section updated', modifiedCount: result.modifiedCount });
  } catch (err) {
    res.status(500).json({ error: 'Update SA failed', details: err.message });
  }
}

async function updateInfra(req, res) {
  const db = getDb();
  const { assetsId } = req.params;
  const data = req.body;

  try {
    const result = await db.collection('Assets').updateOne(
      { assetsId },
      {
        $set: {
          'Infra.typeOfServer': data.typeofserver,
          'Infra.location': data.location,
          'Infra.deployment': data.deployment,
          'Infra.dataCentre': data.datacentre,
          'Infra.gitURL': data.giturl,
          'Infra.ipAddress': data.ipaddress,
          'Infra.purposeOfUse': data.puposeofuse,
          'Infra.vaScore': data.vascore,
          'Infra.dateOfVA': new Date(data.dateofva),
          'Infra.additionalInfra': data.infra
        }
      }
    );
    res.status(200).json({ message: 'Infra section updated', modifiedCount: result.modifiedCount });
  } catch (err) {
    res.status(500).json({ error: 'Update Infra failed', details: err.message });
  }
}

async function updateTS(req, res) {
  const db = getDb();
  const { assetsId } = req.params;
  const data = req.body;

  try {
    const result = await db.collection('Assets').updateOne(
      { assetsId },
      {
        $set: {
          'TS.frontEnd': data.frontend,
          'TS.framework': data.framework,
          'TS.database': data.database,
          'TS.os': data.OS
        }
      }
    );
    res.status(200).json({ message: 'TS section updated', modifiedCount: result.modifiedCount });
  } catch (err) {
    res.status(500).json({ error: 'Update TS failed', details: err.message });
  }
}

module.exports = {
  createAsset,
  getAsset,
  deleteAsset,
  updateBP,
  updateSA,
  updateInfra,
  updateTS
};
