import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Anime } from '@/context/AppContext';
import MediaCard from './MediaCard';

interface CarouselRowProps {
  title: string;
  items: Anime[];
  showProgress?: boolean;
}

const CarouselRow = ({ title, items, showProgress = false }: CarouselRowProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  if (items.length === 0) return null;

  return (
    <section className="py-6">
      <div className="flex items-center justify-between mb-4 px-4 sm:px-6 md:px-10">
        <h2 className="text-lg sm:text-xl font-display font-bold">{title}</h2>
        <div className="flex gap-2">
          <button onClick={() => scroll('left')} className="w-8 h-8 rounded-full glass flex items-center justify-center hover:border-primary/50 transition-colors">
            <ChevronLeft size={16} />
          </button>
          <button onClick={() => scroll('right')} className="w-8 h-8 rounded-full glass flex items-center justify-center hover:border-primary/50 transition-colors">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide px-4 sm:px-6 md:px-10 scroll-smooth snap-x"
      >
        {items.map((anime, i) => (
          <div key={anime.id} className="snap-start">
            <MediaCard anime={anime} index={i} showProgress={showProgress} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CarouselRow;
