const cors = require('cors');
const express = require('express');
const app = express();

const corsOptions = {
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
};

app.use(cors(corsOptions));

const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true
    }
});

const users = {}; 

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('new-user-joined', (username) => {
    users[socket.id] = username;
    socket.broadcast.emit('user-joined', username); 
    console.log(`${username} joined the chat`);
  });

  // Handle message sending
  socket.on('send', (message) => {
    const username = users[socket.id];
    socket.broadcast.emit('receive', { username, message }); // Broadcast to other users
  });

  // Handle user disconnect
  socket.on('disconnect', () => {
    const username = users[socket.id];
    socket.broadcast.emit('left',username);
    delete users[socket.id]; // Remove user from list
    console.log(`${username} disconnected`);
  });
});

// Start WebSocket server on port 9000
server.listen(9000, () => {
  console.log('WebSocket server running on http://localhost:9000');
});
