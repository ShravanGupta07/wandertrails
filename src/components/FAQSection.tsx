import { motion } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "What makes WanderTrails different from other travel agencies?",
    a: "We exclusively focus on offbeat, unexplored Indian destinations. Every trip is designed with local guides, small groups (max 12), and sustainable travel practices. We don't do cookie-cutter tourism — each itinerary is handcrafted for authentic cultural immersion.",
  },
  {
    q: "Are your trips safe for solo travelers and women?",
    a: "Absolutely. Safety is our top priority. All accommodations and guides are thoroughly vetted, we provide 24/7 on-ground support, and our group trips always have a certified trek leader. Over 40% of our travelers are solo women explorers.",
  },
  {
    q: "What is included in the trip price?",
    a: "Our packages typically include accommodation, meals (breakfast & dinner), local transport, guide fees, permits, and activity costs. Flights/trains to the base city, travel insurance, and personal expenses are usually excluded. Each destination page has a detailed inclusion list.",
  },
  {
    q: "How fit do I need to be for challenging treks like Zanskar or Spiti?",
    a: "For 'Challenging' rated destinations, we recommend a basic fitness level — being able to walk 8-10 km on uneven terrain. We provide a pre-trip fitness guide and acclimatization days are built into every high-altitude itinerary.",
  },
  {
    q: "Can I customize my itinerary or travel dates?",
    a: "Yes! While we offer fixed-departure group trips, we also specialize in private custom trips. Use our AI Itinerary Planner to get a starting framework, then our travel coordinators will fine-tune it to your preferences, pace, and budget.",
  },
  {
    q: "What is your cancellation and refund policy?",
    a: "We offer full refunds for cancellations made 30+ days before departure, 50% refund for 15-30 days, and no refund within 15 days. We strongly recommend travel insurance. Force majeure events (weather, natural disasters) are handled on a case-by-case basis with trip credits.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-5 relative">
      <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto relative z-10 max-w-3xl">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-2 text-primary text-sm font-semibold uppercase tracking-widest mb-3">
            <HelpCircle size={16} />
            FAQ
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
            Common <span className="gradient-text">Questions</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              className="glass-card rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-6 text-left"
              >
                <span className="font-display font-semibold text-sm md:text-base text-foreground">{faq.q}</span>
                <motion.span
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="shrink-0"
                >
                  <ChevronDown size={18} className="text-primary" />
                </motion.span>
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === i ? "auto" : 0,
                  opacity: openIndex === i ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <p className="px-6 pb-6 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
