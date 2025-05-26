const express = require("express");
const router = express.Router();


const AssetsController = require('../Controllers/assets.controller');
const AuditController = require('../Controllers/audit.controller')
const StackController = require('../Controllers/stack.controller')
const InfrastructureController = require('../Controllers/infrastructure.controller');
router.post('/assets/createProfile', AssetsController.basicDetails);
router.post('/audit/create', AuditController.createAuditLog);
router.post('/stack/create', StackController.createStackDetails);
router.post('/info/create', InfrastructureController.createInfrastructureDetails);
module.exports = router;