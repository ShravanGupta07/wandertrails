import { motion } from "framer-motion";
import { Shield, Users, Leaf, Headphones, Map, Sparkles } from "lucide-react";

const features = [
  { icon: Map, title: "Hyper-Local Expertise", desc: "Every itinerary is crafted with local guides who call these places home." },
  { icon: Shield, title: "Safety First", desc: "24/7 on-ground support, emergency protocols, and vetted accommodations." },
  { icon: Leaf, title: "Sustainable Travel", desc: "We follow Leave No Trace principles and support community-based tourism." },
  { icon: Users, title: "Small Groups", desc: "Max 12 travelers per trip for intimate, authentic cultural exchange." },
  { icon: Sparkles, title: "AI-Powered Planning", desc: "Smart itinerary builder that adapts to your pace, budget, and interests." },
  { icon: Headphones, title: "Concierge Support", desc: "Dedicated trip coordinator from booking to your safe return home." },
];

const WhyChooseUsSection = () => (
  <section className="py-24 px-5 relative">
    <div className="absolute inset-0 opacity-[0.02]" style={{
      backgroundImage: "radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)",
      backgroundSize: "40px 40px",
    }} />

    <div className="container mx-auto relative z-10">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Why WanderTrails</p>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
          Built for the <span className="gradient-text">Bold Explorer</span>
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            className="glass-card rounded-2xl p-7 group cursor-default"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:shadow-[0_0_20px_hsla(174,85%,48%,0.2)] transition-shadow">
              <f.icon size={22} className="text-primary" />
            </div>
            <h3 className="font-display font-bold text-foreground mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUsSection;
