import { motion } from "framer-motion";
import { CalendarDays, Users, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const trips = [
  {
    destination: "Zanskar Valley",
    id: "zanskar",
    dates: "Jul 12 – Jul 18, 2026",
    duration: "7 Days",
    groupSize: "8/12 spots filled",
    price: 18500,
    spotsLeft: 4,
    tag: "Filling Fast",
  },
  {
    destination: "Spiti Valley",
    id: "spiti",
    dates: "Aug 5 – Aug 11, 2026",
    duration: "7 Days",
    groupSize: "5/12 spots filled",
    price: 14200,
    spotsLeft: 7,
    tag: "New",
  },
  {
    destination: "Dzükou Valley",
    id: "dzukou",
    dates: "Sep 20 – Sep 23, 2026",
    duration: "4 Days",
    groupSize: "3/12 spots filled",
    price: 9800,
    spotsLeft: 9,
    tag: "Early Bird",
  },
];

const UpcomingTripsSection = () => (
  <section className="py-24 px-5 relative">
    <div className="absolute inset-0 opacity-[0.02]" style={{
      backgroundImage: "linear-gradient(hsla(174,85%,48%,1) 1px, transparent 1px), linear-gradient(to right, hsla(174,85%,48%,1) 1px, transparent 1px)",
      backgroundSize: "80px 80px",
    }} />

    <div className="container mx-auto relative z-10">
      <motion.div
        className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-14 gap-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div>
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Upcoming Departures</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
            Join a <span className="gradient-text">Group Trip</span>
          </h2>
        </div>
        <Link
          to="/destinations"
          className="flex items-center gap-2 text-sm font-medium text-primary hover:text-secondary transition-colors group"
        >
          View all trips
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {trips.map((trip, i) => (
          <motion.div
            key={trip.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Link to={`/destination/${trip.id}`}>
              <motion.div
                className="glass-card rounded-2xl p-6 relative group cursor-pointer h-full flex flex-col"
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
              >
                {/* Tag */}
                <span className={`absolute top-4 right-4 text-[10px] font-bold px-2.5 py-1 rounded-full ${
                  trip.tag === "Filling Fast"
                    ? "bg-destructive/15 text-destructive"
                    : trip.tag === "Early Bird"
                    ? "bg-secondary/15 text-secondary"
                    : "bg-primary/15 text-primary"
                }`}>
                  {trip.tag}
                </span>

                <div className="flex items-center gap-1.5 text-primary text-xs font-semibold uppercase tracking-wider mb-2">
                  <MapPin size={12} />
                  {trip.destination}
                </div>

                <div className="space-y-3 mt-2 flex-1">
                  <div className="flex items-center gap-2 text-sm text-foreground/80">
                    <CalendarDays size={14} className="text-muted-foreground" />
                    <span>{trip.dates}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground/80">
                    <Users size={14} className="text-muted-foreground" />
                    <span>{trip.groupSize}</span>
                  </div>
                </div>

                {/* Spots bar */}
                <div className="mt-5">
                  <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden mb-2">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${((12 - trip.spotsLeft) / 12) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.1 + 0.3 }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{trip.spotsLeft} spots left</span>
                    <span className="font-display font-bold text-secondary">₹{trip.price.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default UpcomingTripsSection;
