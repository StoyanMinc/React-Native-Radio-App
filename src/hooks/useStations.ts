import { useEffect, useState } from 'react';
import { Station } from '../types';
import { GENRE_OPTIONS } from '../constants';

export function useStations() {
    const [stations, setStations] = useState<Station[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isCancelled = false;
        async function loadStations() {
            try {
                setIsLoading(true);
                setError(null);
                const musicGenres = GENRE_OPTIONS.filter(g => g !== 'All' && g.toLowerCase() !== 'news');

                const perGenreLimit = 30;
                const requests = musicGenres.map(async (genre) => {
                    const tag = encodeURIComponent(genre.toLowerCase());
                    const params = new URLSearchParams({
                        limit: String(perGenreLimit),
                        hidebroken: 'true',
                        order: 'clickcount',
                        reverse: 'true',
                    });
                    const url = `https://de1.api.radio-browser.info/json/stations/bytag/${tag}?${params.toString()}`;
                    const res = await fetch(url);
                    if (!res.ok) return [] as any[];
                    const data = await res.json();
                    return (data || []).map((s: any) => ({ ...s, __forcedGenre: genre }));
                });

                const results = await Promise.all(requests);
                if (isCancelled) return;

                const flat: any[] = results.flat();
                const uniqueMap = new Map<string, any>();
                for (const s of flat) {
                    const id = s.stationuuid || String(s.uuid || s.name);
                    if (!uniqueMap.has(id)) uniqueMap.set(id, s);
                }

                const mapped: Station[] = Array.from(uniqueMap.values()).map((s: any) => {
                    const rawTags: string = s.tags || '';
                    const compactTags = rawTags
                        .split(',')
                        .map((t: string) => t.trim())
                        .filter((t: string) => t.length > 0)
                        .slice(0, 2)
                        .join(', ');
                    const primaryGenre: string = s.__forcedGenre || compactTags;
                    return {
                        id: s.stationuuid || String(s.uuid || s.name),
                        title: s.name || 'Unknown Station',
                        genre: primaryGenre,
                        streamUrl: s.url_resolved || s.url,
                        logoUrl: s.favicon || undefined,
                    } as Station;
                });

                setStations(mapped);
            } catch (e: any) {
                if (!isCancelled) setError(e?.message ?? 'Failed to load stations');
            } finally {
                if (!isCancelled) setIsLoading(false);
            }
        }
        loadStations();
        return () => {
            isCancelled = true;
        };
    }, []);

    return { stations, isLoading, error };
}
