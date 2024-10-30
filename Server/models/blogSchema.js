// import mongoose from "mongoose";

// const blogSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   imageUrl: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// const Blog = mongoose.model("Blog", blogSchema);

// export default Blog;


// models/blogSchema.js
import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User ID
  createdAt: { type: Date, default: Date.now },
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
