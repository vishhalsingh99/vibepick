import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

type propType = {
  previousStep: (s: number) => void;
};

function RegisterForm({ previousStep }: propType) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-10 relative bg-black text-white">
      {/* Back Button - Ab ye hover par thoda peeche move karega */}
      <button
        onClick={() => previousStep(1)}
        className="absolute top-8 left-6 flex items-center gap-2 text-vibe-orange hover:text-white transition-all duration-300 group"
      >
        <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
        <span className="font-medium">Back</span>
      </button>

      {/* Heading with Animation */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">
          Create <span className="text-vibe-orange">Account</span>
        </h1>
        <p className="text-vibe-text text-sm md:text-base">
          Join the vibe and start shopping groceries.
        </p>
      </motion.div>

      {/* Form Fields Yahan Aayenge */}
      <motion.form
        className="w-full max-w-md mt-10 space-y-4 bg-vibe-charcoal/50 p-10 rounded-2xl backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold uppercase tracking-widest text-vibe-text">
            Email Address
          </label>
          <input
            type="email"
            placeholder="you@vibe.com"
            className="bg-vibe-charcoal border border-white/10 p-4 rounded-xl focus:border-vibe-orange outline-none transition-all"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold uppercase tracking-widest text-vibe-text">
            Name
          </label>
          <input
            type="text"
            placeholder="Your Name"
            className="bg-vibe-charcoal border border-white/10 p-4 rounded-xl focus:border-vibe-orange outline-none transition-all"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold uppercase tracking-widest text-vibe-text">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              className="bg-vibe-charcoal border border-white/10 p-4 rounded-xl focus:border-vibe-orange outline-none transition-all w-full"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-vibe-text hover:text-vibe-orange transiiton-colors"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </motion.form>
    </div>
  );
}

export default RegisterForm;
