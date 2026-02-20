// app/unauthorized/page.tsx
import Link from 'next/link';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-[var(--color-vibe-bg)] flex items-center justify-center px-4">
      <div className="card max-w-md w-full text-center space-y-6">
        <div className="mx-auto w-20 h-20 rounded-full bg-[var(--color-status-error-soft)] flex items-center justify-center">
          <ShieldAlert size={40} className="text-[var(--color-status-error)]" />
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-[var(--color-vibe-text-primary)]">
            Access Denied
          </h1>
          <p className="text-[var(--color-vibe-text-secondary)] text-lg">
            You don't have permission to view this page.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            href="/"
            className="btn-primary flex items-center justify-center gap-2"
          >
            <ArrowLeft size={18} />
            Go to Home
          </Link>

          <Link
            href="/login"
            className="
              px-6 py-3 rounded-xl
              border border-[var(--color-vibe-border)]
              text-[var(--color-vibe-text-secondary)]
              hover:bg-[var(--color-vibe-surface-hover)]
              transition-all duration-200
            "
          >
            Login with different account
          </Link>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Unauthorized - Access Denied',
  description: 'You do not have permission to access this page.',
};