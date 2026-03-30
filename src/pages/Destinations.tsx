import { useState, useMemo, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import SiteNavbar from "@/components/SiteNavbar";
import SiteFooter from "@/components/SiteFooter";
import DestinationCard from "@/components/DestinationCard";
import { destinations } from "@/data/destinations";

import PixelSnow from "@/components/PixelSnow";

const difficultyFilters = ["All", "Easy", "Moderate", "Challenging"] as const;

const Destinations = () => {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState<string>("All");
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = useMemo(() => {
    return destinations.filter((d) => {
      const matchesSearch =
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.state.toLowerCase().includes(search.toLowerCase()) ||
        d.region.toLowerCase().includes(search.toLowerCase());
      const matchesDifficulty = difficulty === "All" || d.difficulty === difficulty;
      return matchesSearch && matchesDifficulty;
    });
  }, [search, difficulty]);

  return (
    <div className="min-h-screen bg-background">
      <SiteNavbar />

      <div className="relative pt-40 pb-32 px-5 overflow-hidden flex flex-col items-center">
        {/* PixelSnow Background Animation */}
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
          <PixelSnow 
            color="#ffffff"
            flakeSize={0.01}
            minFlakeSize={1.25}
            pixelResolution={200}
            speed={1.25}
            density={0.3}
            direction={125}
            brightness={1}
            depthFade={8}
            farPlane={20}
            gamma={0.4545}
            variant="square"
          />
        </div>

        <div className="container mx-auto relative z-10 flex flex-col items-center">
          {/* Hero Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold text-foreground mb-4 max-w-5xl tracking-tighter leading-[1.1]">
              Discover Your Life, <br />
              <span className="gradient-text">Travel Where You Want</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg md:text-xl">
              Explore India's most remote and beautiful corners — from frozen Himalayan
              canyons to untouched river islands.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="pb-24 px-5">
        <div className="container mx-auto flex flex-col items-center">
          {/* Search & filter bar */}
          <motion.div
            className="glass-card rounded-[2rem] p-4 flex flex-col sm:flex-row gap-4 mb-16 w-full max-w-4xl relative z-20 -mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 flex-1 bg-muted/40 rounded-2xl px-4 py-3 border border-white/5 focus-within:border-primary/30 transition-all">
              <Search size={20} className="text-muted-foreground shrink-0" />
              <input
                type="text"
                placeholder="Search destinations, states..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent text-foreground text-sm placeholder:text-muted-foreground w-full focus:outline-none"
              />
            </div>

            {/* Filter dropdown button */}
            <div className="relative shrink-0" ref={filterRef}>
              <button
                onClick={() => setFilterOpen((o) => !o)}
                className={`flex items-center gap-2 px-4 py-3 rounded-2xl border transition-all ${
                  filterOpen
                    ? "bg-primary text-primary-foreground border-primary/50 shadow-lg shadow-primary/20"
                    : difficulty !== "All"
                    ? "bg-primary/15 text-primary border-primary/30"
                    : "bg-muted/40 text-muted-foreground border-white/5 hover:text-foreground hover:border-white/10"
                }`}
              >
                <SlidersHorizontal size={18} className="shrink-0" />
                {difficulty !== "All" && (
                  <span className="text-xs font-semibold">{difficulty}</span>
                )}
              </button>

              {/* Dropdown panel */}
              {filterOpen && (
                <div className="absolute right-0 top-full mt-2 glass-card rounded-2xl p-2 flex flex-col gap-1 z-50 min-w-[160px] shadow-xl">
                  {difficultyFilters.map((f) => (
                    <button
                      key={f}
                      onClick={() => { setDifficulty(f); setFilterOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                        difficulty === f
                          ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((dest, i) => (
                <DestinationCard key={dest.id} destination={dest} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No destinations found matching your search.</p>
            </div>
          )}
        </div>
      </div>

      <SiteFooter />
    </div>
  );
};

export default Destinations;
