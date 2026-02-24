import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { Episode } from '@/context/AppContext';

interface EpisodeListProps {
  episodes: Episode[];
  currentEpisodeId: string;
  onSelect: (ep: Episode) => void;
}

const EpisodeList = ({ episodes, currentEpisodeId, onSelect }: EpisodeListProps) => (
  <div className="flex flex-col gap-2">
    <h3 className="font-display font-bold text-lg mb-2">Episodes</h3>
    <div className="flex flex-col gap-1 max-h-[400px] overflow-y-auto scrollbar-hide">
      {episodes.map(ep => (
        <motion.button
          key={ep.id}
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(ep)}
          className={`flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
            ep.id === currentEpisodeId ? 'bg-primary/10 border border-primary/30' : 'glass-card hover:bg-muted/50'
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
            {ep.id === currentEpisodeId ? (
              <Play size={14} className="text-primary fill-primary ml-0.5" />
            ) : (
              <span className="text-xs text-muted-foreground">{ep.number}</span>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">{ep.title}</p>
            <p className="text-xs text-muted-foreground">{ep.duration}</p>
          </div>
        </motion.button>
      ))}
    </div>
  </div>
);

export default EpisodeList;
