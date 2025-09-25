import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './stationItem.styles';
import { Ionicons } from '@expo/vector-icons';
import { Station } from '../../types';


interface StationItemProps {
    item: Station;
    currentStation: Station | null;
    isPlaying: boolean;
    onPressPlay: (station: Station) => void;
    onToggleFavorite?: (station: Station) => void;
};

export default function StationItem({
    item,
    currentStation,
    isPlaying,
    onPressPlay,
    onToggleFavorite
}: StationItemProps) {
    const isCurrent = currentStation?.id === item.id;
    return (

        <View style={styles.stationItem}>
            <View style={styles.stationInfo}>
                <Text style={styles.stationTitle} numberOfLines={1} ellipsizeMode="tail">{item.title}</Text>
                <Text style={styles.stationGenre} numberOfLines={1} ellipsizeMode="tail">{item.genre}</Text>
            </View>

            <View style={styles.stationAction}>
                <TouchableOpacity
                    onPress={() => onPressPlay(item)}
                >
                    <Ionicons
                        name={isPlaying && isCurrent ? 'pause' : 'play'}
                        size={30}
                        color="red"
                    />
                </TouchableOpacity>

                {onToggleFavorite && (
                    <TouchableOpacity onPress={() => onToggleFavorite(item)} style={styles.stationActionSpacer}>
                        <Ionicons
                            name={item.favorite ? 'heart' : 'heart-outline'} // ✅ filled if favorite
                            size={30}
                            color="red"
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}