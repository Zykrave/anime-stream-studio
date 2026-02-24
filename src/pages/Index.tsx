import { motion } from 'framer-motion';
import animeData from '@/data/anime.json';
import { useApp, Anime } from '@/context/AppContext';
import Navbar from '@/components/Navbar';
import HeroBanner from '@/components/HeroBanner';
import CarouselRow from '@/components/CarouselRow';
import Footer from '@/components/Footer';

const allAnime = animeData as Anime[];

const Index = () => {
  const { getContinueWatching } = useApp();
  const continueWatching = getContinueWatching();
  const continueAnime = continueWatching.map(w => allAnime.find(a => a.id === w.animeId)).filter(Boolean) as Anime[];

  const trending = [...allAnime].sort((a, b) => b.popularity - a.popularity);
  const popular = [...allAnime].sort((a, b) => b.rating - a.rating);
  const recent = [...allAnime].reverse();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Navbar />
      <main>
        <HeroBanner anime={allAnime[0]} />
        <div className="-mt-20 relative z-10">
          {continueAnime.length > 0 && (
            <CarouselRow title="Continue Watching" items={continueAnime} showProgress />
          )}
          <CarouselRow title="🔥 Trending Now" items={trending} />
          <CarouselRow title="⭐ Popular Anime" items={popular} />
          <CarouselRow title="🆕 Recently Added" items={recent} />
        </div>
        <Footer />
      </main>
    </motion.div>
  );
};

export default Index;
