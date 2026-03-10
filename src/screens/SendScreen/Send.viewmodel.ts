import {useStyles} from './Send.styles';
import { startBroadcast } from '../../services/discoverySender';
import { startListening } from '../../services/discoveryReceiver';
import { connectToDevice } from '../../services/tcpClient';

import { sendFile, receiveFile } from '../../utils/Helper';
import { useEffect, useState } from 'react';

interface Device {
  ip: string;
  name: string;
  port: number;
}

const useViewModel = () => {
  const styles = useStyles();

  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {

    startBroadcast("MyPhone", 9000);

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
    };

  }, []);

  const handleDevicePress = async (device: any) => {
    connectToDevice(device.ip, device.port);
  
  };

  return {
    styles,
    devices,
    handleDevicePress
    };
};

export default useViewModel;
