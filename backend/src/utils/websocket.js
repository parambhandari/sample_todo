const socketIo = require('socket.io');
let clients = [];

const setupWebSocket = (server) => {
  const io = new socketIo.Server(server, {
    cors: {
      origin: 'http://localhost:3000', 
      methods: ['GET', 'POST' ,'PUT' , 'DELETE'], 
      allowedHeaders: ['Content-Type'], 
      credentials: true, 
    },
  });

  io.on('connection', (socket) => {
    clients.push(socket);
    console.log('New WebSocket connection established');

    socket.on('message', (message) => {
      clients.forEach((client) => {
        if (client !== socket) {
          client.emit('message', message); 
        }
      });
    });

    socket.on('disconnect', () => {
      clients = clients.filter((client) => client !== socket);
      console.log('WebSocket client disconnected');
    });

    socket.on('error', (error) => {
      console.error('WebSocket error:', error);
    });
  });

  console.log('WebSocket server initialized');
};

module.exports = setupWebSocket;
