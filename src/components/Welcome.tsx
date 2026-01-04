"use client"

import { motion } from "motion/react"; // Correct import for motion
import Logo from "./Logo";
import { ArrowRight, ShoppingBasket, Sparkles } from "lucide-react";

type propType = {
    nextStep: (s:number) => void;
}

function Welcome({nextStep}: propType) {
  return (
    // Background already body se handle ho raha hai, yahan centering focus hai
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 max-w-5xl mx-auto">
        
        {/* Logo Animation */}
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
        >
            <Logo />
        </motion.div>

        {/* Content Animation Container */}
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col items-center"
        >
            {/* Badge */}
            <div className="flex items-center gap-2 bg-vibe-orange/10 border border-vibe-orange/20 px-4 py-1.5 rounded-full mb-8 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-vibe-orange" />
                <span className="text-vibe-orange text-xs md:text-sm font-bold tracking-widest uppercase">
                    Next-Gen Delivery
                </span>
            </div>

            {/* Tagline Paragraph (The Real Content) */}
            <h2 className="max-w-3xl text-3xl md:text-5xl lg:text-6xl font-extrabold text-vibe-text leading-[1.1] mb-10 tracking-tight">
                <span className="text-white">Groceries</span> That Match Your{" "}
                <span className="relative inline-block px-2">
                    <span className="relative z-10 text-vibe-orange italic">Mood</span>
                    <svg className="absolute -bottom-2 left-0 w-full h-3 text-vibe-orange/30" viewBox="0 0 100 12" preserveAspectRatio="none">
                        <path d="M0,10 Q50,0 100,10" stroke="currentColor" strokeWidth="4" fill="transparent" />
                    </svg>
                </span>
                , Delivered <span className="text-white underline decoration-vibe-orange decoration-4 underline-offset-8">Fast</span>.
            </h2>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center gap-2 bg-vibe-orange hover:shadow-[0_0_20px_rgba(255,107,0,0.4)] text-white px-10 py-4 rounded-2xl font-extrabold text-lg transition-all duration-300"
                    onClick={()=>nextStep(2)}
                >
                    Start Shopping
                    <ArrowRight className="w-5 h-5" />
                </motion.button>
                
                {/* <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white px-10 py-4 rounded-2xl font-extrabold text-lg transition-all backdrop-blur-md"
                >
                    <ShoppingBasket className="w-5 h-5 text-vibe-orange" />
                    Browse
                </motion.button> */}
            </div>
        </motion.div>
    </div>
  )
}

export default Welcome;