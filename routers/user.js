const express = require("express");
const router = express.Router();

var userController = require ("../controllers/user") ; 
var verify = require('../controllers/verify')

router.post('/login' , userController.login)
router.get('/check-token' , verify.checkToken)
router.post ("/register", userController.register)
router.get("/verify-email" , userController.EmailCheck)
router.use(verify.verifyUser) 

router.get("/user-info" , userController.userInfo)
router.put("/update-user-info" , userController.updateUserInfo)

module.exports = router