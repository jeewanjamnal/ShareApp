import dgram from 'react-native-udp';

const BROADCAST_PORT = 41234;

export function startListening(onDeviceFound) {
  const socket = dgram.createSocket('udp4');

  socket.bind(BROADCAST_PORT);

  socket.on('message', (msg, rinfo) => {
    const data = JSON.parse(msg.toString());

    if (data.type === 'DISCOVER') {
      onDeviceFound({
        ip: rinfo.address,
        name: data.deviceName,
        port: data.tcpPort,
      });
    }
  });

  return socket;
}