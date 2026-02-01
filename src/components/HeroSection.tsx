'use client'

import { Sparkles, ShoppingBag, ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'

type Props = {
  isLoggedIn: boolean
}

function HeroSection({ isLoggedIn }: Props) {
  return (
         <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 px-5 sm:px-8 lg:px-12 overflow-hidden min-h-[70vh] flex items-center">
        {/* Background orb - responsive size */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-vibe-orange/10 blur-[100px] md:blur-[140px] rounded-full -z-10" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="max-w-7xl mx-auto text-center relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 sm:py-2 rounded-full bg-white/5 border border-white/10 mb-6 sm:mb-8 text-xs sm:text-sm font-bold tracking-widest uppercase text-white/70">
            <Sparkles className="w-4 h-4 text-vibe-orange animate-pulse" />
            New Season Fresh Picks
          </div>

          {/* Fluid typography with clamp */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-tight">
            PICK YOUR{' '}
            <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-vibe-orange via-orange-400 to-orange-500">
              PERFECT VIBE
            </span>
          </h1>

          <p className="max-w-xl sm:max-w-2xl mx-auto text-white/70 text-base sm:text-lg md:text-xl mb-10 leading-relaxed">
            Fresh groceries • Premium lifestyle • Delivered with vibe — lightning fast.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            {isLoggedIn ? (
              <Link
                href="/explore"
                className="group flex items-center justify-center gap-2.5 rounded-2xl bg-vibe-orange px-7 sm:px-10 py-4 text-base sm:text-lg font-bold text-white hover:bg-orange-700 transition-all duration-300 shadow-xl shadow-vibe-orange/25 hover:shadow-2xl hover:scale-[1.03] active:scale-95 min-w-[220px]"
              >
                Explore Fresh Picks
                <ShoppingBag className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            ) : (
              <Link
                href="/register"
                className="group flex items-center justify-center gap-2.5 rounded-2xl bg-vibe-orange px-7 sm:px-10 py-4 text-base sm:text-lg font-bold text-white hover:bg-orange-700 transition-all duration-300 shadow-xl shadow-vibe-orange/25 hover:shadow-2xl hover:scale-[1.03] active:scale-95 min-w-[220px]"
              >
                Start Your Vibe
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            )}

            {/* Secondary CTA - good for SEO/conversion */}
            <Link
              href="/about"
              className="text-white/80 hover:text-white transition text-base sm:text-lg font-medium underline-offset-4 hover:underline"
            >
              Learn how it works →
            </Link>
          </div>
        </motion.div>
      </section>
  )
}
export default HeroSection