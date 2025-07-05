const mongoose=require('mongoose')
const courseSchma=new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    }
})

module.exports=mongoose.model('Course',courseSchma)