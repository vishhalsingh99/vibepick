import { ShoppingBag, Zap } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center gap-2 group cursor-pointer">
      {/* Icon Container */}
      <div className="relative">
        <ShoppingBag className="w-10 h-10 md:w-12 md:h-12 text-vibe-orange" strokeWidth={2.5} />
        {/* Vibe Sparkle - Zap Icon */}
        <Zap className="w-5 h-5 text-white fill-vibe-orange absolute -top-1 -right-1 group-hover:scale-125 transition-transform" />
      </div>

      {/* Brand Name */}
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter">
        <span className="text-white">Vibe</span>
        <span className="text-vibe-orange">Pick</span>
      </h1>
    </div>
  );
};

export default Logo;