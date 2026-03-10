import TcpSocket from 'react-native-tcp-socket';

export function startTCPServer(onClientConnected) {
  const server = TcpSocket.createServer(socket => {

    console.log('Client connected');

    onClientConnected(socket);

    socket.on('error', error => {
      console.log('Socket error', error);
    });

    socket.on('close', () => {
      console.log('Connection closed');
    });

  });

  server.listen({ port: 9000, host: '0.0.0.0' });

  return server;
}