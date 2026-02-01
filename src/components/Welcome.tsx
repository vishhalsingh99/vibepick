"use client";

import { motion } from "motion/react";
import Logo from "./Logo";
import { ArrowRight, Sparkles } from "lucide-react";

type propType = {
  nextStep: (s: number) => void;
};

function Welcome({ nextStep }: propType) {
  return (
    <div
      className="
        flex flex-col items-center justify-center
        min-h-[calc(100vh-4rem)]
        text-center
        px-5 sm:px-6
        max-w-xl sm:max-w-2xl md:max-w-3xl
        mx-auto
      "
    >
      {/* Logo – soft intro */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-8 sm:mb-10"
      >
        <Logo />
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col items-center"
      >
        {/* Badge – micro pulse */}
        <motion.div
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="
            mb-6 sm:mb-8
            flex items-center gap-2
            rounded-full
            border border-vibe-orange/20
            bg-vibe-orange/10
            px-3.5 py-1.5
            backdrop-blur-sm
          "
        >
          <Sparkles className="h-4 w-4 text-vibe-orange" />
          <span
            className="
              text-[11px] sm:text-xs
              font-bold tracking-widest uppercase
              text-vibe-orange
            "
          >
            Next-Gen Delivery
          </span>
        </motion.div>

        {/* Headline – mobile first */}
        <h2
          className="
            mb-8 sm:mb-10
            text-2xl sm:text-3xl md:text-4xl
            font-extrabold
            leading-tight
            tracking-tight
            text-white
          "
        >
          Groceries That Match Your{" "}
          <span className="relative inline-block px-1">
            <span className="relative z-10 text-vibe-orange italic">
              Mood
            </span>
            {/* underline micro accent */}
            <span className="absolute left-0 -bottom-1 h-[6px] w-full rounded-full bg-vibe-orange/25" />
          </span>
          , Delivered{" "}
          <span className="underline decoration-vibe-orange decoration-4 underline-offset-6">
            Fast
          </span>
          .
        </h2>

        {/* CTA – tactile micro-interaction */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => nextStep(2)}
          className="
            group
            flex items-center justify-center gap-2
            w-full sm:w-auto
            rounded-2xl
            bg-vibe-orange
            px-8 sm:px-10 py-4
            text-base sm:text-lg
            font-extrabold text-white
            transition
            shadow-[0_6px_20px_rgba(255,107,0,0.35)]
            hover:shadow-[0_8px_28px_rgba(255,107,0,0.45)]
          "
        >
          Start Shopping
          {/* arrow micro nudge */}
          <motion.span
            className="inline-flex"
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowRight className="h-5 w-5" />
          </motion.span>
        </motion.button>
      </motion.div>
    </div>
  );
}

export default Welcome;
