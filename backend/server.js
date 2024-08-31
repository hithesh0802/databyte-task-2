const http = require('http');
const { Server } = require('socket.io');
const app = require('./app'); // your Express app
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('A user connected');
  
  socket.on('updateProject', (project) => {
    socket.broadcast.emit('projectUpdated', project);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(5000, () => {
  console.log('Server is running on port 5000');
});
