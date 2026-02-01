'use client';

import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
  return (
    <button
      onClick={() =>
        signOut({
          callbackUrl: '/login',
        })
      }
      className="
        group flex items-center gap-2
        rounded-xl
        border border-red-500/30
        bg-red-500/5
        px-5 py-2.5
        text-red-400
        transition
        hover:bg-red-500
        hover:text-white
        hover:border-red-500
      "
    >
      <LogOut className="h-4 w-4 transition-transform group-hover:rotate-12" />
      <span className="text-sm font-semibold">
        Logout
      </span>
    </button>
  );
}
