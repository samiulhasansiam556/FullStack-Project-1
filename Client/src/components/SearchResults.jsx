import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Adjust if your app's root element ID differs

const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

const SearchResults = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [likedUsers, setLikedUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem("authtoken");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(
          `${VITE_SERVER_URL}/api/user/search/${username}`
        );
        setUser(response.data.user);
        setPosts(response.data.posts);
      } catch (err) {
        console.error("Error fetching user and posts:", err);
        setError("User not found or failed to fetch posts.");
      }
    };

    fetchResults();
  }, [username]);

  const handleLike = async (postId) => {
    try {
      const response = await axios.post(
        `${VITE_SERVER_URL}/api/blog/like/${postId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(response.data.message, { position: "top-right" });
    } catch (error) {
      console.error("Error liking the post:", error);
      toast.error("Failed to like the post.", { position: "top-right" });
    }
  };

  const fetchLikedUsers = async (postId) => {
    try {
      const response = await axios.get(
        `${VITE_SERVER_URL}/api/blog/likes/${postId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLikedUsers(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching liked users:", error);
    }
  };

  if (error) return <p>{error}</p>;

  return (
    <>
      <h2 className="text-2xl text-center font-bold mb-4">Posts by {user?.name}</h2>
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post._id} className="border p-4 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-48 object-cover rounded mb-2"
            />
            <p>{post.description.slice(0, 100)}...</p>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleLike(post._id)}
                className="text-green-500"
              >
                Like
              </button>

              <div className="flex space-x-4"> {/* New flex container for "View Likes" and "Read More" */}
                <button
                  onClick={() => fetchLikedUsers(post._id)}
                  className="text-blue-500"
                >
                  View Likes
                </button>

                <Link
                  to={`/home/detailblogs/${post._id}`}
                  className="text-blue-500 hover:underline"
                >
                  Read More
                </Link>
              </div>
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
          ariaHideApp={false}
        >
          <h2 className="text-xl font-semibold mb-4">Users who liked this post</h2>
          <div className="max-h-60 overflow-y-auto">
            {likedUsers.map((like) => (
              <div key={like._id} className="border-b py-2">
                <p>
                  {like.user.username} ({like.user.email})
                </p>
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
    </>
  );
};

export default SearchResults;
