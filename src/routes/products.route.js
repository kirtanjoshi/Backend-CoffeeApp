
const productRoute = require('express').Router();
const productContoller = require ('../controller/product.controller');


productRoute.post('/', productContoller.CreateProduct);
productRoute.get('/', productContoller.fetchProduct);
productRoute.get('/category/:id', productContoller.fetchProductByCategory);

module.exports = productRoute;