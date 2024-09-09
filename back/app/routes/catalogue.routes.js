const express = require('express');
const router = express.Router();
const catalogueController = require('../controllers/catalogue.controller');
const upload = require('../config/uploadMiddleware'); 


router.post('/create', upload.array('files'), catalogueController.createCatalogue);
router.get('/catalogues/:id', catalogueController.getCatalogueById);
router.get('/catalogues', catalogueController.getAllCatalogues);

router.put('/update/:id', upload.array('files'), catalogueController.updateCatalogue);


router.delete('/delete/:id', catalogueController.deleteCatalogue);
router.get('/count', catalogueController.countCatalogues);

module.exports = router;
