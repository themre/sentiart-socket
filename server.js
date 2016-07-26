const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

let history = [];

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

io.on('connection', (socket) => {
  function send() {
    io.emit('wms send', history);
  }
  console.log('Client connected');
  send();
  socket.on('disconnect', () => console.log('Client disconnected'));
  socket.on('wms send', (msg) => {
    console.log("wms send");
    while (history.length > 30) {
      history.shift()
    }
    history.push(msg);
    send()
  });
});