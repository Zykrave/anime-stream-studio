import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Trash2, BookmarkX } from 'lucide-react';
import animeData from '@/data/anime.json';
import { useApp, Anime } from '@/context/AppContext';
import Navbar from '@/components/Navbar';
import MediaCard from '@/components/MediaCard';
import Footer from '@/components/Footer';

const allAnime = animeData as Anime[];

const MyListPage = () => {
  const { favorites, toggleFavorite } = useApp();
  const [sortBy, setSortBy] = useState<'az' | 'recent'>('recent');

  const items = useMemo(() => {
    const list = favorites.map(id => allAnime.find(a => a.id === id)).filter(Boolean) as Anime[];
    if (sortBy === 'az') return list.sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [favorites, sortBy]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Navbar />
      <main className="pt-24 px-4 sm:px-6 md:px-10 max-w-[1400px] mx-auto min-h-screen">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl sm:text-3xl font-display font-bold">My List</h1>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as 'az' | 'recent')}
            className="bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="recent">Recently Added</option>
            <option value="az">A - Z</option>
          </select>
        </div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <BookmarkX size={64} className="text-muted-foreground/30 mb-4" />
            <h2 className="text-xl font-display font-bold mb-2">Your list is empty</h2>
            <p className="text-muted-foreground text-sm max-w-md">
              Start adding anime to your list by clicking the "My List" button on any title.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {items.map((anime, i) => (
              <div key={anime.id} className="relative group/remove">
                <MediaCard anime={anime} index={i} />
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleFavorite(anime.id)}
                  className="absolute top-2 left-2 w-7 h-7 rounded-full bg-destructive/80 flex items-center justify-center opacity-0 group-hover/remove:opacity-100 transition-opacity z-10"
                >
                  <Trash2 size={12} className="text-destructive-foreground" />
                </motion.button>
              </div>
            ))}
          </div>
        )}

        <Footer />
      </main>
    </motion.div>
  );
};

export default MyListPage;
