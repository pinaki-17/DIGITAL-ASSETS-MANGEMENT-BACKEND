const AuditLogsModel = require('../Models/auditLogs.model');

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

// Controller to fetch all audit logs
async function getAllAuditLogs(req, res) {
  try {
    const auditLogs = await AuditLogsModel.getAllAuditLogs();
    res.status(200).json(auditLogs);
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    res.status(500).json({ error: 'Failed to fetch audit logs' });
  }
}

// Controller to delete an audit log by ID
async function deleteAuditLog(req, res) {
  try {
    const { id } = req.params;
    const deletedCount = await AuditLogsModel.deleteAuditLogById(id);

    if (deletedCount > 0) {
      res.status(200).json({ message: 'Audit log deleted successfully' });
    } else {
      res.status(404).json({ error: 'Audit log not found' });
    }
  } catch (error) {
    console.error('Error deleting audit log:', error);
    res.status(500).json({ error: 'Failed to delete audit log' });
  }
}

module.exports = {
  createAuditLog,
  getAllAuditLogs,
  deleteAuditLog,
};