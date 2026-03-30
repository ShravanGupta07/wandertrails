import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Compass, Mountain, MapPin, Trees } from "lucide-react";
import { Link } from "react-router-dom";
import heroImg from "@/assets/zanskar-valley.jpg";
import Shuffle from "./Shuffle";

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const shuffleProps = {
    shuffleDirection: "right" as const,
    duration: 0.5,
    animationMode: "evenodd" as const,
    shuffleTimes: 1,
    stagger: 0.03,
    triggerOnce: true,
    triggerOnHover: true
  };

  return (
    <section ref={ref} className="relative min-h-screen pt-32 pb-24 overflow-hidden flex flex-col items-center justify-center">
      {/* Parallax background (subtle) */}
      <motion.div
        className="absolute inset-0 z-0 opacity-40"
        style={{ y: bgY }}
      >
        <img
          src={heroImg}
          alt="Zanskar Valley"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/90" />
      </motion.div>

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px] animate-glow-pulse pointer-events-none" />

      {/* Content Container */}
      <div className="container mx-auto px-5 relative z-10 flex flex-col items-center text-center">
        {/* Creative Title */}
        <div className="flex flex-col items-center mb-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-4 h-auto"
          >
            <Shuffle text="W" {...shuffleProps} className="text-5xl sm:text-7xl md:text-9xl font-display font-bold tracking-tighter" />
            <motion.div whileHover={{ rotate: 15 }} className="text-primary self-center">
              <Compass size={64} className="w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20" />
            </motion.div>
            <Shuffle text="nd" {...shuffleProps} className="text-5xl sm:text-7xl md:text-9xl font-display font-bold tracking-tighter" />
            <motion.div whileHover={{ scale: 1.1 }} className="text-primary self-center">
              <Mountain size={64} className="w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20" />
            </motion.div>
            <Shuffle text="r" {...shuffleProps} className="text-5xl sm:text-7xl md:text-9xl font-display font-bold tracking-tighter" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-4 -mt-2 sm:-mt-6"
          >
            <Shuffle text="T" {...shuffleProps} className="text-5xl sm:text-7xl md:text-9xl font-display font-bold tracking-tighter text-primary" />
            <Shuffle text="r" {...shuffleProps} className="text-5xl sm:text-7xl md:text-9xl font-display font-bold tracking-tighter" />
            <motion.div whileHover={{ y: -5 }} className="text-primary self-center">
               <MapPin size={64} className="w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20" />
            </motion.div>
            <Shuffle text="i" {...shuffleProps} className="text-5xl sm:text-7xl md:text-9xl font-serif italic text-primary" />
            <motion.div whileHover={{ rotate: -10 }} className="text-primary self-center">
               <Trees size={64} className="w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20" />
            </motion.div>
            <Shuffle text="ls" {...shuffleProps} className="text-5xl sm:text-7xl md:text-9xl font-display font-bold tracking-tighter" />
          </motion.div>
        </div>

        {/* Tagline */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl text-foreground font-medium tracking-[0.2em] uppercase mb-16 opacity-80"
        >
          Travel makes you smarter
        </motion.p>

        {/* Featured Image with Scribbles */}
        <div className="relative w-full max-w-5xl mx-auto mt-8 px-4">
          {/* Scribble SVGs */}
          <svg className="absolute -top-16 -left-8 w-32 h-32 text-primary/30 z-20 pointer-events-none hidden sm:block" viewBox="0 0 100 100">
            <path d="M10,50 Q25,25 50,50 T90,50" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
            <circle cx="20" cy="30" r="3" fill="currentColor" />
          </svg>
          
          <svg className="absolute -bottom-16 -right-12 w-48 h-48 text-primary/20 z-20 pointer-events-none rotate-12 hidden sm:block" viewBox="0 0 100 100">
            <path d="M10,50 A40,40 0 1,1 90,50" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" />
          </svg>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative aspect-[16/9] rounded-[2.5rem] sm:rounded-[4.5rem] overflow-hidden shadow-2xl border border-white/5"
          >
            <img
              src={heroImg}
              alt="Discover WanderTrails"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            
            {/* Float Info Card */}
            <div className="absolute bottom-10 left-10 text-left glass p-5 rounded-2xl hidden md:block">
               <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">Featured Expedition</p>
               <h3 className="text-xl font-display font-bold">Zanskar Valleys</h3>
               <p className="text-xs text-foreground/60 italic">Ladakh, India</p>
            </div>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <div className="mt-20 flex flex-col sm:flex-row gap-6 justify-center w-full sm:w-auto px-4 sm:px-0">
            <Link to="/planner" className="w-full sm:w-auto">
              <motion.span
                className="btn-liquid inline-flex items-center justify-center gap-2 h-16 w-full sm:min-w-[220px] px-10 rounded-2xl font-body font-semibold tracking-wider text-white text-sm cursor-pointer shadow-lg shadow-primary/20"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Plan My Trip
                <ArrowRight size={20} />
              </motion.span>
            </Link>
            <Link to="/destinations" className="w-full sm:w-auto">
              <motion.span
                className="glass inline-flex items-center justify-center h-16 w-full sm:min-w-[220px] px-10 rounded-2xl font-body font-semibold tracking-wider text-foreground text-sm cursor-pointer border border-white/10 hover:bg-white/5 hover:border-white/20 transition-all"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Explore Destinations
              </motion.span>
            </Link>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
         <div className="absolute top-[10%] left-[5%] text-primary/20 w-32 h-32 blur-2xl rounded-full" />
         <div className="absolute bottom-[20%] right-[10%] text-secondary/20 w-48 h-48 blur-3xl rounded-full" />
      </div>
    </section>
  );
};

export default HeroSection;
