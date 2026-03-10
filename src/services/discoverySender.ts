import dgram from 'react-native-udp';

const BROADCAST_PORT = 41234;

export function startBroadcast(deviceName, tcpPort) {
  const socket = dgram.createSocket('udp4');
  let interval;
  let isClosed = false;

  socket.bind(() => {
    if (isClosed) return;
    try {
      socket.setBroadcast(true);

      interval = setInterval(() => {
        if (isClosed) {
          if (interval) clearInterval(interval);
          return;
        }

        const message = JSON.stringify({
          type: 'DISCOVER',
          deviceName,
          tcpPort,
        });

        try {
          socket.send(
            message,
            undefined,
            undefined,
            BROADCAST_PORT,
            '255.255.255.255'
          );
        } catch (err) {
          console.log("UDP send error (likely closed):", err);
        }
      }, 2000);
    } catch (err) {
      console.log("UDP bind callback error:", err);
    }
  });

  // Wrap the close method to ensure we stop the interval and set our flag
  const originalClose = socket.close.bind(socket);
  socket.close = () => {
    isClosed = true;
    if (interval) clearInterval(interval);
    try {
      originalClose();
    } catch (err) {
      console.log("UDP socket close error:", err);
    }
  };

  return socket;
}