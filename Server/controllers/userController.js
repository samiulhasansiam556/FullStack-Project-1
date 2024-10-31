import UserModel from "../models/userModel.js";
import Blog from '../models/blogSchema.js';


import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import transporter from "../configs/emailConfig.js";

import fs from 'fs';  // Add this import if missing
import path from 'path';  // Add this import if missing



class UserController {
   
    static userRegistration = async (req, res) => {
        const { name,username, email, password, password_confirmation } = req.body
        const user = await UserModel.findOne({ email: email })
        if (user) {
          res.send({ "status": "failed", "message": "Email already exists" })
        } else {

          const existingUser = await UserModel.findOne({
            username: req.body.username,
          });

          if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
          }
      

          if (name && username && email && password && password_confirmation) {
            if (password === password_confirmation) {
              try {
                const salt = await bcrypt.genSalt(10)
                const hashPassword = await bcrypt.hash(password, salt)
                const doc = new UserModel({
                  name: name,
                  username: username,
                  email: email,
                  password: hashPassword,
        
                })
                await doc.save()
                const saved_user = await UserModel.findOne({ email: email })
                // Generate JWT Token
                const token = jwt.sign({ userID: saved_user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
                res.status(201).send({ "status": "success", "message": "Registration Success", "token": token })
              } catch (error) {
                console.log(error)
                res.send({ "status": "failed", "message": "Unable to Register" })
              }
            } else {
              res.send({ "status": "failed", "message": "Password and Confirm Password doesn't match" })
            }
          } else {
            res.send({ "status": "failed", "message": "All fields are required" })
          }
        }
      }


    static userLogin = async (req, res) => {
        try {
          const { email, password } = req.body
          if (email && password) {
            const user = await UserModel.findOne({ email: email })
            if (user != null) {
              const isMatch = await bcrypt.compare(password, user.password)
              if ((user.email === email) && isMatch) {
                // Generate JWT Token
                const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
                res.send({ "status": "success", "message": "Login Success", "token": token })
              } else {
                res.send({ "status": "failed", "message": "Email or Password is not Valid" })
              }
            } else {
              res.send({ "status": "failed", "message": "You are not a Registered User" })
            }
          } else {
            res.send({ "status": "failed", "message": "All Fields are Required" })
          }
        } catch (error) {
          console.log(error)
          res.send({ "status": "failed", "message": "Unable to Login" })
        }
      }

  
      static updateUser = async (req, res) => {
        try {
          const userId = req.user.id;
          const user = await UserModel.findById(userId);
      
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
      
          // Validate for duplicate username before proceeding
          const existingUser = await UserModel.findOne({
            username: req.body.username,
            _id: { $ne: userId },
          });
          if(existingUser){
            const recentImage = path.join(process.cwd(), req.file.path);
            fs.unlink(recentImage, (err) => {
              if (err) console.error('Failed to delete old photo:', err);
              else console.log('Old photo deleted successfully.');
            });
          }
      
          if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
          }
      
          // Delete old profile image if a new one is uploaded
          if ( req.file) {
            const oldImagePath = path.join(process.cwd(), user.profileImage);
            fs.unlink(oldImagePath, (err) => {
              if (err) console.error('Failed to delete old photo:', err);
              else console.log('Old photo deleted successfully.');
            });
          }
      
          // Prepare updated user data
          const updatedData = {
            name: req.body.name,
            username: req.body.username,
            phone: req.body.phone,
            address: req.body.address,
            profileImage: req.file ? req.file.path : user.profileImage,
          };
      
          // Update user in DB
          const updatedProfile = await UserModel.findByIdAndUpdate(userId, updatedData, { new: true });
          res.json({ user: updatedProfile, message: 'Profile updated successfully' });
      
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Error updating profile' });
        }
      };
      
    
    // static updateUser = async (req, res) => {

    //   const user = await UserModel.findById(req.body.id);

    //   if (!user) {
    //     return res.status(404).json({ message: "User not found" });
    //   }

