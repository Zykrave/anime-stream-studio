import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize, SkipForward, SkipBack } from 'lucide-react';

interface VideoPlayerProps {
  title: string;
  onProgressChange?: (progress: number) => void;
  initialProgress?: number;
}

const VideoPlayer = ({ title, onProgressChange, initialProgress = 0 }: VideoPlayerProps) => {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(initialProgress);
  const [showControls, setShowControls] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval>>();
  const hideRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (playing) {
      timerRef.current = setInterval(() => {
        setProgress(prev => {
          const next = Math.min(prev + 0.5, 100);
          onProgressChange?.(next);
          if (next >= 100) { setPlaying(false); clearInterval(timerRef.current); }
          return next;
        });
      }, 500);
    }
    return () => clearInterval(timerRef.current);
  }, [playing, onProgressChange]);

  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(hideRef.current);
    hideRef.current = setTimeout(() => playing && setShowControls(false), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative w-full aspect-video bg-background rounded-xl overflow-hidden group cursor-pointer"
      onMouseMove={handleMouseMove}
      onClick={() => setPlaying(!playing)}
    >
      {/* Mock video display */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted to-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground text-sm mb-2">Now Playing</p>
          <p className="font-display font-bold text-lg">{title}</p>
        </div>
      </div>

      {/* Controls overlay */}
      <motion.div
        animate={{ opacity: showControls ? 1 : 0 }}
        className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/30 flex flex-col justify-end p-4"
        onClick={e => e.stopPropagation()}
      >
        {/* Progress bar */}
        <div className="w-full h-1 bg-muted rounded-full mb-3 cursor-pointer" onClick={e => {
          const rect = e.currentTarget.getBoundingClientRect();
          const p = ((e.clientX - rect.left) / rect.width) * 100;
          setProgress(p);
          onProgressChange?.(p);
        }}>
          <div className="h-full bg-primary rounded-full relative transition-all" style={{ width: `${progress}%` }}>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary neon-glow" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="hover:text-primary transition-colors" onClick={() => setProgress(p => Math.max(0, p - 10))}>
              <SkipBack size={18} />
            </button>
            <button className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-colors" onClick={() => setPlaying(!playing)}>
              {playing ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
            </button>
            <button className="hover:text-primary transition-colors" onClick={() => setProgress(p => Math.min(100, p + 10))}>
              <SkipForward size={18} />
            </button>
            <button className="hover:text-primary transition-colors" onClick={() => setMuted(!muted)}>
              {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">{Math.floor(progress * 0.24)}:00 / 24:00</span>
            <button className="hover:text-primary transition-colors"><Maximize size={18} /></button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default VideoPlayer;
