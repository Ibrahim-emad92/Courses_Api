

const userModel=require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateJWT = require('../utils/generate.JWT');
const getAllUsers=async(req,res)=>{
    const query=req.query;
    const limit=query.limit||10;    
    const page=query.page||1;
    const skip=(page-1)*limit;  
    
    const users=await userModel.find({},{"password":false}).limit(limit).skip(skip);
    res.json({status:"success",data:{users}});
}

const RegisterUser=async(req,res)=>{
    const {firstName,lastName,email,password}=req.body;
    if(!firstName || !lastName || !email || !password){
        return res.status(400).json({status:"Error",msg:"All fields are required"});
    }
    const existingUser=await userModel.findOne({email});
    if(existingUser){
        return res.status(400).json({status:"Error",msg:"User already exists"});
    }       
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser=new userModel({
        firstName,
        lastName,
        email,
        password: hashedPassword
    });
    const token=generateJWT({id:newUser._id,email:newUser.email}); 
    newUser.token = token; 
    await newUser.save();
    res.status(201).json({status:"success",msg:"User registered successfully",data:{user:newUser}});

}
const LoginUser=async(req,res)=>{
    const {email,password}=req.body;
    if(!email||!password){
        return res.status(400).json({status:"Error",msg:"Email and password are required"});
    }
    const user=await userModel.findOne({email,password});
    if(!user){
        return res.status(401).json({status:"Error",msg:"Invalid email or password"});
    }
    const token = generateJWT({id:user._id,email:user.email});
    res.status(200).json({status:"success",msg:"Login successful",data:{token}});
}
module.exports={
    getAllUsers,
    RegisterUser,
    LoginUser
}