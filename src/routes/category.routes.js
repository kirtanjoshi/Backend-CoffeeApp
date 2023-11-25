const categoryRoute = require('express').Router();
const catergoryContoller = require ('../controller/category.controller');


categoryRoute.post('/', catergoryContoller.createCategory);
categoryRoute.get('/', catergoryContoller.fetchAllCategory);
categoryRoute.get('/:id', catergoryContoller.fetchCategoryById);

module.exports = categoryRoute;