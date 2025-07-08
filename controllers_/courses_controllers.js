const {validationResult}=require('express-validator')
const Course=require('../models/courses.model')


const getAllcourses=async(req,res)=>{
    const query=req.query;
    const limit=query.limit||10;
    const page=query.page||1;
    const skip=(page-1)*limit;
    const courses=await Course.find().limit(limit).skip(skip);
    res.json({status:"success",data:{courses}});
}

const getsinglecourse=async(req,res)=>{
    try {
        const course=await Course.findById(req.params.courseid)
        
        if(!course){
            return res.json({status:"fail",data:{course:"course not found"}})
        }
        return res.json({status:"success",data:{course}});
    } catch (err) {
        return res.status(400).json({status:"error",msg:"course not found"})
    }
}

const createcourse=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({status:"error",data:errors.array()})
    }
    const newCourse=new Course(req.body)
    await newCourse.save()
    res.status(201).json({status:"success",data:{newCourse}})
}

const updatecourse=async(req,res)=>{
    const id= req.params.courseid
    try {
        const updateCourse=await Course.updateOne({_id:id},{$set:{...req.body}})
        return res.status(200).json({status:"success",data:{updateCourse}})
    } catch (err) {
        return res.status(400).json({status:"error",msg:err.message})
    }
 }

 const deletecourse=async(req,res)=>{
    await Course.deleteOne({_id: req.params.courseid})
    res.status(200).json({status:"success",data:null})
}
module.exports={
    getAllcourses,
    getsinglecourse,
    createcourse,
    updatecourse,
    deletecourse
}
