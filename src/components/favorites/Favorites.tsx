import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useMemo, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { styles as stationsStyles } from '../stations/stations.styles';
import StationItem from '../stationItem/StationItem';
import { Station } from '../../types';
import { GENRE_OPTIONS } from '../../constants';
import { useFavorites } from '../../hooks/useFavorites';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';

export default function Favorites() {
    const { currentStation, isPlaying, loadAndPlay, togglePlayPause } = useAudioPlayer();
    const { favorites, favoriteIds, toggleFavorite } = useFavorites();
    const [genre, setGenre] = useState<string>('All');
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => setShowDropdown(prev => !prev);

    const filteredStations = useMemo(() => {
        const list = favorites.map(s => ({ ...s, favorite: true }));
        if (genre === 'All') return list;
        return list.filter(station => station.genre?.toLowerCase().includes(genre.toLowerCase()));
    }, [favorites, genre]);

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
        <View style={stationsStyles.container}>
            <View style={stationsStyles.header}>
                <Text style={stationsStyles.headerText}>Your favorite stations</Text>
            </View>

            <View style={stationsStyles.genreContainer}>
                <TouchableOpacity
                    onPress={toggleDropdown}
                    style={stationsStyles.genreBtn}
                >
                    <Text style={stationsStyles.genreText}>{genre ? genre : 'Choose genre'}</Text>
                    <Ionicons name={showDropdown ? 'chevron-up' : 'chevron-down'} size={20} />
                </TouchableOpacity>

                {showDropdown && (
                    <View
                        style={stationsStyles.genreDropdown}
                    >
                        <FlatList
                            data={GENRE_OPTIONS}
                            keyExtractor={(item) => item}
                            style={stationsStyles.genreDropdownList}
                            nestedScrollEnabled
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        setGenre(item);
                                        setShowDropdown(false);
                                    }}
                                    style={stationsStyles.genreDropdownText}
                                >
                                    <Text style={stationsStyles.genreText}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                )}
            </View>

            <FlatList
                data={filteredStations}
                style={stationsStyles.list}
                keyExtractor={(item) => item.id}
                extraData={favoriteIds}
                ListEmptyComponent={
                    <Text style={stationsStyles.headerText}>No favorites yet</Text>
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
                <View style={stationsStyles.currentStationContainer}>
                    <View>
                        <Text style={stationsStyles.currentStationText}>now play:</Text>
                        <Text style={stationsStyles.currentStationTitle}>{currentStation.title}</Text>
                    </View>
                    <View style={stationsStyles.currentStationControls}>
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


