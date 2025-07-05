const express=require('express');
const {body}=require('express-validator')
const router =express.Router()
const coursecontroller=require('../controllers_/courses_controllers')

router.get('/api/courses',coursecontroller.getAllcourses)
router.get('/api/courses/:courseid',coursecontroller.getsinglecourse)
router.post('/api/courses/',
    [
        body('title')
            .notEmpty()
            .withMessage("title is require")
            .isLength({min:2})
            .withMessage("length should max 2"),
        body('price')
            .notEmpty()
            .withMessage("price is require")
    ],coursecontroller.createcourse)

router.patch('/api/courses/:courseid',coursecontroller.updatecourse)
router.delete('/api/courses/:courseid',coursecontroller.deletecourse)
  
module.exports=router