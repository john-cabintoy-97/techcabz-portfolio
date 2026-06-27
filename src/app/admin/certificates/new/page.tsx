import Link from 'next/link';
import { CertificateForm } from '@/components/admin/CertificateForm';
import { createCertificate } from '@/lib/actions';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'New Certificate',
};

export default function NewCertificatePage() {
  return (
    <div>
      <div className="mb-8">
        <Link href="/admin" className="inline-flex items-center gap-2 text-muted hover:text-foreground text-sm transition-colors mb-4">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to dashboard
        </Link>
        <h1 className="font-display text-2xl font-bold text-foreground">New certificate</h1>
        <p className="text-muted text-sm mt-1">Add a professional credential to your portfolio.</p>
      </div>

      <div className="max-w-2xl">
        <div className="bg-surface border border-border rounded-xl p-8">
          <CertificateForm action={createCertificate} submitLabel="Create certificate" />
        </div>
      </div>
    </div>
  );
}
