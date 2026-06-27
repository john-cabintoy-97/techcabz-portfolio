'use client';

import { useFormState } from 'react-dom';
import { signIn } from '@/lib/actions';

export default function LoginPage() {
 const [state, formAction, isPending] = useFormState(signIn, null);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      {/* Background */}
      <div className="absolute inset-0 dot-grid-bg opacity-20" />
      <div className="absolute inset-0 bg-gradient-radial from-accent/5 via-transparent to-transparent" />

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <a
            href="/"
            className="font-display font-bold text-2xl text-foreground hover:text-accent transition-colors"
          >
            <span className="text-orange">TECH</span>CABZ
          </a>
          <p className="text-muted text-sm mt-2">Admin dashboard</p>
        </div>

        {/* Card */}
        <div className="bg-surface border border-border rounded-2xl p-8">
          <h1 className="font-display font-bold text-xl text-foreground mb-6">
            Sign in
          </h1>

          {state?.error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm mb-4">
              {state.error}
            </div>
          )}

          <form action={formAction} className="space-y-4">
            <div>
              <label htmlFor="email" className="label">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="input"
              />
            </div>

            <div>
              <label htmlFor="password" className="label">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="input"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="btn-primary w-full justify-center mt-2"
            >
              {isPending ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-muted text-xs mt-6">
          Admin access only.{' '}
          <a href="/" className="text-accent hover:text-accent-hover">
            Back to portfolio →
          </a>
        </p>
      </div>
    </div>
  );
}
