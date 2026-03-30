import { Link } from "react-router-dom";
import { 
  FaInstagram, 
  FaTwitter, 
  FaFacebook, 
  FaYoutube 
} from "react-icons/fa";

const SiteFooter = () => (
  <footer className="relative bg-background pt-24 pb-12 px-5 overflow-hidden">
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-16">
        {/* Logo & Brand */}
        <Link to="/" className="flex flex-col items-center md:items-start gap-4">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="WanderTrails" className="w-10 h-10 object-contain" />
            <span className="text-3xl font-display font-black tracking-tighter text-foreground uppercase">
              Wander<span className="text-primary italic">Trails</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs text-center md:text-left leading-relaxed">
            Reimagining offbeat travel through the lens of local explorers and futuristic design.
          </p>
        </Link>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 text-sm font-display font-medium uppercase tracking-widest text-muted-foreground">
          <Link to="/destinations" className="hover:text-primary transition-all duration-300">Destinations</Link>
          <Link to="/planner" className="hover:text-primary transition-all duration-300">Trail Scout</Link>
          <Link to="/contact" className="hover:text-primary transition-all duration-300">Contact Us</Link>
          <a href="#" className="hover:text-primary transition-all duration-300">Journal</a>
        </div>

        {/* Socials */}
        <div className="flex items-center gap-6">
          <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center border border-white/5 bg-white/5 hover:bg-primary hover:text-primary-foreground transition-all duration-500 group">
            <FaInstagram size={18} />
          </a>
          <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center border border-white/5 bg-white/5 hover:bg-primary hover:text-primary-foreground transition-all duration-500 group">
            <FaTwitter size={18} />
          </a>
          <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center border border-white/5 bg-white/5 hover:bg-primary hover:text-primary-foreground transition-all duration-500 group">
            <FaFacebook size={18} />
          </a>
          <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center border border-white/5 bg-white/5 hover:bg-primary hover:text-primary-foreground transition-all duration-500 group">
            <FaYoutube size={18} />
          </a>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-4">
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 font-semibold">
          © 2026 WanderTrails India. Designed for the bold.
        </p>
        <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40 font-bold">
          <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
