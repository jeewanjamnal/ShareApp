import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export const useStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F4F6FA',
    },
    // Header
    header: {
      backgroundColor: '#1A73E8',
      paddingBottom: 32,
      paddingTop: 48,
      paddingHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomLeftRadius: 28,
      borderBottomRightRadius: 28,
    },
    headerIcon: {
      width: 36,
      height: 36,
      tintColor: '#fff',
    },
    headerLogoText: {
      fontSize: 22,
      fontWeight: '800',
      color: '#fff',
      letterSpacing: 0.5,
    },
    avatar: {
      width: 38,
      height: 38,
      borderRadius: 19,
      borderWidth: 2,
      borderColor: '#fff',
    },
    // Quick Actions
    quickActionsRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: '#fff',
      marginHorizontal: 16,
      marginTop: 18,
      borderRadius: 18,
      paddingVertical: 18,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.08,
      shadowRadius: 10,
      elevation: 5,
    },
    quickActionItem: {
      alignItems: 'center',
      gap: 8,
    },
    quickActionIconWrap: {
      width: 56,
      height: 56,
      backgroundColor: '#EEF4FF',
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
    },
    quickActionLabel: {
      fontSize: 12,
      color: '#333',
      fontWeight: '500',
    },
    // Sections
    sectionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginHorizontal: 16,
      marginTop: 22,
      marginBottom: 12,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: '#111',
    },
    // Sharing options
    sharingOptionsRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginHorizontal: 16,
    },
    sharingOptionItem: {
      alignItems: 'center',
      gap: 8,
    },
    sharingOptionIconWrap: {
      width: 60,
      height: 60,
      borderRadius: 16,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.07,
      shadowRadius: 6,
      elevation: 3,
    },
    sharingOptionLabel: {
      fontSize: 11,
      color: '#444',
      fontWeight: '500',
    },
    // Video card
    videoCard: {
      marginHorizontal: 16,
      backgroundColor: '#fff',
      borderRadius: 16,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.07,
      shadowRadius: 8,
      elevation: 3,
    },
    videoThumbnail: {
      width: '100%',
      height: 180,
    },
    playBtn: {
      position: 'absolute',
      top: 68,
      alignSelf: 'center',
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: 'rgba(255,255,255,0.85)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    videoTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: '#111',
      margin: 12,
      marginBottom: 4,
    },
    videoMeta: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 12,
      paddingBottom: 12,
    },
    channelRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    channelAvatar: {
      width: 28,
      height: 28,
      borderRadius: 14,
    },
    channelName: {
      fontSize: 12,
      color: '#555',
      fontWeight: '500',
    },
    metaActions: {
      flexDirection: 'row',
      gap: 14,
    },
    // Games
    gamesRow: {
      flexDirection: 'row',
      gap: 12,
      paddingHorizontal: 16,
      paddingBottom: 24,
    },
    gameCard: {
      width: (width - 56) / 3,
      height: (width - 56) / 3,
      borderRadius: 16,
      overflow: 'hidden',
    },
    gameThumb: {
      width: '100%',
      height: '100%',
    },
  });
};
