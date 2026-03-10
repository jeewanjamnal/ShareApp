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
    // User avatars around radar
    avatarAbsolute: {
      position: 'absolute',
      width: 52,
      height: 52,
      borderRadius: 26,
      borderWidth: 3,
      borderColor: '#fff',
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
    },
    // Footer buttons
    footer: {
      flexDirection: 'row',
      gap: 12,
      paddingHorizontal: 20,
      paddingBottom: 36,
      paddingTop: 16,
    },
    connectBtn: {
      flex: 1,
      backgroundColor: '#1A73E8',
      borderRadius: 30,
      paddingVertical: 16,
      alignItems: 'center',
    },
    connectBtnText: {
      color: '#fff',
      fontWeight: '700',
      fontSize: 15,
    },
    // File Info
    fileInfoContainer: {
      position: 'absolute',
      top: 100,
      left: 20,
      right: 20,
      alignItems: 'center',
      backgroundColor: 'rgba(255,255,255,0.9)',
      padding: 12,
      borderRadius: 12,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    fileNameText: {
      fontSize: 14,
      fontWeight: '600',
      color: '#333',
    },
    fileSizeText: {
      fontSize: 12,
      color: '#666',
      marginTop: 2,
    },
    // Progress UI
    progressOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(26,115,232,0.7)',
      borderRadius: 26,
      alignItems: 'center',
      justifyContent: 'center',
    },
    progressText: {
      color: '#fff',
      fontSize: 12,
      fontWeight: 'bold',
    },
    deviceName: {
      marginTop: 4,
      fontSize: 10,
      color: '#333',
      textAlign: 'center',
    }
  });
};
