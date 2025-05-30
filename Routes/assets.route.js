const express = require("express");
const router = express.Router();


const AssetsController = require('../Controllers/assets.controller');

router.post('/assets/createAsset', AssetsController.createAsset);
router.get('/assets/:assetsId', AssetsController.getAsset);
router.delete('/assets/:assetsId', AssetsController.deleteAsset);
router.put('/assets/update/bp/:assetsId', AssetsController.updateBP);
router.put('/assets/update/sa/:assetsId', AssetsController.updateSA);
router.put('/assets/update/infra/:assetsId', AssetsController.updateInfra);
router.put('/assets/update/ts/:assetsId', AssetsController.updateTS);
module.exports = router;





// const AuditController = require('../Controllers/audit.controller')
// const StackController = require('../Controllers/stack.controller')
// const InfrastructureController = require('../Controllers/infrastructure.controller');
// router.post('/assets/createProfile', AssetsController.basicDetails);
// router.post('/audit/create', AuditController.createAuditLog);
// router.post('/stack/create', StackController.createStackDetails);
// router.post('/info/create', InfrastructureController.createInfrastructureDetails);