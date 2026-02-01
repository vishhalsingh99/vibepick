'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2, LogIn } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchemaType, registerUserSchema } from '@/schema/auth.schema';
import Image from 'next/image';
import google from '@/assets/google.png';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerUserSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: RegisterSchemaType) => {
    setServerError(null);
    try {
      await axios.post('/api/auth/register', data);

      await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      router.replace('/role-mobile');
    } catch (error: any) {
      setServerError(
        error.response?.data?.message ||
          'Something went wrong. Please try again.',
      );
    }
  };

  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      {/* Soft glow (mobile safe) */}
      <div className="pointer-events-none absolute top-24 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-vibe-orange/10 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="
          w-full max-w-sm sm:max-w-md
          rounded-3xl
          bg-white/5
          border border-white/10
          backdrop-blur-xl
          p-6 sm:p-8
        "
      >
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-extrabold">
            Create <span className="text-vibe-orange">Account</span>
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-white/60">
            Start shopping in minutes
          </p>
        </div>

        {serverError && (
          <p className="mb-4 rounded-xl bg-red-500/10 px-3 py-2 text-xs text-red-400">
            {serverError}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <Field label="Full Name" error={errors.name?.message}>
            <input
              {...register('name')}
              placeholder="Your name"
              className="input"
            />
          </Field>

          {/* Email */}
          <Field label="Email" error={errors.email?.message}>
            <input
              {...register('email')}
              placeholder="you@vibe.com"
              className="input"
            />
          </Field>

          {/* Password */}
          <Field label="Password" error={errors.password?.message}>
            <div className="relative">
              <input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="input pr-11"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 active:scale-90"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </Field>

          {/* Submit */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            disabled={!isValid || isSubmitting}
            className="
              mt-2 flex w-full items-center justify-center gap-2
              rounded-2xl bg-vibe-orange
              py-3 text-sm font-bold text-white
              transition
              disabled:opacity-60
            "
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                Create Account <LogIn className="h-4 w-4" />
              </>
            )}
          </motion.button>
        </form>

        {/* Divider */}
        <div className="my-5 flex items-center gap-3">
          <span className="h-px flex-1 bg-white/10" />
          <span className="text-[11px] text-white/40">OR</span>
          <span className="h-px flex-1 bg-white/10" />
        </div>

        {/* Google */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className="
            flex w-full items-center justify-center gap-3
            rounded-2xl border border-white/10
            bg-white/5 py-3
            transition hover:bg-white/10
          "
        >
          <Image src={google} width={18} height={18} alt="google" />
          <span className="text-sm font-medium">Continue with Google</span>
        </motion.button>

        {/* Footer */}
        <p className="mt-6 text-center text-xs sm:text-sm text-white/60">
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-bold text-vibe-orange active:opacity-70"
          >
            Log In
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

/* ---------- Reusable Field ---------- */
function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-white/60">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}

