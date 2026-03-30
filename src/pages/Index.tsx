import SiteNavbar from "@/components/SiteNavbar";
import SiteFooter from "@/components/SiteFooter";
import HeroSection from "@/components/HeroSection";
import FeaturedSection from "@/components/FeaturedSection";
import ExploreByCategorySection from "@/components/ExploreByCategorySection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import DomeGallery from "@/components/DomeGallery";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import { Camera } from "lucide-react";
import { motion } from "framer-motion";

import siteLogo from "@/assets/logo.png";
import LogoLoop from "@/components/LogoLoop";
import { 
  SiAirbnb, 
  SiTripadvisor, 
  SiExpedia, 
  SiBookingdotcom, 
  SiTrivago,
  SiHilton,
  SiMarriott,
  SiAmericanairlines,
  SiLufthansa,
  SiJetblue
} from "react-icons/si";

const travelLogos = [
  { node: <SiAirbnb size={32} />, title: "Airbnb", href: "https://airbnb.com" },
  { node: <SiTripadvisor size={32} />, title: "Tripadvisor", href: "https://tripadvisor.com" },
  { node: <SiExpedia size={32} />, title: "Expedia", href: "https://expedia.com" },
  { node: <SiBookingdotcom size={32} />, title: "Booking.com", href: "https://booking.com" },
  { node: <SiTrivago size={32} />, title: "Trivago", href: "https://trivago.com" },
  { node: <SiHilton size={32} />, title: "Hilton", href: "https://hilton.com" },
  { node: <SiMarriott size={32} />, title: "Marriott", href: "https://marriott.com" },
  { node: <SiAmericanairlines size={32} />, title: "American Airlines", href: "https://aa.com" },
  { node: <SiLufthansa size={32} />, title: "Lufthansa", href: "https://lufthansa.com" },
  { node: <SiJetblue size={32} />, title: "JetBlue", href: "https://jetblue.com" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SiteNavbar />
      <HeroSection />

      {/* Partner Agencies Loop */}
      <div className="py-16 relative overflow-hidden bg-transparent">
        <div className="container mx-auto px-5 mb-4">
          <p className="text-center text-[10px] uppercase tracking-[0.3em] text-primary/60 font-semibold mb-6">
            Trusted by Global Partners
          </p>
        </div>
        <div className="cinematic-mask">
          <LogoLoop
            logos={travelLogos}
            speed={40}
            direction="left"
            logoHeight={32}
            gap={100}
            fadeOut
            fadeOutColor="hsl(var(--background))"
            scaleOnHover
          />
        </div>
      </div>

      <FeaturedSection />
      <ExploreByCategorySection />
      <WhyChooseUsSection />
      
      {/* Immersive Gallery Section */}
      <section className="py-24 relative overflow-hidden bg-background">
        <div className="container mx-auto px-5 mb-14">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-2 text-primary text-sm font-semibold uppercase tracking-widest mb-3">
              <Camera size={16} />
              Gallery
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
              Captured <span className="gradient-text">Moments</span>
            </h2>
          </motion.div>
        </div>
        
        <div className="h-[80vh] min-h-[600px] w-full relative">
          <DomeGallery
            fit={0.8}
            minRadius={600}
            maxVerticalRotationDeg={0}
            segments={34}
            dragDampening={2}
            grayscale={false}
          />
        </div>
      </section>

      <TestimonialsSection />
      <FAQSection />
      <SiteFooter />
    </div>
  );
};

export default Index;
