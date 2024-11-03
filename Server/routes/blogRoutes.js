

// routes/blogRoutes.js
import express from "express";
import { createBlog, getUserBlogs,getBlogById,deleteBlog,toggleLike,getBlogLikes} from "../controllers/blogController.js";
import checkUserAuth from "../middlewares/user-auth-middlewares.js";
import upload from "../configs/multerConfig.js";

const router = express.Router();

router.post('/createblog', checkUserAuth, upload.single('image'), createBlog); 
router.get('/userblogs', checkUserAuth, getUserBlogs); 
router.get('/getblog/:id', getBlogById);
router.delete('/deleteblog/:id', checkUserAuth, deleteBlog);
router.post('/like/:blogId', checkUserAuth, toggleLike);
router.get('/likes/:blogId', checkUserAuth, getBlogLikes);

export default router;
