const CartRoutes = require('express').Router();
const cartController = require('../controller/cart.controller');


CartRoutes.post('/', cartController.addToCart);
CartRoutes.delete('/', cartController.removeFromCart);
CartRoutes.get('/:user', cartController.getCartFormUser);

module.exports= CartRoutes;