import { motion } from "framer-motion";
import { Compass, Mountain, Tent, TreePine, Landmark, Waves } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  { icon: Mountain, label: "High-Altitude Treks", count: 12, color: "from-primary/20 to-primary/5", destinations: "Zanskar, Spiti, Gurez" },
  { icon: TreePine, label: "Forest & Valley Retreats", count: 8, color: "from-emerald-500/20 to-emerald-500/5", destinations: "Tirthan, Dzukou" },
  { icon: Waves, label: "River & Island Escapes", count: 6, color: "from-blue-500/20 to-blue-500/5", destinations: "Majuli, Zanskar" },
  { icon: Landmark, label: "Heritage & Culture Trails", count: 10, color: "from-secondary/20 to-secondary/5", destinations: "Majuli, Spiti" },
  { icon: Tent, label: "Camping & Stargazing", count: 7, color: "from-violet-500/20 to-violet-500/5", destinations: "Spiti, Gurez, Dzukou" },
  { icon: Compass, label: "Weekend Getaways", count: 15, color: "from-rose-500/20 to-rose-500/5", destinations: "Tirthan, Gurez" },
];

const ExploreByCategorySection = () => (
  <section className="py-24 px-5 relative overflow-hidden">
    <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-secondary/5 blur-3xl pointer-events-none" />

    <div className="container mx-auto relative z-10">
      <motion.div
        className="text-center mb-14"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Explore by Style</p>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
          Find Your <span className="gradient-text">Adventure</span>
        </h2>
        <p className="text-muted-foreground mt-4 max-w-md mx-auto text-sm">
          Whether you crave high passes or quiet rivers, pick the travel style that speaks to your soul.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <Link to="/destinations">
              <motion.div
                className="glass-card rounded-2xl p-6 flex items-start gap-5 group cursor-pointer"
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} border border-border flex items-center justify-center shrink-0 group-hover:shadow-[0_0_20px_hsla(174,85%,48%,0.15)] transition-shadow`}>
                  <cat.icon size={24} className="text-foreground" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-display font-bold text-foreground text-sm">{cat.label}</h3>
                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{cat.count}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{cat.destinations}</p>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ExploreByCategorySection;
