const { getDb } = require('../Db/Db');

const StackModel = {
  async createStackDetails(data) {
    const db = getDb();
    const stackDetails = {
      frontEndPlatform: data.frontEndPlatform, // e.g., Java, .Net
      frameworks: data.frameworks, // comma-separated string
      database: data.database, // e.g., Mongodb, SQL Server
      os: data.os, // e.g., Linux, Windows
      osVersion: data.osVersion,
      sourceCodeRepoURL: data.sourceCodeRepoURL,
      createdAt: new Date()
    };

    const result = await db.collection('stackDetails').insertOne(stackDetails);
    return result.insertedId;
  },

  async getAllStackDetails() {
    const db = getDb();
    return await db.collection('stackDetails').find({}).toArray();
  },

  async getStackDetailsById(id) {
    const db = getDb();
    return await db.collection('stackDetails').findOne({ _id: new ObjectId(id) });
  },

  async updateStackDetails(id, data) {
    const db = getDb();
    const result = await db.collection('stackDetails').updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          frontEndPlatform: data.frontEndPlatform,
          frameworks: data.frameworks,
          database: data.database,
          os: data.os,
          osVersion: data.osVersion,
          sourceCodeRepoURL: data.sourceCodeRepoURL,
          updatedAt: new Date()
        }
      }
    );
    return result.modifiedCount;
  },

  async deleteStackDetails(id) {
    const db = getDb();
    const result = await db.collection('stackDetails').deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount;
  }
};

module.exports = StackModel;