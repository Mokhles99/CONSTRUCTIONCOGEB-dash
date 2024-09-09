const express = require('express');
const router = express.Router();
const carouselController = require('../controllers/carousel.controller');
const upload = require('../config/uploadMiddleware'); 


router.post('/create', upload.array('files'), carouselController.createCarousel);
router.get('/carousels/:id', carouselController.getCarouselById);
router.get('/carousels', carouselController.getAllCarousels);

router.put('/update/:id', upload.array('files'), carouselController.updateCarousel);


router.delete('/delete/:id', carouselController.deleteCarousel);
router.get('/count', carouselController.countCarousels);

module.exports = router;
