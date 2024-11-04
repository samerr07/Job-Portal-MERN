const express = require("express");
const { isAuthenticated } = require("../middleware/auth");
const { registerCompany, getCompany, getCompanyById, updateCompany } = require("../controller/companyController");
const { singleUpload } = require("../middleware/multer");
const router = express.Router();


router.post("/register",isAuthenticated, registerCompany);
router.get("/getCompany",isAuthenticated,getCompany);
router.get("/getCompany/:id",isAuthenticated,getCompanyById);
router.put("/updateCompany/:id",isAuthenticated,singleUpload,updateCompany);


exports.router = router;