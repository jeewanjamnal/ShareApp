import {useStyles} from './Send.styles';
import { startBroadcast } from '../../services/discoverySender';
import { startListening } from '../../services/discoveryReceiver';
import { connectToDevice } from '../../services/tcpClient';
import { sendFile, receiveFile } from '../../utils/Helper';
import { useEffect, useState } from 'react';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';

interface Device {
  ip: string;
  name: string;
  port: number;
}


type SendScreenRouteProp = RouteProp<{ Send: { file: { name: string; size: number, uri: string } } }, 'Send'>;


const useViewModel = () => {
  const styles = useStyles();
  const [devices, setDevices] = useState<Device[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'connecting' | 'connected' | 'error'>('idle');
  const [sendProgress, setSendProgress] = useState(0);
  const route = useRoute<SendScreenRouteProp>();
  const fileParams = route.params?.file;

  useEffect(() => {

    const broadcastSocket = startBroadcast("MyPhone", 9000);

    const socket = startListening((newDevice: Device) => {
      setDevices(prevDevices => {
        // Prevent re-render if we already have this device
        if (prevDevices.find(d => d.ip === newDevice.ip)) {
          return prevDevices;
        }
        return [...prevDevices, newDevice];
      });
    });

    return () => {
      socket.close();
      broadcastSocket.close();
    };

  }, []);

  const handleDevicePress = async (device: any) => {
    if (connectionStatus === 'connecting' || connectionStatus === 'connected' || !fileParams) return;

    setConnectionStatus('connecting');
    const client = connectToDevice(device.ip, device.port);

    client.on('connect', async () => {
      setConnectionStatus('connected');
      console.log('Connected successfully to:', device.name);

      try {
        // Send metadata first
        console.log('write>>>>>>');
        client.write(JSON.stringify({
          type: 'metadata',
          name: fileParams.name,
          size: fileParams.size
        }));
        console.log('write compeleted>>>>>>');

        console.log('sent started>>>>>>');

        // Now send the actual file
        await sendFile(client, fileParams, (progress: number) => {
          setSendProgress(Math.round(progress * 100));
        });
        console.log('File sent finished>>>>');
      } catch (err) {
        console.error('Send failed:', err);
        setConnectionStatus('error');
      }
    });

    client.on('error', (error) => {
      setConnectionStatus('error');
      console.error('Connection failed:', error);
    });

    client.on('close', () => {
      setConnectionStatus('idle');
      setSendProgress(0);
    });
  };

  return {
    styles,
    devices,
    connectionStatus,
    sendProgress,
    handleDevicePress,
    fileParams
    };
};

export default useViewModel;
