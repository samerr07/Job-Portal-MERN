
const { Job } = require("../model/jobSchema");

//post a job through admin 

exports.postJob = async(req,res)=>{
    try{
       const {title,description,requirements,salary,location,jobType,experience,position,companyId} = req.body;

       const userId = req.id;

       if(!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId){
           return res.status(400).json({
            success:false,
            message:"Please fill all the fields"
           })
       }

       const job = await Job.create({
        title,
        description,
        requirements:requirements.split(","),
        salary: Number(salary),
        location,
        jobType,
        experienceLevel:experience,
        position,
        created_by:userId,
        company: companyId
       })

       return res.status(201).json({
        success:true,
        message:"Job posted successfully",
        job
       })
    }catch(err){
        console.log(err)
    }
}

//get all jobs for students or searching a job

exports.getAllJobs = async(req,res)=>{
    try{
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                {title:{$regex:keyword,$options:"i"}},
                {description:{$regex:keyword,$options:"i"}}
            ]
        };

        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({createdAt:-1});

        if(!jobs){
            return res.status(404).json({
                success:false,
                message:"No jobs found"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Jobs found",
            jobs
        })
    }catch(err){
        console.log(err)
    }
}

//student

exports.getJobById = async(req,res)=>{
    try{
      const jobId = req.params.id;
      const job = await Job.findById(jobId).populate({
        path:"applications"
      })

      if(!job){
        return res.status(404).json({
          success:false,
          message:"Job not found"
        })
      }

      return res.status(200).json({
        success:true,
        message:"Job found",
        job
      })
    }catch(err){
        console.log(err)
    }
}


//get all jobs created by admin

exports.getAdminJobs = async(req,res)=>{
    try{
       const adminId = req.id;

       const jobs = await Job.find({created_by:adminId}).populate({
        path: "company"
        }).sort({createdAt:-1});

       if(!jobs){
        return res.status(404).json({
            success:false,
            message:"No jobs found"
        })
       }

       return res.status(200).json({
        success:true,
        message:"Jobs found",
        jobs
       })
       
    }catch(err){
        console.log(err);
    }
}