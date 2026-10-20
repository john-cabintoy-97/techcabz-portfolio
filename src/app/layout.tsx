import type { Metadata } from 'next';
import './globals.css';
import PageTransition from '@/components/ui/PageTransition';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { ThemeProvider } from '@/components/themes/theme-provider';
import { AppParticlesProvider } from '@/components/public/AppParticlesProvider';
import { Plus_Jakarta_Sans } from 'next/font/google';

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  display: 'swap', // Prevents text-blocking while font loads
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: 'John Rey Cabintoy — Full-Stack Developer',
    template: '%s | John Rey Cabintoy',
  },
  description:
    'Full-stack developer specializing in React, Next.js, and scalable backend systems. Building products people love.',
  icons: {
    icon: '/favicon.ico',
  },
  // Add other metadata options if needed
  openGraph: {
    title: 'John Rey Cabintoy — Full-Stack Developer',
    description:
      'Full-stack developer specializing in React, Next.js, and scalable backend systems.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jakarta.className} suppressHydrationWarning>
      <head>
        {/* Preconnect to Supabase / Storage CDN to speed up image fetching */}
        <link rel="preconnect" href="https://orkidtghafeoewphmqlb.supabase.co" />
        <link rel="dns-prefetch" href="https://orkidtghafeoewphmqlb.supabase.co" />
      </head>
      <body>
        <AppParticlesProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <CustomCursor />
            <PageTransition>{children}</PageTransition>
          </ThemeProvider>
        </AppParticlesProvider>
      </body>
    </html>
  );
}