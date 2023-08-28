const express = require('express');
const app=express();
const router = express.Router();
const UserController =require( '../controllers/user.js');
const {checkUserAuth,validateUser} = require('../middlewares/auth-middleware.js');
const helmet= require("helmet")
app.use(helmet());
// // ROute Level Middleware - To Protect Route
router.use('/loggeduser', checkUserAuth)
// router.use('/login', validateUser)
// Public Routes
router.post('/register', UserController.userRegistration)
router.post('/login', UserController.userLogin)
router.post('/send-reset-password-email', UserController.sendUserPasswordResetEmail)
router.post('/reset-password/:id/:token', UserController.userPasswordReset)

// // Protected Routes
router.get('/loggeduser', UserController.loggedUser)


module.exports = router;