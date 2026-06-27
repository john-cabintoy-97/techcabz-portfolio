import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ProjectForm } from '@/components/admin/ProjectForm';
import { getProject, updateProject } from '@/lib/actions';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = await getProject(id);
  return { title: project ? `Edit: ${project.title}` : 'Edit Project' };
}

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) notFound();

  // Bind the id to the updateProject action
  const updateProjectWithId = updateProject.bind(null, id);

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
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Edit project
            </h1>
            <p className="text-muted text-sm mt-1">
              Updating &ldquo;{project.title}&rdquo;
            </p>
          </div>
          <Link
            href={`/projects/${project.id}`}
            target="_blank"
            className="btn-ghost text-sm"
          >
            View live ↗
          </Link>
        </div>
      </div>

      <div className="max-w-2xl">
        <div className="bg-surface border border-border rounded-xl p-8">
          <ProjectForm
            project={project}
            action={updateProjectWithId}
            submitLabel="Save changes"
          />
        </div>
      </div>
    </div>
  );
}
