import { motion } from 'framer-motion';
import { Play, Plus, Star, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp, Anime } from '@/context/AppContext';
import heroBanner from '@/assets/hero-banner.jpg';

interface HeroBannerProps {
  anime: Anime;
}

const HeroBanner = ({ anime }: HeroBannerProps) => {
  const { toggleFavorite, isFavorite } = useApp();
  const fav = isFavorite(anime.id);

  return (
    <div className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden">
      <img
        src={heroBanner}
        alt={anime.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="gradient-overlay absolute inset-0" />
      <div className="gradient-overlay-right absolute inset-0" />

      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 md:p-16 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="flex items-center gap-1 text-sm font-medium text-primary">
              <Star size={14} className="fill-primary" /> {anime.rating}
            </span>
            <span className="text-muted-foreground text-sm">•</span>
            {anime.genres.slice(0, 3).map(g => (
              <span key={g} className="text-xs px-2 py-0.5 rounded-full glass text-muted-foreground">{g}</span>
            ))}
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold mb-4 leading-tight">{anime.title}</h1>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 line-clamp-2 md:line-clamp-3 max-w-xl">{anime.description}</p>

          <div className="flex items-center gap-3">
            <Link to={`/watch/${anime.id}`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold text-sm neon-glow"
              >
                <Play size={18} className="fill-primary-foreground" /> Play Now
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleFavorite(anime.id)}
              className="flex items-center gap-2 glass px-5 py-3 rounded-lg font-semibold text-sm text-foreground hover:border-primary/50 transition-colors"
            >
              {fav ? <Check size={18} className="text-primary" /> : <Plus size={18} />}
              {fav ? 'In My List' : 'My List'}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroBanner;
