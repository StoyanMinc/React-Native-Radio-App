import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { styles } from './stations.styles';
import StationItem from '../stationItem/StationItem';
import { Station } from '../../types';
import { GENRE_OPTIONS } from '../../constants';
import { useStations } from '../../hooks/useStations';
import { useFavorites } from '../../hooks/useFavorites';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';

export const initialStations: Station[] = [
    { id: "1", title: "Chill Vibes FM", genre: "Lo-fi / Chillhop" },
    { id: "2", title: "Rock Arena", genre: "Classic Rock" },
    { id: "3", title: "Jazz Essentials", genre: "Smooth Jazz" },
    { id: "4", title: "EDM Nation", genre: "Electronic / Dance" },
    { id: "5", title: "Golden Oldies", genre: "60s / 70s / 80s" },
    { id: "6", title: "Hip-Hop Central", genre: "Hip-Hop / Rap" },
    { id: "7", title: "Classical Harmony", genre: "Classical" },
    { id: "8", title: "Pop Hits Live", genre: "Top 40 / Pop" },
    { id: "9", title: "Reggae Roots", genre: "Reggae" },
    { id: "10", title: "Country Roads", genre: "Country" },
];

export default function Stations() {
    const { currentStation, isPlaying, loadAndPlay, togglePlayPause } = useAudioPlayer();
    const { stations, isLoading, error } = useStations();
    const { favoriteIds, toggleFavorite } = useFavorites();
    const [genre, setGenre] = useState<string>('All');
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => setShowDropdown(prev => !prev);
    
    const filteredStations = genre === 'All' ? stations : stations.filter((station => station.genre?.toLowerCase().includes(genre.toLowerCase())));

    const handlePressPlay = (station: Station) => {
        if (!currentStation || currentStation.id !== station.id) {
            loadAndPlay(station);
        } else {
            togglePlayPause();
        }
    };

    const handleToggleFavorite = (station: Station) => {
        toggleFavorite(station);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Just pick your station and listen</Text>
            </View>
            <View style={styles.genreContainer}>
                <TouchableOpacity
                    onPress={toggleDropdown}
                    style={styles.genreBtn}
                >
                    <Text style={styles.genreText}>{genre ? genre : 'Choose genre'}</Text>
                    <Ionicons name={showDropdown ? 'chevron-up' : 'chevron-down'} size={20} />
                </TouchableOpacity>

                {showDropdown && (
                    <View
                        style={styles.genreDropdown}
                    >
                        <FlatList
                            data={GENRE_OPTIONS}
                            keyExtractor={(item) => item}
                            style={styles.genreDropdownList}
                            nestedScrollEnabled
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        setGenre(item);
                                        setShowDropdown(false);
                                    }}
                                    style={styles.genreDropdownText}
                                >
                                    <Text style={styles.genreText}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                )}
            </View>
            <FlatList
                data={filteredStations}
                style={styles.list}
                keyExtractor={(item) => item.id}
                extraData={favoriteIds}
                ListEmptyComponent={
                    isLoading ? (
                        <Text style={styles.headerText}>Loading stations...</Text>
                    ) : !!error ? (
                        <Text style={styles.headerText}>{error}</Text>
                    ) : (
                        <Text style={styles.headerText}>No stations</Text>
                    )
                }
                renderItem={({ item }) => (
                    <StationItem
                        item={{ ...item, favorite: favoriteIds.has(item.id) }}
                        currentStation={currentStation}
                        isPlaying={isPlaying}
                        onPressPlay={handlePressPlay}
                        onToggleFavorite={handleToggleFavorite}
                    />
                )}
            />
            {currentStation && (
                <View style={styles.currentStationContainer}>
                    <View>
                        <Text style={styles.currentStationText}>now play:</Text>
                        <Text style={styles.currentStationTitle}>{currentStation.title}</Text>
                    </View>
                    <View style={styles.currentStationControls}>
                        <TouchableOpacity onPress={() => handlePressPlay(currentStation)}>
                            <Ionicons
                                name={isPlaying ? 'pause' : 'play'}
                                color={'#fff'}
                                size={40}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
}
