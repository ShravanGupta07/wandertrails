import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Arjun Mehta",
    location: "Mumbai",
    avatar: "AM",
    rating: 5,
    text: "Zanskar was life-changing. WanderTrails arranged everything from the Chadar trek logistics to monastery visits. The local guide knew every hidden cave!",
    destination: "Zanskar Valley",
  },
  {
    name: "Priya Sharma",
    location: "Bengaluru",
    avatar: "PS",
    rating: 5,
    text: "Tirthan Valley was the perfect digital detox. Waking up to the sound of the river, trout fishing, and the homestay food — simply magical.",
    destination: "Tirthan Valley",
  },
  {
    name: "Rohan Das",
    location: "Kolkata",
    avatar: "RD",
    rating: 5,
    text: "Majuli Island felt like stepping into another century. The Sattriya dance performance and mask-making workshop were highlights I'll never forget.",
    destination: "Majuli Island",
  },
  {
    name: "Kavitha Nair",
    location: "Chennai",
    avatar: "KN",
    rating: 5,
    text: "Spiti's Key Monastery at sunset is something photographs can't capture. WanderTrails made the challenging route feel safe and exhilarating.",
    destination: "Spiti Valley",
  },
];

const TestimonialsSection = () => (
  <section className="py-24 px-5 relative overflow-hidden">
    <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-secondary/5 blur-3xl pointer-events-none" />

    <div className="container mx-auto relative z-10">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Testimonials</p>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
          Stories from the <span className="gradient-text">Trail</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            className="glass-card rounded-2xl p-8 relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Quote size={32} className="text-primary/20 absolute top-6 right-6" />

            <div className="flex items-center gap-1 mb-4">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} size={14} className="fill-secondary text-secondary" />
              ))}
            </div>

            <p className="text-foreground/85 leading-relaxed mb-6 text-sm md:text-base">"{t.text}"</p>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center text-xs font-display font-bold text-primary">
                {t.avatar}
              </div>
              <div>
                <p className="font-display font-semibold text-sm text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.location} · {t.destination}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
