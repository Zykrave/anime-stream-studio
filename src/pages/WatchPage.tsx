import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star } from 'lucide-react';
import animeData from '@/data/anime.json';
import { useApp, Anime, Episode } from '@/context/AppContext';
import Navbar from '@/components/Navbar';
import VideoPlayer from '@/components/VideoPlayer';
import EpisodeList from '@/components/EpisodeList';
import MediaCard from '@/components/MediaCard';
import Footer from '@/components/Footer';

const allAnime = animeData as Anime[];

const WatchPage = () => {
  const { id } = useParams<{ id: string }>();
  const anime = allAnime.find(a => a.id === id);
  const { updateProgress, getProgress } = useApp();

  const progress = getProgress(id || '');
  const [currentEpisode, setCurrentEpisode] = useState<Episode>(
    () => {
      if (progress && anime) {
        const ep = anime.episodes.find(e => e.id === progress.episodeId);
        if (ep) return ep;
      }
      return anime?.episodes[0] || { id: '', number: 1, title: '', duration: '' };
    }
  );

  const recommended = useMemo(
    () => allAnime.filter(a => a.id !== id).slice(0, 6),
    [id]
  );

  if (!anime) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-muted-foreground">Anime not found</p>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Navbar />
      <main className="pt-20 px-4 sm:px-6 md:px-10 max-w-[1400px] mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-4">
          <ArrowLeft size={16} /> Back
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          {/* Player */}
          <div>
            <VideoPlayer
              title={`${anime.title} - Ep ${currentEpisode.number}: ${currentEpisode.title}`}
              initialProgress={progress?.episodeId === currentEpisode.id ? progress.progress : 0}
              onProgressChange={p => updateProgress(anime.id, currentEpisode.id, p)}
            />
            <div className="mt-6">
              <h1 className="text-2xl font-display font-bold">{anime.title}</h1>
              <div className="flex items-center gap-3 mt-2 mb-4">
                <span className="flex items-center gap-1 text-sm text-primary"><Star size={14} className="fill-primary" /> {anime.rating}</span>
                {anime.genres.map(g => (
                  <span key={g} className="text-xs px-2 py-0.5 rounded-full glass text-muted-foreground">{g}</span>
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{anime.description}</p>
            </div>
          </div>

          {/* Episode sidebar */}
          <div className="glass-card p-4">
            <EpisodeList
              episodes={anime.episodes}
              currentEpisodeId={currentEpisode.id}
              onSelect={ep => setCurrentEpisode(ep)}
            />
          </div>
        </div>

        {/* Recommended */}
        <section className="mt-12">
          <h2 className="text-xl font-display font-bold mb-4">Recommended</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {recommended.map((a, i) => (
              <MediaCard key={a.id} anime={a} index={i} />
            ))}
          </div>
        </section>

        <Footer />
      </main>
    </motion.div>
  );
};

export default WatchPage;
