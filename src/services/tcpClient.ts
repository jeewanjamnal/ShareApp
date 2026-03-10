import TcpSocket from 'react-native-tcp-socket';

export function connectToDevice(ip, port) {
  const client = TcpSocket.createConnection({
    host: ip,
    port: port,
  });

  return client;
}