import TcpSocket from 'react-native-tcp-socket';

export function connectToDevice(ip, port) {
  const client = TcpSocket.createConnection({
    host: ip,
    port: port,
  });

  client.on('connect', () => {
    console.log('Connected to receiver');
  });

  client.on('error', error => {
    console.log(error);
  });

  return client;
}