
import express from "express";
import UserController from "../controllers/userController.js";
import checkUserAuth from "../middlewares/user-auth-middlewares.js";
import upload from "../configs/multerConfig.js"


const router = express.Router();

//Route Level Middleware - To Protect Routecons
router.use('/changepassword', checkUserAuth)
router.use('/loggeduser', checkUserAuth)
router.use('/updateuser', checkUserAuth)
router.use('/search/:username',checkUserAuth)


//Public Routes
router.post('/register', UserController.userRegistration);
router.post('/login', UserController.userLogin)
router.post('/send-reset-password-email', UserController.sendUserPasswordResetEmail)
router.post('/reset/:id/:token', UserController.userPasswordReset)



//Protected Routes
router.post('/changepassword', UserController.changeUserPassword)
router.get('/loggeduser', UserController.loggedUser)
router.post('/updateuser',upload.single("image") ,UserController.updateUser)
router.get('/search/:username',UserController.findUserandBlog)


export default router