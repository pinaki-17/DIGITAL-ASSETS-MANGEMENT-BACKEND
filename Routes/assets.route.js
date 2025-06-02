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
router.get('/assets/datacentre/:dataCentre', AssetsController.getAssetsByDataCentre);
router.get('/assets/by-department/:deptName', AssetsController.getAssetsByDepartment);
router.get('/assets/project/:projectName', AssetsController.getAssetByProjectName);

router.get('/assets/all-projects', AssetsController.getAllProjects);
module.exports = router;





