# 📝 Full-Stack Blog Application

A modern, feature-rich blogging platform built with React and Node.js, featuring user authentication, image uploads, social interactions, and a clean, responsive design.

## 🌟 Features

### 🔐 Authentication & User Management
- **Secure Registration & Login** - JWT-based authentication
- **Password Reset** - Email-based password recovery system
- **Profile Management** - Edit profile with image upload support
- **Protected Routes** - Secure access to authenticated features
- **Role-based Access** - User and admin role support

### 📖 Blog Management
- **Create Blogs** - Rich blog creation with image upload
- **View Blogs** - Browse all blogs with pagination
- **Blog Details** - Individual blog post view
- **User-specific Blogs** - View blogs by specific users
- **Search Functionality** - Search blogs by username

### 💝 Social Features
- **Like/Unlike Posts** - Interactive blog engagement
- **View Likes** - See who liked specific posts
- **User Interactions** - Track and display social engagement

### 🎨 UI/UX
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Modern Interface** - Clean and intuitive user experience
- **Real-time Notifications** - Toast notifications for user feedback
- **Modal Dialogs** - Enhanced user interactions

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **React Hot Toast** - Notification system
- **React Modal** - Modal components

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **bcryptjs** - Password hashing
- **Cloudinary** - Cloud image storage
- **Multer** - File upload middleware
- **Nodemailer** - Email sending capability
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
├── Client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── routes/         # Route protection
│   │   └── assets/         # Static assets
│   ├── public/             # Public assets
│   └── package.json        # Frontend dependencies
│
├── Server/                 # Node.js Backend
│   ├── controllers/        # Business logic
│   ├── models/            # Database schemas
│   ├── routes/            # API routes
│   ├── middlewares/       # Custom middleware
│   ├── configs/           # Configuration files
│   └── package.json       # Backend dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Cloudinary account (for image storage)

### Installation

1. **Clone the repository**
   ```bash
   git clone git@github.com:samiulhasansiam556/FullStack-Project-1.git
   cd blog-application
   ```

2. **Install Backend Dependencies**
   ```bash
   cd Server
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../Client
   npm install
   ```

4. **Environment Setup**

   Create `.env` file in the `Server` directory:
   ```env
   DATABASE_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=4000
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password
   ```

   Create `.env` file in the `Client` directory:
   ```env
   VITE_SERVER_URL=http://localhost:4000
   ```

### 🏃‍♂️ Running the Application

1. **Start the Backend Server**
   ```bash
   cd Server
   npm run dev
   ```

2. **Start the Frontend Development Server**
   ```bash
   cd Client
   npm run dev
   ```

3. **Access the Application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:4000`

## 🔗 API Endpoints

### Authentication
- `POST /api/user/register` - User registration
- `POST /api/user/login` - User login
- `POST /api/user/reset-password` - Password reset request
- `PUT /api/user/reset-password/:id/:token` - Reset password

### User Management
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `PUT /api/user/change-password` - Change password

### Blog Management
- `POST /api/blog/createblog` - Create new blog
- `GET /api/blog/userblogs` - Get user's blogs
- `GET /api/blog/allblogs` - Get all blogs
- `GET /api/blog/:id` - Get specific blog
- `POST /api/blog/like/:id` - Like/unlike blog
- `GET /api/blog/likes/:id` - Get blog likes

## 📱 Screenshots

<img width="1919" height="866" alt="Screenshot 2025-07-21 013257" src="https://github.com/user-attachments/assets/d0ec3678-5a2f-4888-8623-440f7fa1e6e4" />
<img width="1918" height="864" alt="Screenshot 2025-07-21 013312" src="https://github.com/user-attachments/assets/3164869a-3577-4cd4-a255-7b69e4935305" />
<img width="1918" height="864" alt="Screenshot 2025-07-21 014636" src="https://github.com/user-attachments/assets/c755ba94-248f-437a-b69d-87deeb5b21e8" />



## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Samiul Hasan Siam
01704479730
samiulhasansiam556@gmail.com

## 🙏 Acknowledgments

- React team for the amazing framework
- Express.js for the robust backend framework
- MongoDB for the flexible database solution
- Cloudinary for image storage and management
- All other open-source libraries used in this project

---

⭐ Star this repository if you found it helpful!
