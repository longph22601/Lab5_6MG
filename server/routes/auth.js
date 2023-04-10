const express = require('express');
const authRout = require('../controller/authController');
const router = express.Router();
const middleware = require('../controller/midlewareController');
const verifyres= require('../controller/verifyRest');
const verify= require('../controller/verify');

router.post('/register',authRout.registerUser);
router.post('/login',authRout.loginUser);
router.post('/reslogin',authRout.loginresUser);
router.post('/logout',authRout.userLogout);
// router.post("/refresh",authRout.requestRefreshToken);
module.exports = router;