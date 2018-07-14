const express = require("express");
const router = express.Router();

var universitiesController = require ("../controllers/universities") ; 
var verify = require("../controllers/verify")
router.use(verify.verifyUser)

router.get('/university-details' , universitiesController.getUniversityData)
router.get('/all-universities' , universitiesController.getAllUniversities)
router.post("/user-interest", universitiesController.addUserUniversityInterest)
module.exports = router