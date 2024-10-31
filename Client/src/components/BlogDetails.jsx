import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BlogDetails = () => {
  const { id } = useParams(); // Get blog ID from route params
  const [blog, setBlog] = useState(null);
  const token = localStorage.getItem('authtoken');

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/blog/getblog/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBlog(response.data);
      } catch (error) {
        console.error('Error fetching blog details:', error);
      }
    };
  
    fetchBlogDetails();
  }, [id, token]);
  

  if (!blog) {
    return <div>Loading blog details...</div>;
  }

  return (
    <div className="px-4 sm:px-12 md:px-16 lg:px-40 py-6 md:py-12">
      <h1 className="text-2xl md:text-3xl font-bold text-red-500 mb-4">{blog.title}</h1>
      <img
        src={blog.imageUrl}
        alt={blog.title}
        className="w-full h-64 md:h-96 object-cover rounded mb-6"
      />
      <p className="text-gray-700 text-sm md:text-base">{blog.description}</p>
    </div>
  );
};

export default BlogDetails;
