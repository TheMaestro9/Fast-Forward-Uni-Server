const verify = require("../controllers/verify")
const express = require("express");
const router = express.Router();

vrVideoController = require ("../controllers/vr-videos") ; 

router.use(verify.verifyUser)
router.get('/all-videos' , vrVideoController.getVrVideos)


module.exports = router