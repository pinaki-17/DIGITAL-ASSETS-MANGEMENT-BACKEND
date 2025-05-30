// const { getDb } = require('../Db/Db');
// const { ObjectId } = require('mongodb');

// const DigitalAssetsModel = {
//   // Create a new asset profile using the new payload format
//   async createBasicProfile(data) {
//     const db = getDb();
//     const assetProfile = {
//       assetsId: data.asset_id, // custom asset id
//       BP: {
//         name: data.BP.name,
//         prismId: data.BP.prismid,
//         deptName: data.BP.deptname,
//         url: data.BP.url,
//         publicIp: data.BP.public_ip,
//         nodalOfficerNIC: {
//           name: data.BP.nodalofficerNIC.Name,
//           empCode: data.BP.nodalofficerNIC.Emp_code,
//           mobile: data.BP.nodalofficerNIC.Mob,
//           email: data.BP.nodalofficerNIC.Email,
//         },
//         nodalOfficerDept: {
//           name: data.BP.nodalofficerDept.Name,
//           designation: data.BP.nodalofficerDept.Designation,
//           mobile: data.BP.nodalofficerDept.Mob,
//           email: data.BP.nodalofficerDept.Email,
//         },
//       },
//       SA: {
//         typeOfAudit: data.SA.typeofaudit,
//         auditDate: new Date(data.SA.date),
//         auditingAgency: data.SA.auditingahency,
//         certificate: data.SA.certi,
//         sslLabScore: data.SA.ssllabscore,
//         tlsNextExpiry: new Date(data.SA.tlsnextexpiry),
//         secondaryAudits: data.SA.Secaudits, // expecting an array
//       },
//       Infra: {
//         typeOfServer: data.Infra.typeofserver,
//         location: data.Infra.location,
//         deployment: data.Infra.deployment,
//         dataCentre: data.Infra.datacentre,
//         gitURL: data.Infra.giturl, // array of URLs
//         ipAddress: data.Infra.ipaddress,
//         purposeOfUse: data.Infra.puposeofuse,
//         vaScore: data.Infra.vascore,
//         dateOfVA: new Date(data.Infra.dateofva),
//         additionalInfra: data.Infra.infra, // expecting an array
//       },
//       TS: {
//         frontEnd: data.TS.frontend, // expecting an array
//         framework: data.TS.framework,
//         database: data.TS.database, // expecting an array
//         os: data.TS.OS, // expecting an array
//       },
//       createdAt: new Date(),
//     };

//     const result = await db.collection('Assets').insertOne(assetProfile);
//     return result.insertedId;
//   },

  
  
// };

// module.exports = DigitalAssetsModel;
const { getDb } = require('../Db/Db');
const { ObjectId } = require('mongodb');

const DigitalAssetsModel = {
  // ✅ Create a full asset profile
  async createAsset(data) {
    const db = getDb();

    const assetProfile = {
      assetsId: data.assetsId, // custom asset ID passed from frontend
      assetsDetails: {
        BP: {
          name: data.assetsDetails.BP.name,
          prismId: data.assetsDetails.BP.prismid,
          deptName: data.assetsDetails.BP.deptname,
          url: data.assetsDetails.BP.url,
          publicIp: data.assetsDetails.BP.public_ip,
          nodalOfficerNIC: {
            name: data.assetsDetails.BP.nodalofficerNIC.Name,
            empCode: data.assetsDetails.BP.nodalofficerNIC.Emp_code,
            mobile: data.assetsDetails.BP.nodalofficerNIC.Mob,
            email: data.assetsDetails.BP.nodalofficerNIC.Email,
          },
          nodalOfficerDept: {
            name: data.assetsDetails.BP.nodalofficerDept.Name,
            designation: data.assetsDetails.BP.nodalofficerDept.Designation,
            mobile: data.assetsDetails.BP.nodalofficerDept.Mob,
            email: data.assetsDetails.BP.nodalofficerDept.Email,
          },
        },
        SA: {
          typeOfAudit: data.assetsDetails.SA.typeofaudit,
          auditDate: new Date(data.assetsDetails.SA.auditDate),
          auditingAgency: data.assetsDetails.SA.auditingagency,
          certificate: data.assetsDetails.SA.certificate,
          sslLabScore: data.assetsDetails.SA.sslLabScore,
          tlsNextExpiry: new Date(data.assetsDetails.SA.tlsnextexpiry),
          secondaryAudits: data.assetsDetails.SA.secondaryAudits || [],
        },
        Infra: {
          typeOfServer: data.assetsDetails.Infra.typeOfServer,
          location: data.assetsDetails.Infra.location,
          deployment: data.assetsDetails.Infra.deployment,
          dataCentre: data.assetsDetails.Infra.dataCentre,
          gitURL: data.assetsDetails.Infra.gitURL || [],
          ipAddress: data.assetsDetails.Infra.ipAddress,
          purposeOfUse: data.assetsDetails.Infra.purposeOfUse,
          vaScore: data.assetsDetails.Infra.vaScore,
          dateOfVA: new Date(data.assetsDetails.Infra.dateOfVA),
          additionalInfra: data.assetsDetails.Infra.additionalInfra || [],
        },
        TS: {
          frontEnd: data.assetsDetails.TS.frontEnd || [],
          framework: data.assetsDetails.TS.framework,
          database: data.assetsDetails.TS.database || [],
          os: data.assetsDetails.TS.os || [],
        },
      },
      createdAt: new Date()
    };

    const result = await db.collection('Assets').insertOne(assetProfile);
    return result.insertedId;
  },

  // ✅ Get full asset by custom asset ID
  async getAssetByAssetsId(assetsId) {
    const db = getDb();
    const asset = await db.collection('Assets').findOne({ assetsId });
    return asset;
  },

  // ✅ Delete asset by custom asset ID
  async deleteAsset(assetsId) {
    const db = getDb();
    return await db.collection('Assets').deleteOne({ assetsId });
  },

  // ✅ Update BP section
  async updateBP(assetsId, newBP) {
    const db = getDb();
    return await db.collection('Assets').updateOne(
      { assetsId },
      { $set: { 'assetsDetails.BP': newBP } }
    );
  },

  // ✅ Update SA section
  async updateSA(assetsId, newSA) {
    if (newSA.auditDate) newSA.auditDate = new Date(newSA.auditDate);
    if (newSA.tlsnextexpiry) newSA.tlsNextExpiry = new Date(newSA.tlsnextexpiry);

    const db = getDb();
    return await db.collection('Assets').updateOne(
      { assetsId },
      { $set: { 'assetsDetails.SA': newSA } }
    );
  },

  // ✅ Update Infra section
  async updateInfra(assetsId, newInfra) {
    if (newInfra.dateOfVA) newInfra.dateOfVA = new Date(newInfra.dateOfVA);

    const db = getDb();
    return await db.collection('Assets').updateOne(
      { assetsId },
      { $set: { 'assetsDetails.Infra': newInfra } }
    );
  },

  // ✅ Update TS section
  async updateTS(assetsId, newTS) {
    const db = getDb();
    return await db.collection('Assets').updateOne(
      { assetsId },
      { $set: { 'assetsDetails.TS': newTS } }
    );
  },
};

module.exports = DigitalAssetsModel;
