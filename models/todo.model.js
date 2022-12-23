import mongoose, { Types } from "mongoose";

const taskSchema=new mongoose.Schema({
    main:String,
    checked:{
        type:Boolean,
        default:false
    }
})

const todoSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
    },
    tasks:[taskSchema]
})

const model=new mongoose.model("todo",todoSchema)

export default model