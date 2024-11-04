const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phoneNumber:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type:String,
        enum:['student','recruiter'],
        required: true
    },
    profile:{
        bio:{
            type: String,
        },
        resume:{
            type: String,
        },
        skills:[{
            type: String,
        }],
        resumeOriginalName:{
            type: String,
        },
        company:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company'
        },
        profilePhoto:{
            type: String,
            default:""
        }
    }
},{timestamps:true})

exports.User = mongoose.model("User",userSchema);