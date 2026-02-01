'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, ShieldCheck, Loader2, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { updateProfileSchema } from '@/schema/updateProfile.schema';
import axios from 'axios';

export default function EditProfile() {
  const router = useRouter();

  const [form, setForm] = useState<{
    mobile: string;
    role: 'user' | 'deliveryBoy';
  }>({
    mobile: '',
    role: 'user',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    const parsed = updateProfileSchema.safeParse(form);
    if (!parsed.success) {
      return setError(parsed.error.issues[0].message);
    }

    try {
      setLoading(true);
      await axios.patch('/api/user/update', parsed.data, {
        withCredentials: true,
      });
      router.replace('/profile');
    } catch (err: any) {
      setError(
        err.response?.data?.message || err.message || 'Something went wrong',
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="
          w-full max-w-lg
          rounded-3xl
          bg-white/5
          border border-white/10
          backdrop-blur-xl
          p-6 md:p-8
        "
      >
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">
            Complete your{' '}
            <span className="text-vibe-orange">Profile</span>
          </h2>
          <p className="mt-1 text-xs text-white/60">
            Add the final details to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Mobile */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-white/70">
              Mobile Number
            </label>

            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <input
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                placeholder="9876543210"
                className="
                  w-full rounded-xl
                  bg-white/5
                  border border-white/10
                  px-3 py-2.5 pl-10
                  text-sm text-white
                  placeholder:text-white/40
                  focus:outline-none
                  focus:ring-2 focus:ring-vibe-orange/40
                "
              />
            </div>
          </div>

          {/* Role */}
          <div>
            <p className="mb-2 text-xs font-medium text-white/70">
              Select Role
            </p>

            <div className="grid grid-cols-2 gap-3">
              {(['user', 'deliveryBoy'] as const).map((r) => {
                const active = form.role === r;

                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setForm({ ...form, role: r })}
                    className={`
                      rounded-xl border px-3 py-3 text-center transition
                      ${
                        active
                          ? 'border-vibe-orange/40 bg-vibe-orange/10'
                          : 'border-white/10 hover:bg-white/5'
                      }
                    `}
                  >
                    <ShieldCheck
                      size={18}
                      className={`mx-auto mb-1.5 ${
                        active ? 'text-vibe-orange' : 'text-white/40'
                      }`}
                    />
                    <p
                      className={`text-xs font-semibold uppercase ${
                        active ? 'text-white' : 'text-white/60'
                      }`}
                    >
                      {r}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-400">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full rounded-xl
              bg-vibe-orange
              py-2.5 text-sm font-semibold text-white
              flex items-center justify-center gap-2
              hover:bg-[#e65f00]
              transition
              disabled:opacity-60
            "
          >
            {loading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <>
                <Save size={16} />
                Save Changes
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
