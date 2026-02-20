"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { User, LayoutDashboard, Menu, Search, X, PackagePlus, ClipboardList } from "lucide-react";
import Logo from "./Logo";
import LogoutButton from "./LogoutButton";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user as { name?: string; role?: 'user' | 'deliveryBoy' | 'admin' } | null;

  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path || pathname.startsWith(path);

  const isAdmin = user?.role === "admin";
  const isDeliveryBoy = user?.role === "deliveryBoy";

  // Links for regular users & delivery boys
  const publicLinks = [
    { href: "/explore", label: "Explore" },
    { href: "/trending", label: "Trending" },
    { href: "/about", label: "About" },
  ];

  // Links exclusive to admin
  const adminLinks = [
    { href: "/admin/manage-orders", label: "Manage Orders", icon: <ClipboardList className="h-5 w-5" /> },
    { href: "/admin/add-grocery", label: "Add Grocery", icon: <PackagePlus className="h-5 w-5" /> },
  ];

  return (
    <>
      {/* Main Navbar */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <Logo />
          </Link>

          {/* Desktop view: ≥ 1000px */}
          <div className="hidden min-[1000px]:flex items-center gap-4 lg:gap-6">
            {/* Navigation Links – role-based */}
            <div className="flex gap-5 text-sm font-medium text-white/80">
              {isAdmin ? (
                <>
                  {adminLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center gap-2 hover:text-vibe-orange transition-colors ${
                        isActive(link.href) ? "text-vibe-orange" : ""
                      }`}
                    >
                      {link.icon}
                      {link.label}
                    </Link>
                  ))}
                </>
              ) : (
                <>
                  {publicLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`hover:text-vibe-orange transition-colors ${
                        isActive(link.href) ? "text-vibe-orange" : ""
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </>
              )}
            </div>

            {/* Search Bar (visible to all) */}
            <form action="/search" className="relative min-w-[200px] max-w-[260px] flex-1">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
              <input
                name="q"
                placeholder="Search groceries..."
                className="
                  w-full rounded-full bg-white/5 border border-white/10
                  py-2 pl-10 pr-4 text-sm text-white placeholder:text-white/50
                  focus:border-vibe-orange/50 focus:bg-white/10
                  outline-none transition-all
                "
              />
            </form>

            {/* Auth / User Section */}
            {user ? (
              <div className="flex items-center gap-4">
                <Link
                  href="/profile"
                  className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 hover:bg-white/10 transition text-sm"
                >
                  <div className="h-7 w-7 rounded-full bg-vibe-orange/20 flex items-center justify-center">
                    <User className="h-4 w-4 text-vibe-orange" />
                  </div>
                  <span className="font-medium">{user.name?.split(" ")[0] || "User"}</span>
                </Link>

                <Link
                  href={isAdmin ? "/admin/dashboard" : "/dashboard"}
                  className="rounded-lg p-2.5 text-white/70 hover:bg-white/10 transition"
                >
                  <LayoutDashboard className="h-5 w-5" />
                </Link>

                <LogoutButton />
              </div>
            ) : (
              <div className="flex gap-3">
                <Link
                  href="/login"
                  className={`rounded-full px-5 py-2 text-sm font-medium transition
                    ${isActive("/login") ? "bg-vibe-orange text-white shadow-sm shadow-vibe-orange/30" : "text-white/80 hover:text-white"}`}
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className={`rounded-full px-5 py-2 text-sm font-medium transition
                    ${isActive("/register") ? "bg-vibe-orange text-white shadow-sm shadow-vibe-orange/30" : "border border-white/20 text-white hover:bg-white/5"}`}
                >
                  Join
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Icons (below 1000px) */}
          <div className="flex items-center gap-2 min-[1000px]:hidden">
            <button
              onClick={() => setMobileSearchOpen(true)}
              className="rounded-lg p-2.5 hover:bg-white/10 transition"
              aria-label="Open search"
            >
              <Search className="h-5 w-5 text-white/90" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="rounded-lg p-2.5 hover:bg-white/10 transition"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6 text-white/90" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {mobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-0 z-[60] bg-black/95 backdrop-blur-xl px-4 pt-5 pb-8 min-[1000px]:hidden"
          >
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/50" />
                <input
                  autoFocus
                  placeholder="Search groceries..."
                  className="w-full rounded-2xl bg-white/10 border border-white/10 py-3.5 pl-12 pr-5 text-base text-white placeholder:text-white/50 focus:border-vibe-orange/50 outline-none"
                />
              </div>
              <button
                onClick={() => setMobileSearchOpen(false)}
                className="p-3 rounded-xl hover:bg-white/10"
                aria-label="Close search"
              >
                <X className="h-6 w-6 text-white/90" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 180 }}
            className="fixed inset-0 z-[70] bg-black/95 backdrop-blur-xl p-6 min-[1000px]:hidden overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-8">
              <Logo />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-white/10"
                aria-label="Close menu"
              >
                <X className="h-7 w-7 text-white/90" />
              </button>
            </div>

            <div className="flex flex-col gap-6 text-lg font-medium text-white/90">
              {/* Role-based mobile links */}
              {isAdmin ? (
                <>
                  {adminLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center gap-3 hover:text-vibe-orange transition-colors ${
                        isActive(link.href) ? "text-vibe-orange" : ""
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.icon}
                      {link.label}
                    </Link>
                  ))}
                </>
              ) : (
                <>
                  {publicLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`hover:text-vibe-orange transition-colors ${
                        isActive(link.href) ? "text-vibe-orange" : ""
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </>
              )}

              <div className="mt-10 pt-6 border-t border-white/10">
                {user ? (
                  <div className="flex flex-col gap-6">
                    <Link
                      href="/profile"
                      className="hover:text-vibe-orange transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      href={isAdmin ? "/admin/dashboard" : "/dashboard"}
                      className="hover:text-vibe-orange transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <div className="pt-3">
                      <LogoutButton />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-5">
                    <Link
                      href="/login"
                      className="hover:text-vibe-orange transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/register"
                      className="hover:text-vibe-orange transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Join
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}