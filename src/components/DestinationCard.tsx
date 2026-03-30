import { motion } from "framer-motion";
import { Calendar, IndianRupee } from "lucide-react";
import { Link } from "react-router-dom";
import type { Destination } from "@/data/types";

interface Props {
  destination: Destination;
  index: number;
}

const DestinationCard = ({ destination, index }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/destination/${destination.id}`}>
        <motion.div
          className="glass-card rounded-2xl overflow-hidden group cursor-pointer relative"
          whileHover={{
            y: -8,
            rotateX: 2,
            rotateY: -2,
            transition: { duration: 0.3 },
          }}
          style={{ transformStyle: "preserve-3d", perspective: 800 }}
        >
          {/* Image */}
          <div className="aspect-[4/5] overflow-hidden relative">
            <img
              src={destination.image}
              alt={destination.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

            {/* Best time badge */}
            <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full glass text-xs font-semibold text-foreground">
              <Calendar size={12} className="text-primary" />
              {destination.bestTime}
            </div>

            {/* Featured glow */}
            {destination.featured && (
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-primary-foreground bg-primary/90 animate-glow-pulse">
                Featured
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5 -mt-12 relative z-10">
            <p className="text-xs font-medium text-primary uppercase tracking-widest mb-1">{destination.state}</p>
            <h3 className="font-display font-bold text-xl text-foreground mb-1">{destination.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{destination.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-secondary font-display font-bold">
                <IndianRupee size={14} />
                <span>{destination.price.toLocaleString("en-IN")}</span>
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                destination.difficulty === "Easy"
                  ? "bg-primary/15 text-primary"
                  : destination.difficulty === "Moderate"
                  ? "bg-secondary/15 text-secondary"
                  : "bg-destructive/15 text-destructive"
              }`}>
                {destination.difficulty}
              </span>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default DestinationCard;
