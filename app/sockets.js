const WSServer = require('ws').Server;
const uniqueId = require('lodash').uniqueId;

module.exports = function (app) {
  const sockets = {};
  const http = require('http').Server(app);
  const httpListener = http.listen(3001);

  const wsListener = new WSServer({server: http})

  wsListener.on('connection', (socket) => {
    const id = uniqueId();
    sockets[id] = socket;
    socket.on('close', () => {
      console.log('socket closed');
      delete sockets[id];
      console.log(sockets)
    })
  });

  return {wsListener, httpListener, sockets}
}
