const mongoose = require("mongoose");


const databaseConnection = async()=>{
    
    await mongoose.connect(process.env.MONGO_URL)
    console.log("Database Connected !!")
}

module.exports = databaseConnection;