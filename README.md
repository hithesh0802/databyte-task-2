Taskify Project
Table of Contents
Introduction
Features
Tech Stack
Installation
Environment Variables
Backend API Endpoints
Frontend Setup
Deployment
Usage
Contributing
License
Introduction
Taskify is a task management application designed to help users create, manage, and collaborate on tasks and projects. The app supports real-time updates, notifications, project collaboration, and more. It is built using the MERN stack and is designed to be user-friendly and visually appealing.

Features
User Authentication
Create, Edit, and Delete Tasks
Project Management with Collaboration Features
Real-time Notifications
Task Dependencies and Subtasks
Analytics Dashboard
Responsive Design
Tech Stack
Frontend:

React.js
Axios
CSS (Custom Styling)
Backend:

Node.js
Express.js
MongoDB
Mongoose
Other Technologies:

Socket.io (for real-time updates)
Firebase (for push notifications)
Render.com (for deployment)
Installation
Prerequisites
Node.js
npm or yarn
MongoDB

Install Dependencies
Backend

cd backend
npm install

Frontend

cd ../frontend
npm install
Environment Variables
Create a .env file in the backend directory and configure the following environment variables:

Copy code
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
FRONTEND_URL=http://localhost:3000
Create a .env file in the frontend directory and configure the following environment variables:

REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_FIREBASE_KEY=your_firebase_key

Backend API Endpoints
Authentication
POST /api/users/register - Register a new user
POST /api/users/login - Login a user
Projects
POST /api/projects - Create a new project
GET /api/projects - Get all projects
DELETE /api/projects/:id - Delete a project
Tasks
POST /api/tasks - Create a new task
GET /api/tasks/:id - Get a specific task
PUT /api/tasks/:id - Update a task
DELETE /api/tasks/:id - Delete a task
Frontend Setup
Navigate to the frontend directory.

Start the development server:

npm start

The frontend should now be running on http://localhost:3000.
Deployment
Backend
The backend is deployed on Render.com. You can deploy it by following these steps:

Create a new web service on Render.
Connect your GitHub repository to Render.
Set up environment variables as mentioned in the .env file.
Deploy the service.
Frontend
The frontend is also deployed on Render.com:

Create a new static site on Render.
Connect your GitHub repository to Render.
Build the frontend and deploy.
Usage
Register or log in to the application.
Create or join projects.
Manage tasks within your projects.
Receive real-time notifications for task updates.
Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or new features.
