const { getDb } = require('../Db/Db');
const { ObjectId } = require('mongodb');

const InfrastructureModel = {
  async createInfrastructureDetails(data) {
    const db = getDb();
    const infrastructureDetails = {
      typeOfServer: data.typeOfServer, // e.g., Cloud, Co-location
      dataCentre: data.dataCentre, // e.g., NDC, SDC
      deployment: data.deployment, // e.g., VM, Container
      location: data.location,
      gitURL: data.gitURL,
      ipAddress: data.ipAddress,
      purposeOfUse: data.purposeOfUse,
      vaScore: data.vaScore,
      dateOfVA: new Date(data.dateOfVA),
      vaAuditReportPath: data.vaAuditReportPath,
      createdAt: new Date()
    };

    const result = await db.collection('infrastructureDetails').insertOne(infrastructureDetails);
    return result.insertedId;
  },

  async getAllInfrastructureDetails() {
    const db = getDb();
    return await db.collection('infrastructureDetails').find({}).toArray();
  },

  async getInfrastructureDetailsById(id) {
    const db = getDb();
    return await db.collection('infrastructureDetails').findOne({ _id: new ObjectId(id) });
  },

  async updateInfrastructureDetails(id, data) {
    const db = getDb();
    const result = await db.collection('infrastructureDetails').updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          typeOfServer: data.typeOfServer,
          dataCentre: data.dataCentre,
          deployment: data.deployment,
          location: data.location,
          gitURL: data.gitURL,
          ipAddress: data.ipAddress,
          purposeOfUse: data.purposeOfUse,
          vaScore: data.vaScore,
          dateOfVA: new Date(data.dateOfVA),
          vaAuditReportPath: data.vaAuditReportPath,
          updatedAt: new Date()
        }
      }
    );
    return result.modifiedCount;
  },

  async deleteInfrastructureDetails(id) {
    const db = getDb();
    const result = await db.collection('infrastructureDetails').deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount;
  }
};

module.exports = InfrastructureModel;