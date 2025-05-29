const { getDb } = require('../Db/Db');
const { ObjectId } = require('mongodb');

const DigitalAssetsModel = {
  // Create a new asset profile using the new payload format
  async createBasicProfile(data) {
    const db = getDb();
    const assetProfile = {
      assetId: data.asste_id, // custom asset id
      BP: {
        name: data.BP.name,
        prismId: data.BP.prismid,
        deptName: data.BP.deptname,
        url: data.BP.url,
        publicIp: data.BP.public_ip,
        nodalOfficerNIC: {
          name: data.BP.nodalofficerNIC.Name,
          empCode: data.BP.nodalofficerNIC.Emp_code,
          mobile: data.BP.nodalofficerNIC.Mob,
          email: data.BP.nodalofficerNIC.Email,
        },
        nodalOfficerDept: {
          name: data.BP.nodalofficerDept.Name,
          designation: data.BP.nodalofficerDept.Designation,
          mobile: data.BP.nodalofficerDept.Mob,
          email: data.BP.nodalofficerDept.Email,
        },
      },
      SA: {
        typeOfAudit: data.SA.typeofaudit,
        auditDate: new Date(data.SA.date),
        auditingAgency: data.SA.auditingahency,
        certificate: data.SA.certi,
        sslLabScore: data.SA.ssllabscore,
        tlsNextExpiry: new Date(data.SA.tlsnextexpiry),
        secondaryAudits: data.SA.Secaudits, // expecting an array
      },
      Infra: {
        typeOfServer: data.Infra.typeofserver,
        location: data.Infra.location,
        deployment: data.Infra.deployment,
        dataCentre: data.Infra.datacentre,
        gitURL: data.Infra.giturl, // array of URLs
        ipAddress: data.Infra.ipaddress,
        purposeOfUse: data.Infra.puposeofuse,
        vaScore: data.Infra.vascore,
        dateOfVA: new Date(data.Infra.dateofva),
        additionalInfra: data.Infra.infra, // expecting an array
      },
      TS: {
        frontEnd: data.TS.frontend, // expecting an array
        framework: data.TS.framework,
        database: data.TS.database, // expecting an array
        os: data.TS.OS, // expecting an array
      },
      createdAt: new Date(),
    };

    const result = await db.collection('Assets').insertOne(assetProfile);
    return result.insertedId;
  },

  
  
};

module.exports = DigitalAssetsModel;