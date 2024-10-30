import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import { Toaster } from 'react-hot-toast';

import HomeOut from './pages/home/HomeOut';
import HomeIn from './pages/home/HomeIn';
import ProtectedRoute from './routes/ProtectedRoute';
import SignUp from './pages/signup/SignUp';
import SignIn from './pages/signin/SignIn';
import ChangePassword from './pages/changepassword/ChangePassword';
import ResetEmailSend from './pages/resetpassword/ResetEmailSend';
import ResetPassword from './pages/resetpassword/ResetPassword';
 import ProfileEdit from './pages/profile/ProfileEdit';
import NotFound from './pages/notfound/NotFound'; // New 404 component
import CreateBlogs from './components/CreateBlogs';
import DisplayBlogs from './components/DisplayBlogs';
import BlogDetails from './components/BlogDetails';
import SearchResults from './components/SearchResults';
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomeOut />,
    },
    {
      path: '/home',
      element: <ProtectedRoute />,
      children: [
        {
          path: '',
          element: <HomeIn/>,
        },
        {
          path: 'changepassword',
          element: <ChangePassword />,
        }, 
        {
          path: 'editprofile',
           element: <ProfileEdit />,
        },
        {
          path: 'createblogs',
          element: <CreateBlogs/>,
        },
        {
          path: 'displayblogs',
          element: <DisplayBlogs/>,
        }, 
        {
          path: 'detailblogs/:id',
          element: <BlogDetails/>,
        }, 
        {
          path: 'search/:username',
          element:<SearchResults/>
        }
       
       
      ],
    },
   
    {
      path: '/signup',
      element: <SignUp />,
    },
    {
      path: '/signin',
      element: <SignIn />,
    },
    {
      path: '/resetemailsend',
      element: <ResetEmailSend />,
    },
    {
      path: '/resetpassword/:id/:token',
      element: <ResetPassword />,
    },
    // Catch-all 404 route
    {
      path: '*',
      element: <NotFound />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;
