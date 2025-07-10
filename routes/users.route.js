const express=require('express');
const router =express.Router()
const userscontroller=require('../controllers_/users.controllers');
const verifyToken = require('../middelwares/verify.token');
router.get('/',verifyToken,userscontroller.getAllUsers);
router.post('/Register',userscontroller.RegisterUser);
router.post('/Login',userscontroller.LoginUser);

module.exports=router