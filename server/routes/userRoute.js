const express = require("express");
const { registerUser, loginUser, logoutUser, updateUser } = require("../controller/userController");
const { isAuthenticated } = require("../middleware/auth");
const { singleUpload } = require("../middleware/multer");
const router = express.Router();


router.post("/register", singleUpload,registerUser);
router.post("/login",loginUser);
router.get("/logout",logoutUser);
router.post("/updateUser",isAuthenticated ,singleUpload,updateUser);


exports.router = router;