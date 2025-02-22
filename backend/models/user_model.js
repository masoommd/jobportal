import mongoose from "mongoose";
const Schema = mongoose.Schema;
const userSchema = new Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['student','recruiter'],
        required:true
    },
    profile:{
        bio:{type:String},
        skills:[{type:String}],
        resume:{type:String}, //Url of resume
        resumeOriginalName:{type:String},
        company:{type:Schema.Types.ObjectId, ref:'Company'},
        profilePhoto:{
            type:String,
            default:"",
        }
    },
},{timestamps:true});

export const User = mongoose.model("User",userSchema);
