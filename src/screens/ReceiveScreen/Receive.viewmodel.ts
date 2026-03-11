import {useStyles} from './Receive.styles';

import { startBroadcast } from '../../services/discoverySender';
import { startListening } from '../../services/discoveryReceiver';
import { startTCPServer } from '../../services/tcpServer';
import { receiveFile } from '../../utils/Helper';
import { useEffect, useState } from 'react';
import { Linking } from 'react-native';

const useViewModel = () => {
  const styles = useStyles();
  const [deviceName, setDeviceName] = useState('Sender');
  const [isConnected, setIsConnected] = useState(false);
  const [isReceiving, setIsReceiving] = useState(false);
  const [receiveProgress, setReceiveProgress] = useState(0);
  const [receivedPath, setReceivedPath] = useState<string | null>(null);

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
        (progress: number) => {
          setReceiveProgress(Math.round(progress * 100));
        },
        (path: string) => {
          setReceivedPath(path);
          setReceiveProgress(100);
        }
      );
    });

    return () => {
      broadcastSocket.close();
      tcpServer.close();
    };
  }, []);

  const openFolder = async () => {
    if (receivedPath) {
      // On Android, we can try to open the downloads folder or the file itself
      // For simplicity, we'll try to open the directory
      const directoryPath = receivedPath.substring(0, receivedPath.lastIndexOf('/'));
      try {
        await Linking.openURL(`file://${directoryPath}`);
      } catch (error) {
        console.error("Could not open folder", error);
        // Fallback or alert user
      }
    }
  };

  return {
    styles,
    deviceName,
    isConnected,
    isReceiving,
    receiveProgress,
    receivedPath,
    openFolder
  };
};

export default useViewModel;
