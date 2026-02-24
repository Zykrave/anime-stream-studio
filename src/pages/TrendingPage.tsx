import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import animeData from '@/data/anime.json';
import { Anime } from '@/context/AppContext';
import Navbar from '@/components/Navbar';
import MediaCard from '@/components/MediaCard';
import Footer from '@/components/Footer';

const allAnime = animeData as Anime[];
const allGenres = [...new Set(allAnime.flatMap(a => a.genres))];

const TrendingPage = () => {
  const [genre, setGenre] = useState('All');
  const [sortBy, setSortBy] = useState<'popularity' | 'rating'>('popularity');

  const items = useMemo(() => {
    let list = genre === 'All' ? [...allAnime] : allAnime.filter(a => a.genres.includes(genre));
    return list.sort((a, b) => sortBy === 'popularity' ? b.popularity - a.popularity : b.rating - a.rating);
  }, [genre, sortBy]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Navbar />
      <main className="pt-24 px-4 sm:px-6 md:px-10 max-w-[1400px] mx-auto min-h-screen">
        <h1 className="text-2xl sm:text-3xl font-display font-bold mb-6">🔥 Trending</h1>

        <div className="flex flex-wrap gap-3 mb-8">
          <select
            value={genre}
            onChange={e => setGenre(e.target.value)}
            className="bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="All">All Genres</option>
            {allGenres.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as 'popularity' | 'rating')}
            className="bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="popularity">Most Popular</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {items.map((anime, i) => (
            <MediaCard key={anime.id} anime={anime} index={i} />
          ))}
        </div>

        <Footer />
      </main>
    </motion.div>
  );
};

export default TrendingPage;
