const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');

router.post('/new', cartController.createCart);
// router.put('/updatecart/:id', cartController.updateCart);
router.put('/cart/update/:cartId', cartController.updateCart);
router.get('/cart/:id', cartController.getCart);
router.delete('/deletecart/:id', cartController.deleteCart);

module.exports = router;
