import Link from 'next/link';
import { ExperienceForm } from '@/components/admin/ExperienceForm';
import { createExperience } from '@/lib/actions';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'New Experience',
};

export default function NewExperiencePage() {
  return (
    <div>
      <div className="mb-8">
        <Link href="/admin" className="inline-flex items-center gap-2 text-muted hover:text-foreground text-sm transition-colors mb-4">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to dashboard
        </Link>
        <h1 className="font-display text-2xl font-bold text-foreground">New experience</h1>
        <p className="text-muted text-sm mt-1">Add a role, company, and description to your career timeline.</p>
      </div>

      <div className="max-w-2xl">
        <div className="bg-surface border border-border rounded-xl p-8">
          <ExperienceForm action={createExperience} submitLabel="Create experience" />
        </div>
      </div>
    </div>
  );
}
