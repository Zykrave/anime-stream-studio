import { motion } from 'framer-motion';
import { Play, Plus, Star, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp, Anime } from '@/context/AppContext';

interface MediaCardProps {
  anime: Anime;
  index?: number;
  showProgress?: boolean;
}

const MediaCard = ({ anime, index = 0, showProgress = false }: MediaCardProps) => {
  const { toggleFavorite, isFavorite, getProgress } = useApp();
  const fav = isFavorite(anime.id);
  const progress = getProgress(anime.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative shrink-0 w-[160px] sm:w-[200px] md:w-[220px]"
    >
      <div className="relative aspect-[2/3] rounded-xl overflow-hidden glass-card">
        <img
          src={anime.thumbnail}
          alt={anime.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-background/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
          <Link to={`/watch/${anime.id}`}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 rounded-full bg-primary flex items-center justify-center neon-glow"
            >
              <Play size={20} className="fill-primary-foreground text-primary-foreground ml-0.5" />
            </motion.button>
          </Link>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => toggleFavorite(anime.id)}
            className="w-8 h-8 rounded-full glass flex items-center justify-center"
          >
            {fav ? <Check size={14} className="text-primary" /> : <Plus size={14} />}
          </motion.button>
        </div>

        {/* Rating badge */}
        <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-md glass text-xs font-medium">
          <Star size={10} className="fill-primary text-primary" /> {anime.rating}
        </div>

        {/* Progress bar */}
        {showProgress && progress && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
            <div className="h-full bg-primary transition-all" style={{ width: `${progress.progress}%` }} />
          </div>
        )}
      </div>
      <p className="mt-2 text-sm font-medium text-foreground truncate">{anime.title}</p>
      <p className="text-xs text-muted-foreground">{anime.genres[0]}</p>
    </motion.div>
  );
};

export default MediaCard;
