import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import useViewModel from './Send.viewmodel';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {RADAR_SIZE} from './Send.styles';


type SendScreenRouteProp = RouteProp<{ Send: { file: { name: string; size: number, uri: string } } }, 'Send'>;

interface DiscoveredDevice {
    ip: string;
    name: string;
    port: number;
}

const SendScreen = () => {
  const {styles, devices, handleDevicePress} = useViewModel();
  const navigation = useNavigation();
  const route = useRoute<SendScreenRouteProp>();
  const fileParams = route.params?.file;

  const [sendingToDevice, setSendingToDevice] = useState<string | null>(null);
  const [sendProgress, setSendProgress] = useState(0);

  // Animation values for 3 rings
  const ring1 = useRef(new Animated.Value(0)).current;
  const ring2 = useRef(new Animated.Value(0)).current;
  const ring3 = useRef(new Animated.Value(0)).current;



  useEffect(() => {
    const createAnimation = (animatedValue: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 3000,
            delay: delay,
            useNativeDriver: true,
          }),
        ])
      );
    };

    createAnimation(ring1, 0).start();
    createAnimation(ring2, 1000).start();
    createAnimation(ring3, 2000).start();
  }, []);


  const getRingStyle = (animatedValue: Animated.Value) => ({
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0.3, 1.5],
        }),
      },
    ],
    opacity: animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.8, 0.3, 0],
    }),
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.headerIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Send File</Text>
        <Text style={styles.headerIcon}>▦</Text>
      </View>

      {/* Radar Area */}
      <View style={styles.radarContainer}>
        {fileParams && (
          <View style={styles.fileInfoContainer}>
            <Text style={styles.fileNameText}>Sending: {fileParams.name}</Text>
            <Text style={styles.fileSizeText}>
              {(fileParams.size / 1024 / 1024).toFixed(2)} MB
            </Text>
          </View>
        )}

        <View style={styles.radarOuter}>
          {/* Animated Rings */}
          <Animated.View style={[styles.animatedRing, getRingStyle(ring1)]} />
          <Animated.View style={[styles.animatedRing, getRingStyle(ring2)]} />
          <Animated.View style={[styles.animatedRing, getRingStyle(ring3)]} />

          {/* Discovered Devices */}
          {devices?.length > 0 && devices.map((device, index) => {
              // Simple positioning for demo purposes
              const angle = (index / devices.length) * 2 * Math.PI;
              const radius = RADAR_SIZE * 0.4;
              const top = RADAR_SIZE / 2 + radius * Math.sin(angle) - 26;
              const left = RADAR_SIZE / 2 + radius * Math.cos(angle) - 26;

              return (
                <TouchableOpacity
                  key={device.ip}
                  activeOpacity={0.8}
                  onPress={() => handleDevicePress(device)}
                  style={[styles.avatarAbsolute, {top, left}]}>
                  <View style={{width: 46, height: 46, borderRadius: 23, backgroundColor: '#ddd', alignItems: 'center', justifyContent: 'center'}}>
                      <Text style={{fontSize: 20}}>📱</Text>
                  </View>
                  <Text style={styles.deviceName} numberOfLines={1}>{device.name}</Text>
                  
                  {sendingToDevice == device.ip && (
                    <View style={styles.progressOverlay}>
                      <Text style={styles.progressText}>
                        {sendProgress=== 100 ? "Sent" : "Sending"}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
          })}

          <View style={styles.radarInner}>
            <Text style={styles.radarCenterIcon}>📤</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SendScreen;
