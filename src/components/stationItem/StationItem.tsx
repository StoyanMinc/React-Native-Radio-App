import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './stationItem.styles';
import { Ionicons } from '@expo/vector-icons';
import { Station } from '../../types';


interface StationItemProps {
    item: Station;
    currentStation: Station | null;
    isPlaying: boolean;
    onSelectStation: (station: Station) => void;
    onTogglePlay: () => void;
    onToggleFavorite?: (station: Station) => void;
};

export default function StationItem({
    item,
    currentStation,
    isPlaying,
    onSelectStation,
    onTogglePlay,
    onToggleFavorite
}: StationItemProps) {
    const isCurrent = currentStation?.id === item.id;
    return (

        <View style={styles.stationItem}>
            <View>
                <Text style={styles.stationTitle}>{item.title}</Text>
                <Text style={styles.stationGenre}>{item.genre}</Text>
            </View>

            <View style={styles.stationAction}>
                <TouchableOpacity
                    onPress={() => {
                        onSelectStation(item);
                        onTogglePlay();
                    }}
                >
                    <Ionicons
                        name={isPlaying && isCurrent ? 'play' : 'play-outline'}
                        size={30}
                        color="red"
                    />
                </TouchableOpacity>

                {onToggleFavorite && (
                    <TouchableOpacity onPress={() => onToggleFavorite(item)}>
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