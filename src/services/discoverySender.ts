import dgram from 'react-native-udp';

const BROADCAST_PORT = 41234;

export function startBroadcast(deviceName, tcpPort) {
  const socket = dgram.createSocket('udp4');

  socket.bind(() => {
    socket.setBroadcast(true);

    setInterval(() => {
      const message = JSON.stringify({
        type: 'DISCOVER',
        deviceName,
        tcpPort,
      });

      socket.send(
        message,
        undefined,
        undefined,
        BROADCAST_PORT,
        '255.255.255.255'
      );
    }, 2000);
  });

  return socket;
}