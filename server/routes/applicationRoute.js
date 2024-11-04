const express = require("express");
const { isAuthenticated } = require("../middleware/auth");
const { applyJob, getAppliedJobs, getApplicants, updateStatus } = require("../controller/applicationController");
const router = express.Router();


router.get("/apply/:id",isAuthenticated,applyJob);
router.get("/get",isAuthenticated,getAppliedJobs);
router.get("/get/:id/applicants",isAuthenticated,getApplicants);
router.post("/status/:id/update",isAuthenticated,updateStatus)


exports.router = router;