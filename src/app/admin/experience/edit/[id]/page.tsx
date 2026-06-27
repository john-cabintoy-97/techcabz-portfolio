import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ExperienceForm } from '@/components/admin/ExperienceForm';
import { getExperience, updateExperience } from '@/lib/actions';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const experience = await getExperience(id);
  return { title: experience ? `Edit: ${experience.role}` : 'Edit Experience' };
}

export default async function EditExperiencePage({ params }: Props) {
  const { id } = await params;
  const experience = await getExperience(id);

  if (!experience) notFound();

  const updateExperienceWithId = updateExperience.bind(null, id);

  return (
    <div>
      <div className="mb-8">
        <Link href="/admin" className="inline-flex items-center gap-2 text-muted hover:text-foreground text-sm transition-colors mb-4">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to dashboard
        </Link>
        <h1 className="font-display text-2xl font-bold text-foreground">Edit experience</h1>
        <p className="text-muted text-sm mt-1">Updating {experience.role} at {experience.company}.</p>
      </div>

      <div className="max-w-2xl">
        <div className="bg-surface border border-border rounded-xl p-8">
          <ExperienceForm experience={experience} action={updateExperienceWithId} submitLabel="Save changes" />
        </div>
      </div>
    </div>
  );
}
