'use client';

import { motion } from 'framer-motion'; // ← motion/react → framer-motion (latest & stable)
import {

  Zap,
  ShieldCheck,
  Star,
} from 'lucide-react';
import HeroSection from './HeroSection';


export default function Features() {
  return (
    <>
      
 

      {/* ================= FEATURES ================= */}
      <section className="py-16 sm:py-20 md:py-24 px-5 sm:px-8 lg:px-12 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent"
          >
            Why VibePick?
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            <FeatureCard
              icon={<Zap className="w-7 h-7 sm:w-8 sm:h-8 text-vibe-orange" />}
              title="Lightning Delivery"
              desc="10–30 min in your area — freshest possible."
            />
            <FeatureCard
              icon={<ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8 text-vibe-orange" />}
              title="Quality First"
              desc="Handpicked, verified sellers only."
            />
            <FeatureCard
              icon={<Star className="w-7 h-7 sm:w-8 sm:h-8 text-vibe-orange" />}
              title="Exclusive Vibes"
              desc="Premium & unique items — not on every app."
            />
          </div>
        </div>
      </section>
    </>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="group p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-vibe-orange/30 hover:bg-white/10 transition-all duration-300 hover:shadow-xl hover:shadow-vibe-orange/10"
    >
      <div className="mb-5 sm:mb-6 p-3 sm:p-4 bg-white/5 rounded-2xl w-fit group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl sm:text-2xl font-bold mb-3">{title}</h3>
      <p className="text-white/70 text-base sm:text-lg">{desc}</p>
    </motion.div>
  );
}