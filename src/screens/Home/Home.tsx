import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import useViewModel from './Home.viewmodel';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import DocumentPicker from 'react-native-document-picker';
import {launchImageLibrary} from 'react-native-image-picker';

// ─── Types ────────────────────────────────────────────────────────────────────
type MainStackParamList = {
  HOME_SCREEN: undefined;
  SEND_SCREEN: { file?: { name: string; size: number; uri: string } } | undefined;
  RECEIVE_SCREEN: undefined;
};

// ─── Icon components (simple SVG-less placeholders using emoji/text) ──────────
const QuickActions = [
  {id: 'send', icon: '📤', label: 'Send', onPress: 'SEND_SCREEN'},
  {id: 'receive', icon: '📥', label: 'Receive', onPress: 'RECEIVE_SCREEN'},
  {id: 'invite', icon: '👤', label: 'Invite'},
];

const SharingOptions = [
  {id: 'qr', icon: '▦', label: 'Scan QR'},
  {id: 'share', icon: '⊛', label: 'Jio Share'},
  {id: 'pc', icon: '🖥', label: 'Link PC'},
  {id: 'group', icon: '⟳', label: 'Group Share'},
];

const VIDEOS = [
  {
    title: 'Titu Talks - Episode 1 ft. Shah Rukh Khan',
    channel: 'BB ki Vines',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
  },
];

const GAMES = [
  {id: '1', thumbnail: 'https://images.pexels.com/photos/1174746/pexels-photo-1174746.jpeg?cs=srgb&dl=pexels-kowalievska-1174746.jpg&fm=jpg'},
  {id: '2', thumbnail: 'https://imgproxy.domestika.org/unsafe/s:1200:630/rs:fill/ex:true/el:true/plain/src://blog-post-open-graph-covers/000/011/439/11439-original.jpg?1692707330'},
  {id: '3', thumbnail: 'https://www.cdmi.in/courses@2x/2D3D-Game-Design.webp'},
];

// ─── Component ────────────────────────────────────────────────────────────────
const Home = () => {
  const {styles} = useViewModel();
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const onQuickActionPress = async (action: typeof QuickActions[0]) => {
    if (action.id === 'send') {
      Alert.alert(
        'What would you like to send?',
        'Choose a file type to share.',
        [
          {
            text: 'Photos & Videos',
            onPress: async () => {
              try {
                const result = await launchImageLibrary({mediaType: 'mixed'});
                if (result.assets && result.assets.length > 0) {
                  const asset = result.assets[0];
                  navigation.navigate('SEND_SCREEN', {
                    file: {
                      name: asset.fileName || 'Photo/Video',
                      size: asset.fileSize || 0,
                      uri: asset.uri || '',
                    },
                  });
                }
              } catch (err) {
                console.error('Image picker error:', err);
              }
            },
          },
          {
            text: 'Documents',
            onPress: async () => {
              try {
                const result = await DocumentPicker.pickSingle({
                  type: [DocumentPicker.types.allFiles],
                });
                navigation.navigate('SEND_SCREEN', {
                  file: {
                    name: result.name || 'Unknown Document',
                    size: result.size || 0,
                    uri: result.uri || '',
                  },
                });
              } catch (err) {
                if (!DocumentPicker.isCancel(err)) {
                  console.error('Document picker error:', err);
                }
              }
            },
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
      );
    } else if (action.id === 'receive') {
      navigation.navigate('RECEIVE_SCREEN');
    }
  };

  const onSharingOptionPress = (option: typeof SharingOptions[0]) => {
    if (option.id === 'qr') {
      navigation.navigate('RECEIVE_SCREEN');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#1A73E8'}></StatusBar>
      {/* ── Header ── */}
      <View style={styles.header}>
        <Text style={{fontSize: 22, color: '#fff'}}>☰</Text>
        <Text style={styles.headerLogoText}>ShareApp</Text>
        <Image
          source={{uri: 'https://i.pravatar.cc/80?img=5'}}
          style={styles.avatar}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ── Quick Actions ── */}
        <View style={styles.quickActionsRow}>
          {QuickActions.map(action => (
            <TouchableOpacity
              key={action.id}
              style={styles.quickActionItem}
              onPress={() => onQuickActionPress(action)}
              activeOpacity={0.7}>
              <View style={styles.quickActionIconWrap}>
                <Text style={{fontSize: 24}}>{action.icon}</Text>
              </View>
              <Text style={styles.quickActionLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Sharing Options ── */}
        {/* <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Sharing Options</Text>
        </View>
        <View style={styles.sharingOptionsRow}>
          {SharingOptions.map(opt => (
            <TouchableOpacity
              key={opt.id}
              style={styles.sharingOptionItem}
              onPress={() => onSharingOptionPress(opt)}
              activeOpacity={0.7}>
              <View style={styles.sharingOptionIconWrap}>
                <Text style={{fontSize: 24, color: '#1A73E8'}}>{opt.icon}</Text>
              </View>
              <Text style={styles.sharingOptionLabel}>{opt.label}</Text>
            </TouchableOpacity>
          ))}
        </View> */}

        {/* ── Video Buffering ── */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Video Buffering</Text>
        </View>
        {VIDEOS.map((video, idx) => (
          <TouchableOpacity key={idx} style={styles.videoCard} activeOpacity={0.9}>
            <Image
              source={{uri: video.thumbnail}}
              style={styles.videoThumbnail}
              resizeMode="cover"
            />
            <View style={styles.playBtn}>
              <Text style={{fontSize: 20}}>▶</Text>
            </View>
            <Text style={styles.videoTitle}>{video.title}</Text>
            <View style={styles.videoMeta}>
              <View style={styles.channelRow}>
                <Image
                  source={{uri: 'https://i.pravatar.cc/50?img=12'}}
                  style={styles.channelAvatar}
                />
                <Text style={styles.channelName}>{video.channel}</Text>
              </View>
              <View style={styles.metaActions}>
                <Text style={{color: '#E53935', fontSize: 18}}>♥</Text>
                <Text style={{color: '#888', fontSize: 16}}>⤷</Text>
                <Text style={{color: '#888', fontSize: 16}}>⬇</Text>
                <Text style={{color: '#888', fontSize: 16}}>⚑</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* ── Games ── */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Games</Text>
        </View>
        <View style={styles.gamesRow}>
          {GAMES.map(game => (
            <TouchableOpacity key={game.id} style={styles.gameCard} activeOpacity={0.85}>
              <Image source={{uri: game.thumbnail}} style={styles.gameThumb} resizeMode="cover" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
