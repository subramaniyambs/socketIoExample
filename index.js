var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.on('chat message', function (msg) {
    io.emit('chat message', msg);
  });
});

function sendmsg(msg) {
  io.emit('chat message', msg);
}

setInterval(() => {
  var message = "hello am from Server";
  sendmsg(message)
}, 2000);


http.listen(port, function () {
  console.log('listening on *:' + port);
});
