import {useStyles} from './Receive.styles';

import { startBroadcast } from '../../services/discoverySender';
import { startListening } from '../../services/discoveryReceiver';
import { startTCPServer } from '../../services/tcpServer';
import { receiveFile } from '../../utils/Helper';
import { useEffect, useState } from 'react';

const useViewModel = () => {
  const styles = useStyles();
  const [deviceName, setDeviceName] = useState('Sender');
  const [isConnected, setIsConnected] = useState(false);
  const [isReceiving, setIsReceiving] = useState(false);
  const [receiveProgress, setReceiveProgress] = useState(0);

  useEffect(() => {
    // Receiver should broadcast its presence so Senders can find it
    const broadcastSocket = startBroadcast("Receiver Device", 9000);

    // Start TCP server to receive files
    const tcpServer = startTCPServer((socket) => {
      console.log("Sender connected", socket);
      setIsConnected(true);
      setIsReceiving(true);

      receiveFile(
        socket,
        "/storage/emulated/0/Download/received_file",
        setReceiveProgress
      );
    });

    return () => {
      broadcastSocket.close();
      tcpServer.close();
    };
  }, []);

  return {
    styles,
    deviceName,
    isConnected,
    isReceiving,
    receiveProgress
  };
};

export default useViewModel;
