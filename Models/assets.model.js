const { getDb } = require('../Db/Db');
const { ObjectId } = require('mongodb');

const DigitalAssetsModel = {
  // Create a new user
  async createBasicProfile(data) {
    const db = getDb();
    const user = {
      projectName: data.projectName,
      prismId: data.prismId,
      department: data.department,
      url: data.url,
      publicIp: data.publicIp,

      nodalOfficerNIC: {
        name: data.nodalOfficerNICName,
        empCode: data.nodalOfficerNICEmpCode,
        email: data.nodalOfficerNICEmail,
        contactNumber: data.nodalOfficerNICContact,
      },

      nodalOfficerDept: {
        name: data.nodalOfficerDeptName,
        email: data.nodalOfficerDeptEmail,
        contactNumber: data.nodalOfficerDeptContact,
      },

      createdAt: new Date(),
    };

    const result = await db.collection('basicProfile').insertOne(user);
    return result.insertedId;
  },
 async delete()
 {
console.log("delete called");
 },
 async delete1()
 {
console.log("delete called");
 },
  async createAsset(asset) {
    const db = getDb();
    const result = await db.collection('assets').insertOne(asset);
    return result.insertedId;
  },
};

module.exports = DigitalAssetsModel;