    //   // Delete the existing photo if present
    //   if (user.profileImage) {
    //     const oldImagePath = path.join(process.cwd(), user.profileImage);
    //     fs.unlink(oldImagePath, (err) => {
    //       if (err) console.error("Failed to delete old photo:", err);
    //       else console.log("Old photo deleted successfully.");
    //     });
    //   }

    //     // console.log(req.body.name)
    //     // console.log(req.body.phone)
    //     // console.log(req.file.path)
    //     try {
    //       const updatedData = {
    //         name: req.body.name,
    //         phone: req.body.phone,
    //         address: req.body.address,
    //         profileImage: req.file.path, 
    //       };
      
    //       // Update the existing user profile, assuming user ID is stored in req.user.id
    //       const updatedProfile = await UserModel.findByIdAndUpdate(req.user.id, updatedData, { new: true });
      
    //       res.json(updatedProfile);
    //     } catch (error) {
    //       res.status(500).json({ error: 'Error updating profile' });
    //     }
    //   };
      
      
    
  static changeUserPassword = async (req, res) => {
    const { password, password_confirmation } = req.body
    if (password && password_confirmation) {
      if (password !== password_confirmation) {
        res.send({ "status": "failed", "message": "New Password and Confirm New Password doesn't match" })
      } else {
        const salt = await bcrypt.genSalt(10)
        const newHashPassword = await bcrypt.hash(password, salt)
        await UserModel.findByIdAndUpdate(req.user._id, { $set: { password: newHashPassword } })
        res.send({ "status": "success", "message": "Password changed succesfully" })
      }
    } else {
      res.send({ "status": "failed", "message": "All Fields are Required" })
    }
  }

  static loggedUser = async (req, res) => {
    res.send({ "user": req.user })
  }

  static sendUserPasswordResetEmail = async (req, res) => {
    const { email } = req.body
    if (email) {
      const user = await UserModel.findOne({ email: email })
      if (user) {
        const secret = user._id + process.env.JWT_SECRET_KEY
        const token = jwt.sign({ userID: user._id }, secret, { expiresIn: '15m' })
        const link = `https://b-practice-4.netlify.app/resetpassword/${user._id}/${token}`
      
        
       // Send Email
        let info = await transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: user.email,
          subject: "Samiul - Password Reset Link",
          html: `<a href=${link}>Click Here</a> to Reset Your Password`,
        })
        
        res.send({ "status": "success", "message": "Password Reset Email Sent... Please Check Your Email" })

      } else {
        res.send({ "status": "failed", "message": "Email doesn't exists" })
      }
    } else {
      res.send({ "status": "failed", "message": "Email Field is Required" })
    }
  } 

     

  static userPasswordReset = async (req, res) => {
    const { password, password_confirmation } = req.body
    const { id, token } = req.params
    const user = await UserModel.findById(id)
    const new_secret = user._id + process.env.JWT_SECRET_KEY
    try {
      jwt.verify(token, new_secret)
      if (password && password_confirmation) {
        if (password !== password_confirmation) {
          res.send({ "status": "failed", "message": "New Password and Confirm New Password doesn't match" })
        } else {
          const salt = await bcrypt.genSalt(10)
          const newHashPassword = await bcrypt.hash(password, salt)
          await UserModel.findByIdAndUpdate(user._id, { $set: { password: newHashPassword } })
          res.send({ "status": "success", "message": "Password Reset Successfully" })
        }
      } else {
        res.send({ "status": "failed", "message": "All Fields are Required" })
      }
    } catch (error) {
      console.log(error)
      res.send({ "status": "failed", "message": "Invalid Token" })
    }
  }

  static findUserandBlog = async (req, res) => {
    const { username } = req.params;
  
    try {
      // Find user by username
      const user = await UserModel.findOne({ username }).populate('posts');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Fetch user's posts
      const posts = await Blog.find({ user: user._id });
  
      res.status(200).json({ user, posts });
    } catch (error) {
      console.error('Error searching user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };


}



export default UserController 

