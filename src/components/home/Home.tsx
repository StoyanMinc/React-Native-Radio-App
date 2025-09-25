import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './home.styles';
import { useNavigation } from '@react-navigation/native';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';

export default function Home() {
    const navigation = useNavigation<any>();
    const { currentStation, isPlaying, togglePlayPause, stop } = useAudioPlayer();
    
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../../assets/splash-icon.png')}
                resizeMode="cover"
                style={{ flex: 1, opacity: 0.18 }}
            />

            <View style={styles.content}>
                <Text style={styles.title}>Welcome to Stoyan's Radio</Text>
                <Text style={styles.subtitle}>Discover thousands of stations by genre and save your favorites.</Text>

                <TouchableOpacity style={styles.ctaButton} onPress={() => navigation.navigate('Stations')}>
                    <Text style={styles.ctaText}>Browse Stations</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.ctaButton, { backgroundColor: '#333' }]} onPress={() => navigation.navigate('Favorites')}>
                    <Text style={styles.ctaText}>Your Favorites</Text>
                </TouchableOpacity>
            </View>

            {currentStation && (
                <View style={styles.footerPlayer}>
                    <View>
                        <Text style={styles.footerTitle} numberOfLines={1}>{currentStation.title}</Text>
                        <Text style={styles.footerSubtitle} numberOfLines={1}>{currentStation.genre || 'Live stream'}</Text>
                    </View>
                    <View style={styles.footerControls}>
                        <TouchableOpacity onPress={togglePlayPause}
                            onLongPress={async () => {
                                const station = currentStation;
                                if (!station) return;
                                const trackId = await TrackPlayer.getCurrentTrack();
                                if (trackId == null) return;
                                await TrackPlayer.updateMetadataForTrack(trackId, {
                                    title: station.title,
                                    artist: station.genre || 'Live',
                                    artwork: station.logoUrl || undefined,
                                });
                            }}>
                            <Ionicons name={isPlaying ? 'pause' : 'play'} size={36} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={stop}>
                            <Ionicons name='stop' size={32} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
}


