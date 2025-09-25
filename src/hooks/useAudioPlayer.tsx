import { createContext, useCallback, useContext, useEffect, useRef, useState, PropsWithChildren } from 'react';
import TrackPlayer, { AppKilledPlaybackBehavior, Capability, Event, RepeatMode, State, usePlaybackState } from 'react-native-track-player';
import { Station } from '../types';

type AudioPlayerContextValue = {
    currentStation: Station | null;
    isPlaying: boolean;
    loadAndPlay: (station: Station) => Promise<void>;
    togglePlayPause: () => Promise<void>;
    stop: () => Promise<void>;
};

const AudioPlayerContext = createContext<AudioPlayerContextValue | undefined>(undefined);
export function AudioPlayerProvider({ children }: PropsWithChildren<{}>) {
    const initializedRef = useRef<boolean>(false);
    const [currentStation, setCurrentStation] = useState<Station | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const isSwitchingRef = useRef<boolean>(false);

    useEffect(() => {
        (async () => {
            if (initializedRef.current) return;
            try {
                await TrackPlayer.reset();
                await TrackPlayer.updateOptions({
                    stopWithApp: false,
                    capabilities: [Capability.Play, Capability.Pause, Capability.Stop],
                    compactCapabilities: [Capability.Play, Capability.Pause],
                });
                initializedRef.current = true;
            } catch {}
        })();
        return () => {
            stop();
        };
    }, []);

    const stop = useCallback(async () => {
        try {
            await TrackPlayer.stop();
            await TrackPlayer.reset();
        } catch {}
        setIsPlaying(false);
    }, []);

    const loadAndPlay = useCallback(async (station: Station) => {
        if (!station.streamUrl || isSwitchingRef.current) return;
        try {
            isSwitchingRef.current = true;
            await stop();
            await TrackPlayer.add({
                id: station.id,
                url: station.streamUrl,
                title: station.title,
                artist: station.genre || 'Live',
                artwork: station.logoUrl || undefined,
                isLiveStream: true,
            });
            await TrackPlayer.play();
            setCurrentStation(station);
            setIsPlaying(true);
        } catch (e) {
            setIsPlaying(false);
        } finally {
            isSwitchingRef.current = false;
        }
    }, [stop]);

    const togglePlayPause = useCallback(async () => {
        const state = await TrackPlayer.getState();
        if (state === State.Playing) {
            await TrackPlayer.pause();
            setIsPlaying(false);
        } else {
            await TrackPlayer.play();
            setIsPlaying(true);
        }
    }, []);

    const value: AudioPlayerContextValue = {
        currentStation,
        isPlaying,
        loadAndPlay,
        togglePlayPause,
        stop,
    };

    return (
        <AudioPlayerContext.Provider value={value}>
            {children}
        </AudioPlayerContext.Provider>
    );
}

export function useAudioPlayer() {
    const ctx = useContext(AudioPlayerContext);
    if (!ctx) throw new Error('useAudioPlayer must be used within AudioPlayerProvider');
    return ctx;
}


