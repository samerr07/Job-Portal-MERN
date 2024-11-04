const bycrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const { User } = require("../model/userSchema");
const getDataUri = require("../config/datauri");
const cloudinary  = require("../config/cloud");


exports.registerUser = async (req,res)=>{
    try{
       const {fullName, email, password, phoneNumber,role} = req.body;

       if(!fullName || !email || !password || !phoneNumber || !role){
          return res.status(400).json({
            message:"Please fill all the fields",
            success:false
          })
       }

       const file = req.file;
       const fileUri = getDataUri(file);
       const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

       const user = await User.findOne({email});

       if(user){
          return res.status(400).json({
            message:"User already exists",
            success:false
          })
       }

       const hashedPassword = await bycrypt.hash(password,10);

       await User.create({
        fullName,
        email,
        password:hashedPassword,
        phoneNumber,
        role,
        profile:{
            profilePhoto:cloudResponse.secure_url
        }
       })

       return res.status(201).json({
        message:"Account created successfully",
        success:true
       })
    }catch(err){
        console.log(err)
    }
}

exports.loginUser = async(req,res)=>{
    try{
        const {email, password, role} = req.body;

        if(!email || !password || !role){
           return res.status(400).json({
             message:"Please fill all the fields",
             success:false
           })
        }
        let user = await User.findOne({email})

        if(!user){
            return res.status(400).json({
                message:"Incorrect email or password !!",
                success:false
            })
        }

        const isMatch = await bycrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({
                message:"Incorrect email or password !!",
                success:false
            })
        }

        //check role
        if(role !== user.role){
            return res.status(400).json({
                message:"Incorrect role !!",
                success:false
            })
        }

        const tokenData = {
            userId : user._id
        }

        const token = jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:"1d"});

        user = {
            _id : user._id,
            fullName:user.fullName,
            email:user.email,
            role:user.role,
            phoneNumber:user.phoneNumber,
            profile:user.profile
        }
        
        return res.status(200).cookie("token",token,{maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict'}).json({
            message: `Welcoe back ${user.fullName}`,
            user,
            success:true
        })

    }catch(err){
        console.log(err)
    }
}

exports.logoutUser = async (req,res)=>{
    try{
       return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"Logout successfull",
            success:true
       })
    }catch(err){
        console.log(err)
    }
}


exports.updateUser = async (req,res)=>{
    try{
        const {fullName, email, phoneNumber,bio, skills} = req.body;
        const file = req.file;
        //cloudinary setup

        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        console.log(cloudResponse)
        let skillsArr;

        if(skills){
            skillsArr = skills.split(",");
        }

        const userId = req.id;  //middleware auth
        let user = await User.findById(userId);

        if(!user){
            return res.status(404).json({
                message:"User not found",
                success:false
            })
        }

        if(fullName) user.fullName = fullName;
        if(email) user.email = email;
        if(phoneNumber) user.phoneNumber = phoneNumber;
        if(bio) user.profile.bio = bio;
        if(skillsArr) user.profile.skills = skillsArr;

        if(cloudResponse){
            user.profile.resume = cloudResponse.secure_url;
            user.profile.resumeOriginalName = file.originalname;
        }

        await user.save();

        return res.status(201).json({
            message:"User updated successfully",
            success:true,
            user
        })
    }catch(err){
        console.log(err)
    }
}