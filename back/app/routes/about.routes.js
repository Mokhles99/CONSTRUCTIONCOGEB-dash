const express = require('express');
const router = express.Router();
const aboutController = require('../controllers/about.controller');
const upload = require('../config/uploadMiddleware'); 


router.post('/create', upload.array('files'), aboutController.createAbout);
router.get('/abouts/:id', aboutController.getAboutById);
router.get('/abouts', aboutController.getAllAbouts);

router.put('/update/:id', upload.array('files'), aboutController.updateAbout);


router.delete('/delete/:id', aboutController.deleteAbout);
router.get('/count', aboutController.countAbouts);

module.exports = router;
