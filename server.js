// var app = require('express')();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);



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

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
//


// const express = require('express');
// const SocketServer = require('ws').Server;
// const path = require('path');

// const PORT = process.env.PORT || 3000;
// const INDEX = path.join(__dirname, 'index.html');

// const server = express()
//   .use((req, res) => res.sendFile(INDEX) )
//   .listen(PORT, () => console.log(`Listening on ${ PORT }`));

// const wss = new SocketServer({ server });

// wss.on('connection', (ws) => {
//   function send() {
//     io.emit('wms send', history);
//   }
//   console.log('Client connected');
//   send();
//   ws.on('close', () => console.log('Client disconnected'));
//   ws.on('wms send', (msg) => {
//     while (history.length > 30) {
//       history.shift()
//     }
//     history.push(msg);
//     send()
//   });
// });
// setInterval(() => {
//   wss.clients.forEach((client) => {
//     client.send(new Date().toTimeString());
//   });
// }, 1000);

// setInterval(() => {
//   wss.clients.forEach((client) => {
//     client.send(new Date().toTimeString());
//   });
// }, 1000);

//
// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/index.html');
// });

// io.on('connection', function(socket){
//   function send() {
//     io.emit('wms send', history);
//   }
//   send();
//   socket.on('wms send', function(msg){
//     while (history.length > 30) {
//       history.shift()
//     }
//     history.push(msg);
//     send()
//   });
// });


// http.listen(3000, function(){
//   console.log('listening on *:3000');
// });