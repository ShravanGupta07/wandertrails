import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, IndianRupee, Mountain, Clock, Users, MapPin, ChevronRight, Send } from "lucide-react";
import { useState } from "react";
import SiteNavbar from "@/components/SiteNavbar";
import SiteFooter from "@/components/SiteFooter";
import { destinations } from "@/data/destinations";
import { destinationDetails } from "@/data/destinationDetails";

const DestinationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dest = destinations.find((d) => d.id === id);
  const details = id ? destinationDetails[id] : undefined;
  const [selectedImg, setSelectedImg] = useState(0);

  if (!dest || !details) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold text-foreground mb-4">Destination not found</h1>
          <Link to="/destinations" className="text-primary hover:underline">← Back to destinations</Link>
        </div>
      </div>
    );
  }

  const allImages = [dest.image, ...details.gallery];

  return (
    <div className="min-h-screen bg-background">
      <SiteNavbar />

      <div className="pt-24 pb-24">
        {/* Back button */}
        <div className="container mx-auto px-5 mb-6">
          <motion.button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <ArrowLeft size={16} />
            Back
          </motion.button>
        </div>

        {/* Hero Gallery */}
        <div className="container mx-auto px-5 mb-12">
          <div className="grid lg:grid-cols-[1fr_340px] gap-4">
            {/* Main image */}
            <motion.div
              className="relative aspect-[16/9] lg:aspect-auto lg:min-h-[480px] rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <img
                src={allImages[selectedImg]}
                alt={dest.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-1">{dest.state} • {dest.region}</p>
                <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground">{dest.name}</h1>
              </div>
            </motion.div>

            {/* Thumbnail strip */}
            <motion.div
              className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
            >
              {allImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImg(i)}
                  className={`shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImg === i
                      ? "border-primary shadow-lg shadow-primary/20"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${dest.name} view ${i + 1}`}
                    loading="lazy"
                    className="w-24 h-20 lg:w-full lg:h-32 object-cover"
                  />
                </button>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-5">
          <div className="grid lg:grid-cols-[1fr_380px] gap-10">
            {/* Left - Details */}
            <div>
              {/* Quick stats */}
              <motion.div
                className="glass-card rounded-2xl p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                    <Calendar size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Best Time</p>
                    <p className="text-sm font-semibold text-foreground">{dest.bestTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary/15 flex items-center justify-center">
                    <Clock size={18} className="text-secondary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Duration</p>
                    <p className="text-sm font-semibold text-foreground">{details.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                    <Users size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Group Size</p>
                    <p className="text-sm font-semibold text-foreground">{details.groupSize}</p>
                  </div>
                </div>
                {details.altitude && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-secondary/15 flex items-center justify-center">
                      <Mountain size={18} className="text-secondary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Altitude</p>
                      <p className="text-sm font-semibold text-foreground">{details.altitude}</p>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Description */}
              <motion.div
                className="mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">About This Destination</h2>
                <p className="text-muted-foreground leading-relaxed">{details.longDescription}</p>
              </motion.div>

              {/* Highlights */}
              <motion.div
                className="mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">Trip Highlights</h2>
                <div className="space-y-3">
                  {details.highlights.map((h, i) => (
                    <motion.div
                      key={i}
                      className="flex items-start gap-3 glass-card rounded-xl p-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.08 }}
                    >
                      <ChevronRight size={18} className="text-primary mt-0.5 shrink-0" />
                      <span className="text-sm text-foreground">{h}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* What's Included */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">What's Included</h2>
                <div className="glass-card rounded-2xl p-6">
                  <ul className="space-y-2.5">
                    {details.includes.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>

            {/* Right - Sticky booking card */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <motion.div
                className="glass-card rounded-2xl p-6 glow-border"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-xs text-muted-foreground">Starting from</p>
                    <div className="flex items-center gap-1 text-3xl font-display font-bold text-secondary">
                      <IndianRupee size={22} />
                      <span>{dest.price.toLocaleString("en-IN")}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">per person</p>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                    dest.difficulty === "Easy"
                      ? "bg-primary/15 text-primary"
                      : dest.difficulty === "Moderate"
                      ? "bg-secondary/15 text-secondary"
                      : "bg-destructive/15 text-destructive"
                  }`}>
                    {dest.difficulty}
                  </span>
                </div>

                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin size={15} className="text-primary" />
                    <span>{dest.state}, {dest.region}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Calendar size={15} className="text-primary" />
                    <span>Best: {dest.bestTime}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Clock size={15} className="text-secondary" />
                    <span>{details.duration}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Users size={15} className="text-secondary" />
                    <span>{details.groupSize}</span>
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to={`/contact?destination=${encodeURIComponent(dest.name)}`}
                    className="btn-liquid w-full px-8 py-4 rounded-xl font-display font-bold text-primary-foreground text-sm flex items-center justify-center gap-2"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Send size={16} />
                      Enquire Now
                    </span>
                  </Link>
                </motion.div>

                <p className="text-center text-xs text-muted-foreground mt-3">
                  No payment required • Get a custom quote
                </p>
              </motion.div>

              {/* People also viewed */}
              <motion.div
                className="mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="text-sm font-semibold text-foreground mb-3">People also explore</h3>
                <div className="space-y-2">
                  {destinations
                    .filter((d) => d.id !== dest.id)
                    .slice(0, 3)
                    .map((d) => (
                      <Link
                        key={d.id}
                        to={`/destination/${d.id}`}
                        className="flex items-center gap-3 glass-card rounded-xl p-3 hover:bg-muted/30 transition-colors group"
                      >
                        <img src={d.image} alt={d.name} className="w-12 h-12 rounded-lg object-cover" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-foreground truncate">{d.name}</p>
                          <p className="text-xs text-muted-foreground">{d.state}</p>
                        </div>
                        <ChevronRight size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                      </Link>
                    ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
};

export default DestinationDetail;
