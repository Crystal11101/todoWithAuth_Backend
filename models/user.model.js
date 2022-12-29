import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    // name:{
    //     type: String,
    //     required:true,
    // },
    email:{
        type:String,
        required:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
    }
})

const model=new mongoose.model("user",userSchema);

export default model