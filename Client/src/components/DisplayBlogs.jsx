import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Modal from 'react-modal';

const DisplayBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [likedUsers, setLikedUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem('authtoken');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/blog/userblogs`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, [token]);

  const handleLike = async (blogId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/blog/like/${blogId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(response.data.message, { position: 'top-right' });
    } catch (error) {
      console.error('Error toggling like:', error);
      toast.error('Failed to like the blog.');
    }
  };

  const fetchLikedUsers = async (blogId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/blog/likes/${blogId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLikedUsers(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching likes:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/blog/deleteblog/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update the state to remove the deleted blog
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
      toast.success(response.data.message, { position: 'top-right' });
    } catch (error) {
      if (error.response && error.response.status === 403) {
        toast.error('You are not authorized to delete this blog', { position: 'top-right' });
      } else if (error.response && error.response.status === 404) {
        toast.error('Blog not found', { position: 'top-right' });
      } else {
        console.error('Error deleting blog:', error);
        toast.error('Failed to delete blog.', { position: 'top-right' });
      }
    }
  };

  return (
    <div className="grid px-4 py-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <div key={blog._id} className="border p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full h-48 object-cover rounded mb-2"
          />
          <p>{blog.description.slice(0, 100)}...</p>

          <div className="flex justify-between mt-4">
            <button
              onClick={() => handleLike(blog._id)}
              className="text-green-500"
            >
              Like
            </button>

            <button
              onClick={() => fetchLikedUsers(blog._id)}
              className="text-blue-500"
            >
              View Likes
            </button>

            <Link
              to={`/home/detailblogs/${blog._id}`}
              className="text-blue-500 hover:underline"
            >
              Read More
            </Link>
             
            <button
              onClick={() => handleDelete(blog._id)}
              className="text-red-500"
            >
              Delete
            </button>
            
          </div>
        </div>
      ))}

      {/* Modal to display liked users */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Liked Users"
        className="bg-white p-4 rounded shadow-lg w-96 mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <h2 className="text-xl font-semibold mb-4">Users who liked this post</h2>
        <div className="max-h-60 overflow-y-auto">
          {likedUsers.map((like) => (
            <div key={like._id} className="border-b py-2">
              <p>{like.user.username} ({like.user.email})</p>
            </div>
          ))}
        </div>
        <button
          onClick={() => setIsModalOpen(false)}
          className="mt-4 text-red-500"
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default DisplayBlogs;
