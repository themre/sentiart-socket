const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

let history = ["testUrl"];

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);
// io.configure(function () { 
//   io.set("transports", ["xhr-polling"]); 
//   io.set("polling duration", 10); 
// });

io.on('connection', (socket) => {
  function send() {
    io.emit('wms send', history);
  }
  console.log('Client connected');
  send();
  socket.on('disconnect', () => console.log('Client disconnected'));
  socket.on('wms send', () => {
    while (history.length > 30) {
      history.shift()
    }
    history.push(msg);
    send()
  });
});

// setInterval(() => io.emit('time', new Date().toTimeString()), 1000);