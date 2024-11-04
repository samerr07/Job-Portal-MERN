const { Application } = require("../model/applicationSchema");
const { Job } = require("../model/jobSchema");

exports.applyJob = async(req,res)=>{
    try{
        const userId = req.id;
        const jobId = req.params.id;

        //check if the user has already applied for the job

        const existingApplication = await Application.findOne({job:jobId, applicant:userId})

        if(existingApplication){
            return res.status(400).json({
                success:false,
                message:"You have already applied for this job"
            })
        }

        //check if the job exists
        const job = await Job.findById(jobId);

        if(!job){
            return res.status(404).json({
                success:false,
                message:"Job not found"
            })
        }

        //create a new application
        const newApplication = await Application.create({
            job:jobId,
            applicant:userId
        })

        await newApplication.save();

        job.applications.push(newApplication._id);
        await job.save();

        return res.status(201).json({
            success:true,
            message:"Job applied successfully",
            
        })
    }catch(err){
        console.log(err);
    }
}


exports.getAppliedJobs = async(req,res)=>{
    try{
        const userId = req.id;

        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:"company",
                options:{sort:{createdAt:-1}}
            }
        });

        if(!application){
            return res.status(404).json({
                success:false,
                message:"No application found"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Applied jobs fetched successfully",
            application
        })
    }catch(err){
        console.log(err);
    }
}

// admin checked how many user applied the jobs 

exports.getApplicants = async(req,res)=>{
    try{
       const jobId = req.params.id;

       const job = await Job.findById(jobId).populate({
        path:"applications",
        options:{sort:{createdAt:-1}},
        populate:{
            path:"applicant",
        }
       })

       if(!job){
        return res.status(404).json({
            success:false,
            message:"No job found"
        })
       }

       return res.status(200).json({
        success:true,
        message:"Applicants fetched successfully",
        job
       })
    }catch(err){
        console.log(err);
    }
}

//update application status

exports.updateStatus = async(req,res)=>{
    try{
        const {status} = req.body;
        const applicationId = req.params.id;

        if(!status){
            return res.status(400).json({
                success:false,
                message:"Please provide status"
            })
        }

        //find application
        const application = await Application.findOne({_id:applicationId});
        if(!application){
            return res.status(404).json({
                success:false,
                message:"No application found"
            })
        }

        //update application status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            success:true,
            message:"Application status updated successfully",
            application
        })
    }catch(err){
        console.log(err);
    }
}