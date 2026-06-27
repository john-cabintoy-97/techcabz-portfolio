import Link from 'next/link';
import { SignOutButton } from '@/components/admin/SignOutButton';
import { createClient } from '@/lib/supabase/server';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Admin Topbar */}
      <header className="border-b border-border bg-surface/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              href="/admin"
              className="font-display font-bold text-foreground hover:text-accent transition-colors"
            >
              <span className="text-accent">A</span>dmin
            </Link>
            <nav className="hidden sm:flex items-center gap-1">
              <Link href="/admin" className="btn-ghost text-sm">
                Dashboard
              </Link>
              <Link href="/admin/new" className="btn-ghost text-sm">
                New project
              </Link>
              <Link href="/" className="btn-ghost text-sm" target="_blank">
                View site ↗
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-muted text-xs hidden sm:block truncate max-w-40">
              {user?.email}
            </span>
            <SignOutButton />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-6 py-10">{children}</div>
      </main>
    </div>
  );
}
