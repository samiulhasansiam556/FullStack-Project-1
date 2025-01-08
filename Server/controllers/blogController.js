

import mongoose from 'mongoose';
import Blog from '../models/blogSchema.js';
import Like from '../models/likeModel.js';
import User from '../models/userModel.js';
import cloudinary from 'cloudinary';
import fs from 'fs'; 

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


export const createBlog = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user._id; 

    // console.log(req.user);
    // console.log(req.file);

    const uploadResponse = await cloudinary.uploader.upload(req.file.path);

    const newBlog = new Blog({
      title,
      description,
      imageUrl: uploadResponse.secure_url,
      user: userId, 
    });

    await newBlog.save();

    // Save blog ID in the user's posts array
    await User.findByIdAndUpdate(userId, { $push: { posts: newBlog._id } });

    // Delete the file from the local path after successful upload
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
      } else {
        console.log('File deleted successfully');
      }
    });

    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ error: 'Error creating blog post' });
    console.log(error);
  }
};

// Get all posts of a user
export const getUserBlogs = async (req, res) => {
  try {
    const userId = req.user._id;
    const blogs = await Blog.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user blogs' });
  }
};

 //Get a single blog by ID
export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch the blog' });
  }
};

//delete blog
export const deleteBlog = async (req, res) => {
    try {
      const { id } = req.params; // Blog ID from the request parameters
  
      // Find the blog to delete
      const blog = await Blog.findById(id);
      if (!blog) return res.status(404).json({ message: 'Blog not found' });
  
      // Ensure the logged-in user is the blog owner
      if (blog.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'You are not authorized to delete this blog' });
      }
  
      // Delete the blog from the Blog collection
      const deleteImg = await Blog.findByIdAndDelete(id);
  
  
      if(deleteImg.imageUrl){
        const publicId = deleteImg.imageUrl.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(publicId);
      }
  
      // Remove the blog ID from the user's collection
      await User.findByIdAndUpdate(req.user._id, { $pull: { blogs: id } });
  
      res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
      console.error('Error deleting blog:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

//like
export const toggleLike = async (req, res) => {
  try {
    const { blogId } = req.params;
    const userId = req.user._id;

    // Validate if the blogId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).json({ message: 'Invalid Blog ID' });
    }

    // Check if the user already liked the blog
    const existingLike = await Like.findOne({ blog: blogId, user: userId });

 
    if (existingLike) {
      // If already liked, remove the like (unlike)
      await Like.findByIdAndDelete(existingLike._id);
      return res.status(200).json({ message: 'Blog unliked!' });
    } else {
      // Create a new like
      const newLike = new Like({ blog: blogId, user: userId });
      await newLike.save();
      return res.status(201).json({ message: 'Blog liked!' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to toggle like' });
  }
};



// Fetch users who liked a blog
export const getBlogLikes = async (req, res) => {
  try {
    const { blogId } = req.params;
    const likes = await Like.find({ blog: blogId }).populate('user', 'name username email');
  //  console.log(likes)
    res.status(200).json(likes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch likes' });
  }
};