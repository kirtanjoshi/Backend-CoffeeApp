const OrderRoutes = require('express').Router();
const orderController = require('../controller/order.controller');


OrderRoutes.post('/', orderController.createorder);
OrderRoutes.get('/:userId', orderController.fetchOrdersForUser);
OrderRoutes.put('/updateStatus', orderController.updateOrderStatus)

module.exports= OrderRoutes;