import { motion } from "framer-motion";
import { ArrowRight, MapPin, Mountain } from "lucide-react";
import { Link } from "react-router-dom";
import DestinationCard from "@/components/DestinationCard";
import { destinations } from "@/data/destinations";

const FeaturedSection = () => {
  const featured = destinations.filter((d) => d.featured);

  return (
    <section className="py-24 px-5 relative">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(hsla(174,85%,48%,1) 1px, transparent 1px), linear-gradient(to right, hsla(174,85%,48%,1) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />

      <div className="container mx-auto relative z-10">
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-14 gap-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <div className="flex items-center gap-2 text-primary text-sm font-semibold uppercase tracking-widest mb-3">
              <Mountain size={16} />
              Featured Trails
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
              Paths Less Traveled
            </h2>
          </div>
          <Link
            to="/destinations"
            className="flex items-center gap-2 text-sm font-medium text-primary hover:text-secondary transition-colors group"
          >
            View all destinations
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((dest, i) => (
            <DestinationCard key={dest.id} destination={dest} index={i} />
          ))}
        </div>

        {/* Stats strip */}
        <motion.div
          className="mt-20 glass-card rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {[
            { value: "50+", label: "Offbeat Destinations" },
            { value: "2,000+", label: "Travelers Guided" },
            { value: "12", label: "Indian States Covered" },
            { value: "4.9★", label: "Average Rating" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl md:text-3xl font-display font-bold gradient-text">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedSection;
