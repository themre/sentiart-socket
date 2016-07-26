var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

let history = [];

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  function send() {
    io.emit('wms send', history);
  }
  send();
  socket.on('wms send', function(msg){
    while (history.length > 30) {
      history.shift()
    }
    history.push(msg);
    send()
  });
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});