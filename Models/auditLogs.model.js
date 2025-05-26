const { getDb } = require('../Db/Db');

const AuditLogsModel = {
  // Create a new audit log entry
  async createAuditLog(data) {
    const db = getDb();
    const auditLog = {
      typeOfAudit: data.typeOfAudit, // Internal or Third Party
      agency: data.agency, // Auditing agency
      auditDate: new Date(data.auditDate), // Date of audit
      sslLabScore: data.sslLabScore, // SSL Lab Score (e.g., A+)
      tlsNextExpireDate: new Date(data.tlsNextExpireDate), // TLS Next Expiry Date
      certificatePath: data.certificatePath, // Path to uploaded certificate
      createdAt: new Date(), // Timestamp for when the record was created
    };

    const result = await db.collection('auditlogs').insertOne(auditLog);
    return result.insertedId;
  },

  // Fetch all audit logs
  async getAllAuditLogs() {
    const db = getDb();
    return await db.collection('auditlogs').find({}).toArray();
  },

  // Delete an audit log by ID
  async deleteAuditLogById(id) {
    const db = getDb();
    const result = await db.collection('auditlogs').deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount;
  },
};

module.exports = AuditLogsModel;


// Fields in the Schema:

// typeOfAudit: Specifies whether the audit is internal or third-party.
// agency: The name of the auditing agency.
// auditDate: The date when the audit was conducted.
// sslLabScore: The SSL Lab score (e.g., A+).
// tlsNextExpireDate: The next expiration date for TLS.
// certificatePath: The file path for the uploaded certificate.
// createdAt: A timestamp for when the record was created.
// Functions:

// createAuditLog(data): Inserts a new audit log into the auditlogs collection.
// getAllAuditLogs(): Retrieves all audit logs from the collection.
// deleteAuditLogById(id): Deletes an audit log by its _id.
// Collection Name:

// The collection name is auditlogs.