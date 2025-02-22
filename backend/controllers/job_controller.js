import { Job } from "../models/job_model.js";
//admin create job
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;
    const userId = req.id;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId,
    });
    return res.status(201).json({
      message: "New job created successfully!",
      job,
      success: true,
    });
  } catch (error) {
    console.timeLog(error);
  }
};

//student found all job
export const getallJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { location: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: falsde,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//student found job by id
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId)
      .populate({
        path: "company",
      })
      .populate({ path: "applications" })
      .sort({ createdAt: -1 });
    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//admin kitne job create kiya hai
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId }).populate({
      path: "company",
      createdAt: -1,
    });
    if (!jobs) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;

    const updateData = {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    };
    const job = await Job.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    }).populate({
      path: "company",
      createdAt: -1,
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found!",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Job Updated successfully!",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const deletejob = await Job.findByIdAndDelete(id);

    if (!deletejob) {
      return res.status(404).json({
        message: "Job not found!",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Job Deleted successfully!",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
