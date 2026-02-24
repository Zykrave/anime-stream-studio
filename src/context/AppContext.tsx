import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Episode {
  id: string;
  number: number;
  title: string;
  duration: string;
}

export interface Anime {
  id: string;
  title: string;
  description: string;
  rating: number;
  genres: string[];
  thumbnail: string;
  banner: string;
  episodes: Episode[];
  duration: string;
  popularity: number;
}

interface WatchProgress {
  animeId: string;
  episodeId: string;
  progress: number; // 0-100
  lastWatched: number; // timestamp
}

interface AppState {
  favorites: string[];
  watchProgress: WatchProgress[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  updateProgress: (animeId: string, episodeId: string, progress: number) => void;
  getProgress: (animeId: string) => WatchProgress | undefined;
  getContinueWatching: () => WatchProgress[];
}

const AppContext = createContext<AppState | null>(null);

const load = <T,>(key: string, fallback: T): T => {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<string[]>(() => load('favorites', []));
  const [watchProgress, setWatchProgress] = useState<WatchProgress[]>(() => load('watchProgress', []));

  useEffect(() => { localStorage.setItem('favorites', JSON.stringify(favorites)); }, [favorites]);
  useEffect(() => { localStorage.setItem('watchProgress', JSON.stringify(watchProgress)); }, [watchProgress]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const isFavorite = (id: string) => favorites.includes(id);

  const updateProgress = (animeId: string, episodeId: string, progress: number) => {
    setWatchProgress(prev => {
      const existing = prev.findIndex(w => w.animeId === animeId);
      const entry: WatchProgress = { animeId, episodeId, progress, lastWatched: Date.now() };
      if (existing >= 0) {
        const next = [...prev];
        next[existing] = entry;
        return next;
      }
      return [...prev, entry];
    });
  };

  const getProgress = (animeId: string) => watchProgress.find(w => w.animeId === animeId);

  const getContinueWatching = () =>
    [...watchProgress].filter(w => w.progress > 0 && w.progress < 100).sort((a, b) => b.lastWatched - a.lastWatched);

  return (
    <AppContext.Provider value={{ favorites, watchProgress, toggleFavorite, isFavorite, updateProgress, getProgress, getContinueWatching }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
