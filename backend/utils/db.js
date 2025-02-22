import mongoose from "mongoose";

const connectDB = async () =>{
    try {
        const MONGO_URL = process.env.MONGO_URL;
        await mongoose.connect(MONGO_URL);
        console.log("Successfully connected to database");
    } catch (error) {
        console.log(error);
    }
}
// This is the main function which is used to connect database and write this func in index.js file 
// main().then((res) =>{
//     console.log("Connected to Database");
// }).catch((err) =>{
//     console.log(err);
// })

// async function main(){
//     await mongoose.connect(MONGO_URL);
// }

export default connectDB;