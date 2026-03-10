import {
  View,
  Text,
  Animated,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import useViewModel from './Receive.viewmodel';
import {useNavigation} from '@react-navigation/native';
import {RADAR_SIZE} from './Receive.styles';

const ReceiveScreen = () => {
  const {styles, deviceName, isConnected, isReceiving, receiveProgress} = useViewModel();
  const navigation = useNavigation();

  // Animation values for 3 rings
  const ring1 = useRef(new Animated.Value(0)).current;
  const ring2 = useRef(new Animated.Value(0)).current;
  const ring3 = useRef(new Animated.Value(0)).current;

  console.log("deviceName>>>>>", deviceName);
  console.log("isConnected>>>>>>", isConnected);

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
        <Text style={styles.headerTitle}>Receive File</Text>
        <Text style={styles.headerIcon}>▦</Text>
      </View>

      {/* Radar Area */}
      <View style={styles.radarContainer}>
        <View style={styles.radarOuter}>
          {/* Animated Rings */}
          <Animated.View style={[styles.animatedRing, getRingStyle(ring1)]} />
          <Animated.View style={[styles.animatedRing, getRingStyle(ring2)]} />
          <Animated.View style={[styles.animatedRing, getRingStyle(ring3)]} />

          <View style={styles.radarInner}>
            <Text style={styles.radarCenterIcon}>📥</Text>
          </View>
        </View>

        <Text style={styles.statusText}>Waiting to receive...</Text>
        <Text style={styles.deviceNameText}>{deviceName}</Text>
      </View>

      {/* Receiving UI */}
      {isReceiving && (
          <View style={styles.receivingContainer}>
              <Text style={styles.receivingTitle}>Receiving File...</Text>
              <View style={styles.progressBar}>
                  <View style={[styles.progressFill, {width: `${receiveProgress}%`}]} />
              </View>
              <Text style={styles.progressPercent}>{receiveProgress}%</Text>
          </View>
      )}
    </SafeAreaView>
  );
};

export default ReceiveScreen;
