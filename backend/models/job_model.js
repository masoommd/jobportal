import { application } from "express";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    requirements:[{
        type:String,
    }],
    salary:{
        type:Number,
        required:true
    },
    experienceLevel:{
        type:String,
        required:true
    },
    location:{
        type:String,
        requires:true
    },
    jobType:{
        type:String,
        requires:true
    },
    position:{
        type:Number,
        requires:true
    },
    company:{
        type:Schema.Types.ObjectId,
        ref:'Company',
        required:true,
    },
    created_by:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    applications:[{
        type:Schema.Types.ObjectId,
        ref:"Application"
    }]
},{timestamps:true})

export const Job = mongoose.model("Job",jobSchema);

