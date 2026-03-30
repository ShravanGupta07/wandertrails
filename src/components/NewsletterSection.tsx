import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    console.log("Newsletter subscription:", email);
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <section className="py-24 px-5 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <motion.div
        className="container mx-auto relative z-10 max-w-2xl text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Stay Connected</p>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
          Get Offbeat Travel <span className="gradient-text">Inspiration</span>
        </h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Join 5,000+ explorers. Weekly hidden gems, travel tips, and exclusive early-bird deals — straight to your inbox.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="flex-1 px-5 py-3.5 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
          />
          <motion.button
            type="submit"
            className="btn-liquid inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-display font-bold text-primary-foreground text-sm"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {subscribed ? (
              <>
                <CheckCircle size={16} />
                Subscribed!
              </>
            ) : (
              <>
                <Send size={16} />
                Subscribe
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

export default NewsletterSection;
