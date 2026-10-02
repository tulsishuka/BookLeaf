import { useState } from 'react';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Quote,
} from 'lucide-react';

import loginImg from '../assets/l.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#f6f2ea] flex items-center justify-center px-4 py-8 sm:px-8">

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* LEFT — Literary Image */}
        <div className="relative min-h-[480px] lg:min-h-[620px] rounded-3xl overflow-hidden">

          <img
            src={loginImg}
            alt="BookLeaf literary space"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Soft dark overlay */}
          <div className="absolute inset-0 bg-black/45" />

          {/* Content */}
          <div className="relative z-10 h-full min-h-[480px] lg:min-h-[620px] p-8 sm:p-10 flex flex-col justify-between text-white">

            <div>
              <p className="text-xs tracking-[0.25em] uppercase text-white/70 mb-3">
                BookLeaf Publishing
              </p>

              <div className="w-10 h-px bg-white/50" />
            </div>

            <div className="max-w-md">

              <span className="block text-5xl font-serif text-[#d8b77a] mb-2">
                “
              </span>

              <h1 className="text-4xl sm:text-5xl font-serif leading-tight mb-5">
                Every story deserves a reader.
              </h1>

              <p className="text-sm sm:text-base text-white/75 leading-relaxed">
                A quiet space for authors to follow their books,
                connect with their publishing team, and bring
                their words into the world.
              </p>

            </div>

            <div className="border-t border-white/20 pt-5">
              <p className="text-xs text-white/60">
                Your words. Your journey. Your book.
              </p>
            </div>

          </div>
        </div>

        {/* RIGHT — Login */}
        <div className="bg-[#fbf8f3] border border-[#e8dfd1] rounded-3xl shadow-lg flex items-center">

          <div className="w-full p-7 sm:p-10 lg:p-12">

            {/* Heading */}
            <div className="mb-8">

              <p className="text-xs uppercase tracking-[0.2em] text-[#9c6a3a] font-semibold mb-3">
                Author Portal
              </p>

              <h2 className="text-3xl sm:text-4xl font-serif text-[#1c1917] mb-3">
                Welcome back.
              </h2>

              <p className="text-sm text-[#786c5e] leading-relaxed">
                Sign in to continue your publishing journey.
              </p>

            </div>

            {/* Form */}
            <form className="space-y-5">

              {/* Email */}
              <div>

                <label className="block text-xs font-semibold text-[#574f46] mb-2">
                  Email address
                </label>

                <div className="relative">

                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9c8264]" />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="
                      w-full
                      bg-white
                      border border-[#dfd5c3]
                      rounded-xl
                      py-3
                      pl-10
                      pr-4
                      text-sm
                      text-[#1c1917]
                      placeholder:text-[#b5aa9c]
                      focus:outline-none
                      focus:border-[#9c6a3a]
                      focus:ring-2
                      focus:ring-[#9c6a3a]/10
                      transition
                    "
                  />

                </div>
              </div>

              {/* Password */}
              <div>

                <label className="block text-xs font-semibold text-[#574f46] mb-2">
                  Password
                </label>

                <div className="relative">

                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9c8264]" />

                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="
                      w-full
                      bg-white
                      border border-[#dfd5c3]
                      rounded-xl
                      py-3
                      pl-10
                      pr-11
                      text-sm
                      text-[#1c1917]
                      placeholder:text-[#b5aa9c]
                      focus:outline-none
                      focus:border-[#9c6a3a]
                      focus:ring-2
                      focus:ring-[#9c6a3a]/10
                      transition
                    "
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="
                      absolute
                      right-3.5
                      top-1/2
                      -translate-y-1/2
                      text-[#9c8264]
                      hover:text-[#1c1917]
                      transition
                    "
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>

                </div>
              </div>

              {/* Forgot password */}
              <div className="flex justify-end">

                <button
                  type="button"
                  className="text-xs text-[#9c6a3a] hover:underline"
                >
                  Forgot password?
                </button>

              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="
                  w-full
                  bg-[#1c1917]
                  hover:bg-[#2c2825]
                  text-[#f5f2eb]
                  rounded-xl
                  py-3.5
                  text-sm
                  font-semibold
                  flex
                  items-center
                  justify-center
                  gap-2
                  shadow-sm
                  hover:shadow-md
                  transition-all
                "
              >
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </form>

            {/* Quote */}
            <div className="mt-10 pt-6 border-t border-[#e8dfd1]">

              <div className="flex gap-3">

                <div className="w-8 h-8 rounded-full bg-[#ede4d7] flex items-center justify-center shrink-0">
                  <Quote className="w-4 h-4 text-[#9c6a3a]" />
                </div>

                <div>
                  <p className="text-xs text-[#6f655b] italic leading-relaxed">
                    “Your book is more than a manuscript. It is a piece
                    of you, and it deserves to be cared for.”
                  </p>

                  <p className="mt-2 text-[11px] font-semibold text-[#2c2825]">
                    BookLeaf Publishing
                  </p>
                </div>

              </div>

            </div>

            {/* Bottom note */}
            <p className="text-center text-[11px] text-[#a09383] mt-8">
              A private space for BookLeaf authors
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;