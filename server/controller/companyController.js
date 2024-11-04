const { Company } = require("../model/companySchema");
const getDataUri = require("../config/datauri");
const cloudinary  = require("../config/cloud");

exports.registerCompany = async(req,res)=>{
    try{
       const {companyName} = req.body;

       if(!companyName){
           return res.status(400).json({
              success:false,
              message:"Please provide company name"
           })
       }

       let company = await Company.findOne({name:companyName});
       
       if(company){
           return res.status(400).json({
               success:false,
               message:"Company already exists"
           })
       }

       company = await Company.create({
          name:companyName,
          userId : req.id
       })

       return res.status(201).json({
           success:true,
           message:"Company registered successfully",
           company
       })

    }catch(err){
        console.log(err)
    }
}

// get company for admin 

exports.getCompany = async(req,res)=>{
    try{
        const userId = req.id;  //loogedIn user id

        const company = await Company.find({userId});

        if(!company){
            return res.status(404).json({
                success:false,
                message:"Company not found"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Company found",
            company
        })
    }catch(err){
        console.log(err)
    }
}


//get company by id

exports.getCompanyById = async(req,res)=>{
    try{
        const companyId = req.params.id;
        const company = await Company.findById(companyId);

        if(!company){
            return res.status(404).json({
                success:false,
                message:"Company not found"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Company found",
            company
        })
    }catch(err){
        console.log(err)
    }
}


//update company

exports.updateCompany = async(req,res)=>{
    try{
        const companyId = req.params.id;
        const {name, description, location,website} = req.body;

        const file = req.file;
        //cloudinary setup

        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const logo = cloudResponse.secure_url;

        const company = await Company.findByIdAndUpdate(companyId, {name, description, location,website,logo}, {new:true});

        if(!company){
            return res.status(404).json({
                success:false,
                message:"Company not found"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Company information updated",
            company
        })

    }catch(err){
        console.log(err)
    }
}