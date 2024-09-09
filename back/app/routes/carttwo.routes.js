const express = require('express');
const router = express.Router();
const carttwoController = require('../controllers/carttwo.controller');

// router.post('/cart/add', carttwoController.addToCarttwo);
// router.get('/getCarttwo', carttwoController.getCarttwo);
// router.post('/:cartId/userinfo', carttwoController.updateCartWithUserInfo);
// router.delete('/:cartId/items/:itemId', carttwoController.removeItemFromCart);
// router.put('/:cartId/items/:itemId', carttwoController.updateItemQuantity);

router.post('/:cartId/add', carttwoController.addToCarttwo);
router.get('/:cartId/getCarttwo', carttwoController.getCarttwo);
router.post('/:cartId/userinfo', carttwoController.updateCartWithUserInfo);
router.delete('/:cartId/items/:itemId', carttwoController.removeItemFromCart);
router.put('/:cartId/items/:itemId', carttwoController.updateItemQuantity);
router.get('/all', carttwoController.getAllCarts);
router.get('/count', carttwoController.countCarts);


module.exports = router;
