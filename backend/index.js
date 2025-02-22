import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv'
import connectDB from './utils/db.js';
import userRoute from './routes/user_routes.js'
import companyRoute from './routes/company_routes.js'
import jobRoute from './routes/job_routes.js'
import applicationRoute from './routes/application_routes.js'
import path from 'path'


dotenv.config({})
connectDB();
let PORT = process.env.PORT || 8080;
const app = express();

const _dirname = path.resolve();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOption = {
    origin:'https://jobportal-2wks.onrender.com',
    credentials:true
}
app.use(cors(corsOption))


//api's
app.use("/api/v1/user",userRoute);
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job",jobRoute);
app.use("/api/v1/application",applicationRoute);

app.use(express.static(path.join(_dirname,"/frontend/dist")));
app.get("*",(_,res) => {
    res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"));
})


app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`);
})
