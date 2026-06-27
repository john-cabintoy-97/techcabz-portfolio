import Link from 'next/link';
import { ProjectForm } from '@/components/admin/ProjectForm';
import { createProject } from '@/lib/actions';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'New Project',
};

export default function NewProjectPage() {
  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-muted hover:text-foreground text-sm transition-colors mb-4"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to dashboard
        </Link>
        <h1 className="font-display text-2xl font-bold text-foreground">
          New project
        </h1>
        <p className="text-muted text-sm mt-1">
          Add a new project to your portfolio.
        </p>
      </div>

      <div className="max-w-2xl">
        <div className="bg-surface border border-border rounded-xl p-8">
          <ProjectForm action={createProject} submitLabel="Create project" />
        </div>
      </div>
    </div>
  );
}
