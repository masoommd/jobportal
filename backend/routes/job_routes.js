import express from "express"
import isAuthenticated from "../middleware/isAuthenticated.js";
import { deleteJob, getAdminJobs, getallJobs, getJobById, postJob, updateJob } from "../controllers/job_controller.js";

const router = express.Router();

router.route("/post")
.post(isAuthenticated,postJob);

router.route("/get")
.get(isAuthenticated,getallJobs);

router.route("/getadminjobs")
.get(isAuthenticated,getAdminJobs);

router.route("/get/:id")
.get(isAuthenticated,getJobById);

router.route("/update/:id")
.put(isAuthenticated, updateJob);

router.route("/delete/:id")
.delete(isAuthenticated, deleteJob);


export default router;