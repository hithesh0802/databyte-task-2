const express= require('express');
const app= express();
const http = require('http');
const { Server } = require('socket.io');
const bodyparser= require('body-parser');
const cors= require('cors');
const PORT= process.env.PORT || 5000;
const mongoose= require('mongoose');
const dotenv= require('dotenv');
const dbConfig= require('./config/db');
const authRoutes= require('./routes/authRoutes');
const taskRoutes= require('./routes/Tasks');
const projectRoutes= require('./routes/Projects');
const userRoutes= require('./routes/Users');

dotenv.config();
const server = http.createServer(app); 
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", 
    methods: ["GET", "POST"]
  }
});

mongoose.connect(dbConfig.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{
    console.log('connected!');
  }).catch(err=>{
    console.log('failed',err);
  });

app.use(express.json());
app.use(bodyparser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/tasks',taskRoutes);
app.use('/api/projects',projectRoutes);
app.use('/api/users',userRoutes);

io.on('connection', (socket) => {
  // console.log('New client connected');
  
  socket.on('joinProjectRoom', ({ projectId }) => {
    socket.join(projectId);
  });

  socket.on('leaveProjectRoom', ({ projectId }) => {
    socket.leave(projectId);
  });

  socket.on('disconnect', () => {
    // console.log('Client disconnected');
  });
});

server.listen(PORT,()=>{
    console.log(`connected to server on port ${PORT}!`)
});