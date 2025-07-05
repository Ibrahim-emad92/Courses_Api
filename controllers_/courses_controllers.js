const {validationResult}=require('express-validator')
const course=require('../models/courses.model')


const getAllcourses=async(req,res)=>{
    //get all courses from database using course model
    const courses=await course.find()
    res.json(courses);
}

const getsinglecourse=async(req,res)=>{
    try {
        const course=await course.findById(req.params.courseid)
        if(!course){
            return res.json({msg:"course not founded"})
        }
        return res.json(course);
    } catch (err) {
        return res.status(400).json({msg:"invalid object id"})

    }
    
}

const createcourse=async(req,res)=>{

    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json(errors.array())
    }
    const newCourse=new course(req.body)
    await newCourse.save()

    res.status(201).json(newCourse)
}

const updatecourse=async(req,res)=>{
    const id= req.params.courseid
    try {
        const updateCourse=await course.updateOne({_id:id},{$set:{...req.body}})
        return res.status(200).json(updateCourse)
    } catch (err) {
        return res.status(400).json({errors:err})
    }
 }

 const deletecourse=async(req,res)=>{
    const data=await course.deleteOne({_id: req.params.courseid})
    res.status(200).json({success:true,msg:data})
}
module.exports={
    getAllcourses,
    getsinglecourse,
    createcourse,
    updatecourse,
    deletecourse
}
