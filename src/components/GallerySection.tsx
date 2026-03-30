import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import zanskarImg from "@/assets/zanskar-valley.jpg";
import tirthanImg from "@/assets/tirthan-valley.jpg";
import majuliImg from "@/assets/majuli-island.jpg";
import spitiImg from "@/assets/spiti-valley.jpg";
import dzukouImg from "@/assets/dzukou-valley.jpg";
import gurezImg from "@/assets/gurez-valley.jpg";

const images = [
  { src: zanskarImg, alt: "Zanskar Valley frozen river canyon", span: "col-span-2 row-span-2" },
  { src: tirthanImg, alt: "Tirthan Valley pine forests", span: "" },
  { src: majuliImg, alt: "Majuli Island river sunset", span: "" },
  { src: spitiImg, alt: "Spiti Valley monastery on cliffs", span: "col-span-2" },
  { src: dzukouImg, alt: "Dzukou Valley wildflowers", span: "" },
  { src: gurezImg, alt: "Gurez Valley alpine meadows", span: "" },
];

const GallerySection = () => (
  <section className="py-24 px-5 relative">
    <div className="container mx-auto">
      <motion.div
        className="text-center mb-14"
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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[180px] md:auto-rows-[220px]">
        {images.map((img, i) => (
          <motion.div
            key={img.alt}
            className={`relative rounded-2xl overflow-hidden group cursor-pointer ${img.span}`}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <p className="text-xs font-display font-semibold text-foreground">{img.alt}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default GallerySection;
