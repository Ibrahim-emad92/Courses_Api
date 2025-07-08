const express=require('express');
const {body}=require('express-validator')
const router =express.Router()
const userscontroller=require('../controllers_/users.controllers');

router.get('/',userscontroller.getAllUsers);
router.post('/Register',userscontroller.RegisterUser);
router.post('/Login',userscontroller.LoginUser);

module.exports=router