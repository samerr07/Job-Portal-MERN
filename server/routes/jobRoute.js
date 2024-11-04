const express = require("express");
const { isAuthenticated } = require("../middleware/auth");
const { postJob, getAllJobs, getJobById, getAdminJobs } = require("../controller/jobController");
const router = express.Router();

router.post("/post",isAuthenticated,postJob)
router.get("/get",isAuthenticated,getAllJobs)
router.get("/get/:id",isAuthenticated,getJobById)
router.get("/getAdminJob",isAuthenticated,getAdminJobs);

exports.router = router;