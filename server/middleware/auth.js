const jwt = require("jsonwebtoken");

exports.isAuthenticated = async(req,res,next)=>{
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                message:"authorization denied",
                success:false
            })
        }
        const decode = await jwt.verify(token,process.env.SECRET_KEY);

        if(!decode){
            return res.status(401).json({
                message:"Invalid token",
                success:false
            })
        }

        req.id = decode.userId;
        next();
    }catch(err){
        console.log(err)
    }
}