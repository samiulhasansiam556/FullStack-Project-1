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
    <div className="px-40 py-12">
      <h1 className="text-3xl font-bold text-red-500 mb-4">{blog.title}</h1>
      <img
        src={blog.imageUrl}
        alt={blog.title}
        className="w-full pb-10 h-96 object-cover rounded"

      />
      <p className="text-gray-700 mb-4">{blog.description}</p>
    </div>
  );
};

export default BlogDetails;
