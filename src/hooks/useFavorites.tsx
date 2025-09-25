import { createContext, useCallback, useContext, useEffect, useMemo, useState, PropsWithChildren } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Station } from '../types';

const FAVORITES_KEY = 'favorites.stations.v1';

type FavoritesContextValue = {
    favorites: Station[];
    favoriteIds: Set<string>;
    isLoading: boolean;
    error: string | null;
    isFavorite: (stationId: string) => boolean;
    addFavorite: (station: Station) => Promise<void>;
    removeFavorite: (stationId: string) => Promise<void>;
    toggleFavorite: (station: Station) => Promise<void>;
};

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

export function FavoritesProvider({ children }: PropsWithChildren<{}>) {
    const [favorites, setFavorites] = useState<Station[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isCancelled = false;
        async function load() {
            try {
                setIsLoading(true);
                const raw = await AsyncStorage.getItem(FAVORITES_KEY);
                if (isCancelled) return;
                if (!raw) {
                    setFavorites([]);
                    return;
                }
                const parsed = JSON.parse(raw) as Station[];
                setFavorites(Array.isArray(parsed) ? parsed : []);
            } catch (e: any) {
                if (!isCancelled) setError(e?.message ?? 'Failed to load favorites');
            } finally {
                if (!isCancelled) setIsLoading(false);
            }
        }
        load();
        return () => {
            isCancelled = true;
        };
    }, []);

    const persist = useCallback(async (next: Station[]) => {
        setFavorites(next);
        try {
            await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
        } catch {}
    }, []);

    const isFavorite = useCallback((stationId: string) => {
        return favorites.some(s => s.id === stationId);
    }, [favorites]);

    const addFavorite = useCallback(async (station: Station) => {
        if (isFavorite(station.id)) return;
        const next = [...favorites, { ...station, favorite: true }];
        await persist(next);
    }, [favorites, isFavorite, persist]);

    const removeFavorite = useCallback(async (stationId: string) => {
        const next = favorites.filter(s => s.id !== stationId);
        await persist(next);
    }, [favorites, persist]);

    const toggleFavorite = useCallback(async (station: Station) => {
        if (isFavorite(station.id)) {
            await removeFavorite(station.id);
        } else {
            await addFavorite(station);
        }
    }, [addFavorite, removeFavorite, isFavorite]);

    const favoriteIds = useMemo(() => new Set(favorites.map(s => s.id)), [favorites]);

    const value: FavoritesContextValue = useMemo(() => ({
        favorites,
        favoriteIds,
        isLoading,
        error,
        isFavorite,
        addFavorite,
        removeFavorite,
        toggleFavorite,
    }), [favorites, favoriteIds, isLoading, error, isFavorite, addFavorite, removeFavorite, toggleFavorite]);

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const ctx = useContext(FavoritesContext);
    if (!ctx) {
        throw new Error('useFavorites must be used within FavoritesProvider');
    }
    return ctx;
}


