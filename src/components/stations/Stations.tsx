import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { styles } from './stations.styles';
import StationItem from '../stationItem/StationItem';
import { Station } from '../../types';
import { GENRE_OPTIONS } from '../../constants';

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
    const [currentStation, setCurrentStation] = useState<Station | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [stations] = useState<Station[]>(initialStations);
    const [favoriteStations, setFavoriteStations] = useState<Station[]>([]);
    const [genre, setGenre] = useState<string>('All');
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => setShowDropdown(prev => !prev);
    
    const filteredStations = genre === 'All' ? stations : stations.filter((g => g.genre.includes(genre)))

    const handleSelectStation = (station: Station) => {
        setCurrentStation(station);
    };

    const handleTogglePlay = () => {
        setIsPlaying(prev => !prev);
    };

    const handleToggleFavorite = (station: Station) => {
        setFavoriteStations(prev => {
            const isFav = prev.find(s => s.id === station.id);
            if (isFav) {
                return prev.filter(s => s.id !== station.id);
            }
            return [...prev, station];
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Just pick your station and listen</Text>
            </View>

            {/* Manual select */}
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
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <StationItem
                        item={item}
                        currentStation={currentStation}
                        isPlaying={isPlaying}
                        onSelectStation={handleSelectStation}
                        onTogglePlay={handleTogglePlay}
                        onToggleFavorite={handleToggleFavorite}
                    />
                )}
            />

            {/* Now playing footer */}
            {currentStation && (
                <View style={styles.currentStationContainer}>
                    <View>
                        <Text style={styles.currentStationText}>now play:</Text>
                        <Text style={styles.currentStationTitle}>{currentStation.title}</Text>
                    </View>
                    <View style={styles.currentStationControls}>
                        <TouchableOpacity onPress={handleTogglePlay}>
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
