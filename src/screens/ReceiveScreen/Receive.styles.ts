import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const RADAR_SIZE = Math.min(width, height) * 0.65;

export const useStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F4F6FA',
    },
    // Header
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingTop: 52,
      paddingBottom: 16,
      backgroundColor: '#fff',
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    headerTitle: {
      fontSize: 17,
      fontWeight: '700',
      color: '#111',
    },
    headerIcon: {
      fontSize: 22,
      color: '#333',
    },
    // Radar
    radarContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    radarOuter: {
      width: RADAR_SIZE,
      height: RADAR_SIZE,
      borderRadius: RADAR_SIZE / 2,
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    animatedRing: {
      position: 'absolute',
      width: RADAR_SIZE,
      height: RADAR_SIZE,
      borderRadius: RADAR_SIZE / 2,
      backgroundColor: 'rgba(26,115,232,0.15)',
    },
    radarInner: {
      width: RADAR_SIZE * 0.32,
      height: RADAR_SIZE * 0.32,
      borderRadius: (RADAR_SIZE * 0.32) / 2,
      backgroundColor: '#1A73E8',
      alignItems: 'center',
      justifyContent: 'center',
    },
    radarCenterIcon: {
      fontSize: 28,
      color: '#fff',
    },
    // Status text
    statusText: {
      marginTop: 20,
      fontSize: 16,
      color: '#666',
      fontWeight: '500',
    },
    deviceNameText: {
      fontSize: 18,
      color: '#1A73E8',
      fontWeight: '700',
      marginTop: 8,
    },
    // Receiving progress
    receivingContainer: {
        position: 'absolute',
        bottom: 100,
        left: 20,
        right: 20,
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        alignItems: 'center',
    },
    receivingTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111',
        marginBottom: 12,
    },
    progressBar: {
        width: '100%',
        height: 8,
        backgroundColor: '#eee',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#1A73E8',
    },
    progressPercent: {
        marginTop: 8,
        fontSize: 14,
        color: '#666',
        fontWeight: '600',
    },
    showButton: {
        marginTop: 16,
        backgroundColor: '#1A73E8',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 24,
        width: '100%',
        alignItems: 'center',
    },
    showButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    }
  });
};
