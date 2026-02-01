import { ShoppingBag, Zap } from "lucide-react";

const Logo = () => {
  return (
    <div
      className="
        group flex items-center gap-1.5 sm:gap-2
        cursor-pointer select-none
      "
      aria-label="VibePick Logo"
    >
      {/* Icon */}
      <div className="relative flex items-center justify-center">
        <ShoppingBag
          className="
            h-7 w-7
            sm:h-8 sm:w-8
            md:h-9 md:w-9
            text-vibe-orange
          "
          strokeWidth={2.5}
        />

        {/* Spark (micro-moment) */}
        <Zap
          className="
            absolute -top-0.5 -right-0.5
            h-3.5 w-3.5
            sm:h-4 sm:w-4
            text-white fill-vibe-orange
            transition-transform duration-300
            group-hover:scale-110
            group-active:scale-95
          "
        />
      </div>

      {/* Brand text */}
      <h1
        className="
          text-lg
          sm:text-xl
          md:text-2xl
          font-extrabold tracking-tight
          leading-none
        "
      >
        <span className="text-white">Vibe</span>
        <span className="text-vibe-orange">Pick</span>
      </h1>
    </div>
  );
};

export default Logo;
