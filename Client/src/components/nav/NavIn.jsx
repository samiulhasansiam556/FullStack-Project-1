import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

function NavIn() {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [authUser, setAuthUser] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // const profileImagePath = authUser.profileImage
  //   ? `${VITE_SERVER_URL}/${authUser.profileImage.replace(/\\/g, '/')}`
  //   : '/default-profile.png';
  
  //   console.log(VITE_SERVER_URL, authUser.profileImage, profileImagePath);


  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('authtoken');
      try {
        const response = await axios.get(`${VITE_SERVER_URL}/api/user/loggeduser`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAuthUser(response.data.user);
        localStorage.setItem('authuser', JSON.stringify(response.data.user));
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    setIsProfileModalOpen(false);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('authtoken');
    localStorage.removeItem('authuser');
    navigate('/signin');
  };

  const handleSearch = () => {
    navigate(`/home/search/${searchTerm}`);
  };

  return (
    <div className="bg-blue-700 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-8">
        <div className="text-white text-2xl font-bold">MyPookie</div>

        <div className="flex items-center space-x-4">
          {/* Profile Icon */}
          <button
            onClick={() => setIsProfileModalOpen(true)}
            className="focus:outline-none rounded-full overflow-hidden border-2 border-white"
          >
            <img
              src={authUser.profileImage}
              alt="Profile"
              className="w-10 h-10 md:w-12 md:h-12 object-cover"
            />
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Search and Create Blog Section */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center mt-4 px-4 md:px-8">
        <div className="relative w-full md:w-1/2 mb-4 md:mb-0">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by username"
            className="py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
          <button
            onClick={handleSearch}
            className="absolute right-0  mt-0 mr-0 bg-black text-white font-semibold py-2.5 px-4 rounded hover:bg-blue-600 transition"
          >
            Search
          </button>
        </div>

        {/* Create Blog Button */}
        <button
          onClick={() => navigate('/home/createblogs')}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition w-full md:w-auto"
        >
          Create Blog
        </button>
      </div>

      {/* Profile Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Profile</h3>
            <div className="flex items-center mb-4">
              <img
                src={authUser.profileImage}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover mr-4 border-2"
              />
              <div>
                <p className="text-lg font-bold">{authUser.name || 'Guest'}</p>
                <p className="text-gray-600">{authUser.email || 'N/A'}</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/home/editprofile')}
              className="bg-gray-200 py-2 px-4 rounded w-full mb-2"
            >
              Edit Profile
            </button>
            <button
              onClick={() => navigate('/home/changepassword')}
              className="bg-blue-500 text-white py-2 px-4 rounded w-full"
            >
              Change Password
            </button>
            <button
              onClick={() => setIsProfileModalOpen(false)}
              className="mt-4 text-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavIn;
