const express = require("express")
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const databaseConnection = require("./config/database");
const userRoute = require("./routes/userRoute");
const companyRoute = require("./routes/companyRoute");
const jobRoute = require("./routes/jobRoute");
const applicationRoute = require("./routes/applicationRoute");
const path = require("path");

//creating server

const server = express();

const _dirname = path.resolve();

//configuring server

dotenv.config();

//connect database

databaseConnection();

//middlewares
server.use(express.json());
server.use(cookieParser());
server.use(express.urlencoded({extended:true}));

const corsOptions = {
    origin:true,
    credentials:true
}
server.use(cors(corsOptions));


//demo server

// server.get("/",(req,res)=>{
//     res.send("Hello World")
// })

//Apis
server.use("/api/v1/user",userRoute.router)
server.use("/api/v1/company",companyRoute.router)
server.use("/api/v1/job",jobRoute.router)
server.use("/api/v1/application",applicationRoute.router);


server.use(express.static(path.join(_dirname, "/client/dist")));
server.get('*', (_,res) => {
    res.sendFile(path.resolve(_dirname, "client", "dist", "index.html"));
});

// listen to server 

server.listen("8080",()=>{
    console.log("Server is started !!!")
})