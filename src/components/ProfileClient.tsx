'use client';

import { useState } from 'react';
import axios from 'axios';
import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  Loader2,
  Save,
  Pencil,
  X,
} from 'lucide-react';
import { motion } from 'motion/react';
import LogoutButton from './LogoutButton';

type Props = {
  user: {
    name: string;
    email: string;
    mobile?: string;
    role: 'user' | 'deliveryBoy';
  };
};

export default function ProfileClient({ user }: Props) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user.name,
    mobile: user.mobile || '',
    role: user.role,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSave() {
    try {
      setLoading(true);
      setError('');
      await axios.patch('/api/user/update', form);
      setEditing(false);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
        min-h-[calc(100vh-4rem)]
        flex items-start sm:items-center
        justify-center
        px-4 sm:px-4
        text-white
      "
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="
          w-full
          max-w-lg sm:max-w-xl md:max-w-2xl
          bg-white/5
          border border-white/10
          rounded-2xl sm:rounded-3xl
          p-5 sm:p-8
        "
      >
        {/* HEADER */}
        <div
          className="
            flex flex-col sm:flex-row
            sm:items-center sm:justify-between
            gap-4
            mb-6 sm:mb-8
          "
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
            My <span className="text-orange-400">Profile</span>
          </h2>

          <div className="flex gap-2">
            {!editing ? (
              <>
                <button
                  onClick={() => setEditing(true)}
                  className="
                    flex items-center gap-2
                    px-4 py-2
                    rounded-xl
                    bg-white/10
                    hover:bg-orange-500
                    transition
                    text-sm
                  "
                >
                  <Pencil size={16} />
                  Edit
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="
                    flex items-center gap-2
                    px-4 py-2
                    rounded-xl
                    bg-orange-500
                    font-bold
                    text-sm
                  "
                >
                  {loading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <>
                      <Save size={16} /> Save
                    </>
                  )}
                </button>

                <button
                  onClick={() => setEditing(false)}
                  className="
                    px-3 py-2
                    rounded-xl
                    bg-white/10
                  "
                >
                  <X size={16} />
                </button>
              </>
            )}
          </div>
        </div>

        {/* FORM */}
        <div className="space-y-5 sm:space-y-6">
          {/* NAME */}
          <Field label="Name" icon={<User className="text-orange-400" />}>
            <input
              name="name"
              disabled={!editing}
              value={form.name}
              onChange={handleChange}
              className={inputClass(editing)}
            />
          </Field>

          {/* EMAIL */}
          <Field label="Email" icon={<Mail className="text-orange-400" />}>
            <input
              disabled
              value={user.email}
              className={inputClass(false)}
            />
          </Field>

          {/* MOBILE */}
          <Field label="Mobile" icon={<Phone className="text-orange-400" />}>
            <input
              name="mobile"
              disabled={!editing}
              value={form.mobile}
              onChange={handleChange}
              className={inputClass(editing)}
            />
          </Field>

          {/* ROLE (NOW SAME LOOK) */}
          <Field
            label="Role"
            icon={(!editing ? <ShieldCheck className='text-orange-400' /> : <ShieldCheck className='hidden'/>)}
          >
            {!editing ? (
              <input
                disabled
                value={
                  form.role === 'deliveryBoy'
                    ? 'Delivery Boy'
                    : 'User'
                }
                className={inputClass(false)}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {(['user', 'deliveryBoy'] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() =>
                      setForm({ ...form, role: r })
                    }
                    className={`
                      rounded-xl border p-4
                      transition
                      ${
                        form.role === r
                          ? 'border-orange-400 bg-orange-400/10'
                          : 'border-white/10 bg-white/5'
                      }
                    `}
                  >
                    
                    <p className="text-sm font-bold uppercase">
                      {r === 'deliveryBoy'
                        ? 'Delivery Boy'
                        : 'User'}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </Field>

          {error && (
            <p className="text-red-400 text-sm">
              {error}
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}

/* ================= HELPERS ================= */

function inputClass(editable: boolean) {
  return `
    w-full
    pl-12
    py-3 sm:py-3.5
    px-4
    rounded-xl
    text-sm sm:text-base
    border
    ${
      editable
        ? 'bg-black/40 border-white/10'
        : 'bg-black/30 border-white/5 opacity-80 cursor-not-allowed'
    }
  `;
}

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[11px] sm:text-xs uppercase opacity-60">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          {icon}
        </div>
        {children}
      </div>
    </div>
  );
}
