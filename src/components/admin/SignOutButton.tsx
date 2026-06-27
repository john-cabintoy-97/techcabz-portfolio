'use client';

import { useTransition } from 'react';
import { signOut } from '@/lib/actions';

export function SignOutButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(async () => await signOut())}
      disabled={isPending}
      className="btn-ghost text-sm"
    >
      {isPending ? 'Signing out...' : 'Sign out'}
    </button>
  );
}
