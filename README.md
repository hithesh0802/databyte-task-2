# ✅ Taskify – Databyte Task-2

Taskify is a full-stack task management application designed to help users create, manage, and collaborate on tasks and projects. Built using the **MERN stack**, it features real-time updates, push notifications, secure user authentication, and an intuitive user interface — making it perfect for both individuals and teams.

---

## 📚 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Backend API Endpoints](#-backend-api-endpoints)
- [Frontend Setup](#-frontend-setup)
- [Deployment](#-deployment)
- [Usage](#-usage)
- [Contributing](#-contributing)

---

## ✨ Features

- 👤 User authentication (JWT-based)
- 🔐 Secure data storage with MongoDB
- 📌 Create, edit, delete tasks and manage projects
- 👥 Project collaboration with friend requests
- 🔔 Real-time push notifications using Firebase
- 📊 Deadline tracking and progress visualization
- 💬 Real-time updates (Socket.io)
- 📱 Responsive (desktop-first) UI using clean CSS
- 🔎 Task and project filtering + search

---

## 🧱 Tech Stack

### Frontend
- React.js
- JavaScript, HTML
- Axios
- CSS (custom styling)

### Backend
- Node.js + Express.js
- MongoDB + Mongoose

### Others
- Firebase (for push notifications)
- Socket.io (for real-time updates)
- Render (for deployment)

---

## ⚙️ Installation

### 📦 Prerequisites

- Node.js
- npm or yarn
- MongoDB instance

### 🔧 Install Dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

---

## 🔐 Environment Variables

### Backend `.env`
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### Frontend `.env`
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_FIREBASE_KEY=your_firebase_key
```

---

## 📡 Backend API Endpoints

### 🔑 Authentication
- `POST /api/users/register` – Register a new user  
- `POST /api/users/login` – Login a user  

### 📁 Projects
- `POST /api/projects` – Create a new project  
- `GET /api/projects` – Get all projects  
- `DELETE /api/projects/:id` – Delete a project  

### ✅ Tasks
- `POST /api/tasks` – Create a new task  
- `GET /api/tasks/:id` – Get a specific task  
- `PUT /api/tasks/:id` – Update a task  
- `DELETE /api/tasks/:id` – Delete a task  

---

## 💻 Frontend Setup

```bash
cd frontend
npm start
```

The frontend will be available at: [http://localhost:3000](http://localhost:3000)

---

## 🚀 Deployment

### Backend (Render)
1. Create a new web service on [Render](https://render.com)
2. Connect your GitHub repository
3. Set environment variables as listed in `.env`
4. Deploy the service

### Frontend (Render)
1. Create a new static site on Render
2. Connect your GitHub repository
3. Set build command: `npm run build`
4. Set output directory: `build`
5. Deploy 🚀

---

## 🛠️ Usage

1. Register or login to your Taskify account.
2. Create new projects or join existing ones via friend requests.
3. Add, update, and delete tasks.
4. Track task completion via progress bars and timers.
5. Get real-time push notifications for project updates.

---

## 🤝 Contributing

Contributions are welcome!  
Feel free to open an issue or submit a pull request with:
- Bug fixes 🐛  
- Feature suggestions ✨  
- UI/UX improvements 🎨  

---

Let me know if you want this version saved as a file (`README.md`) or auto-linked to your GitHub project!
