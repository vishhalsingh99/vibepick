'use client';

import { signIn } from 'next-auth/react';
import {
  Eye,
  EyeOff,
  Loader2,
  LogIn,
  Sparkles,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchemaType, loginUserSchema } from '@/schema/auth.schema';
import Image from 'next/image';
import google from '@/assets/google.png';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginUserSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: LoginSchemaType) => {
    setServerError(null);
    const res = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (res?.error) {
      setServerError('Invalid email or password');
      return;
    }

    router.replace('/');
  };

  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-4">
      {/* Glow */}
      <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[420px] h-[420px] bg-vibe-orange/10 blur-[140px] rounded-full -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          w-full max-w-md
          bg-white/5
          border border-white/10
          backdrop-blur-xl
          rounded-[2.5rem]
          p-8 md:p-10
        "
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 w-fit rounded-2xl border border-vibe-orange/20 bg-vibe-orange/10 p-3">
            <Sparkles className="h-6 w-6 text-vibe-orange" />
          </div>
          <h1 className="text-3xl font-bold text-white">
            Login to <span className="text-vibe-orange">VibePick</span>
          </h1>
          <p className="mt-2 text-sm text-white/60">
            Welcome back, we missed your vibe.
          </p>
        </div>

        {/* Error */}
        {serverError && (
          <p className="mb-4 rounded-xl bg-red-500/10 px-4 py-2 text-sm text-red-400">
            {serverError}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-white/60">
              Email
            </label>
            <input
              {...register('email')}
              placeholder="name@example.com"
              className="input"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-white/60">
              Password
            </label>

            <div className="relative">
              <input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="input"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-vibe-orange"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            {errors.password && (
              <p className="mt-1 text-xs text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            disabled={!isValid || isSubmitting}
            className="
              mt-4 flex w-full items-center justify-center gap-2
              rounded-2xl bg-vibe-orange
              py-3 font-bold text-white
              hover:bg-[#e65f00]
              transition
              disabled:opacity-60
            "
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                Login <LogIn className="h-5 w-5" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <span className="h-px flex-1 bg-white/10" />
          <span className="text-xs text-white/40">OR</span>
          <span className="h-px flex-1 bg-white/10" />
        </div>

        {/* Google */}
        <button
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className="
            flex w-full items-center justify-center gap-3
            rounded-2xl border border-white/10
            bg-white/5 py-3
            hover:bg-white/10
            transition
          "
        >
          <Image src={google} width={20} height={20} alt="google" />
          <span className="text-sm font-medium text-white">
            Continue with Google
          </span>
        </button>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-white/60">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-vibe-orange font-bold hover:text-white">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
