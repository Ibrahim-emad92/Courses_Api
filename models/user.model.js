const mongoose = require('mongoose');
const validator=require('validator');
const userCourse=new mongoose.Schema({
    firstName:{
        type:String,
        require:true
    },
    lastName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
        validator:[validator.isEmail,"This field must be fill"]
    },
    password:{
        type:String,
        require:true
    }
})
module.exports=mongoose.model('User',userCourse);