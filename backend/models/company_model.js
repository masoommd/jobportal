import mongoose from "mongoose";

const Schema = mongoose.Schema;

const companySchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    description:{
        type:String,
    },
    website:{
        type:String,
    },
    location:{
        type:String,
    },
    logo:{
        type:String, // Url of company Logo
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }
},{timestamps:true})

export const Company = mongoose.model("Company",companySchema);
