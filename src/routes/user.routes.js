const route = require('express').Router();
const userContoller = require ('../controller/user.controller');


route.post('/createAccount', userContoller.createAccount);
route.post('/login', userContoller.logIn);

module.exports = route;