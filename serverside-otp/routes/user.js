var express = require('express');
var router = express.Router();
// Require the controllers WHICH WE DID NOT CREATE YET!!
var userController = require('../controllers/user');
// a simple test url to check that all of our files are communicating correctly.
router.get('/test', userController.test);
router.post('/register', userController.register);
router.post('/verifyAuth', userController.verifyAuth);
router.post('/verifyOtp', userController.verifyOtp);
router.post('/sendOtp', userController.sendOtp);
router.post('/resendOtp', userController.resendOtp);
module.exports = router;