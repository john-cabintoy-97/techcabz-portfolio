'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useRef } from 'react';
import type { Project } from '@/types/database';

interface ProjectFormProps {
  project?: Project;
  action: (
    prevState: { error?: string } | null,
    formData: FormData
  ) => Promise<{ error?: string }>;
  submitLabel: string;
}

export function ProjectForm({ project, action, submitLabel }: ProjectFormProps) {
  const [state, formAction] = useFormState(action, null);
  const { pending } = useFormStatus();
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form ref={formRef} action={formAction} className="space-y-6">
      {state?.error && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {state.error}
        </div>
      )}

      {/* Title */}
      <div>
        <label htmlFor="title" className="label">
          Title <span className="text-red-400">*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={project?.title}
          placeholder="My Awesome Project"
          className="input"
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="label">
          Short Description <span className="text-red-400">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={3}
          defaultValue={project?.description}
          placeholder="A concise summary shown on project cards..."
          className="input resize-none"
        />
      </div>

      {/* Content */}
      <div>
        <label htmlFor="content" className="label">
          Case Study Content{' '}
          <span className="text-muted-2 font-normal">(Markdown supported)</span>
        </label>
        <textarea
          id="content"
          name="content"
          rows={12}
          defaultValue={project?.content ?? ''}
          placeholder="## Overview&#10;&#10;Describe the project in depth..."
          className="input resize-y font-mono text-xs leading-relaxed"
        />
      </div>

      {/* URLs Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="image_url" className="label">
            Image URL
          </label>
          <input
            id="image_url"
            name="image_url"
            type="url"
            defaultValue={project?.image_url ?? ''}
            placeholder="https://..."
            className="input"
          />
        </div>
        <div>
          <label htmlFor="project_url" className="label">
            Live URL
          </label>
          <input
            id="project_url"
            name="project_url"
            type="url"
            defaultValue={project?.project_url ?? ''}
            placeholder="https://..."
            className="input"
          />
        </div>
        <div>
          <label htmlFor="github_url" className="label">
            GitHub URL
          </label>
          <input
            id="github_url"
            name="github_url"
            type="url"
            defaultValue={project?.github_url ?? ''}
            placeholder="https://github.com/..."
            className="input"
          />
        </div>
        <div>
          <label htmlFor="tags" className="label">
            Tags{' '}
            <span className="text-muted-2 font-normal">(comma-separated)</span>
          </label>
          <input
            id="tags"
            name="tags"
            type="text"
            defaultValue={project?.tags?.join(', ') ?? ''}
            placeholder="Next.js, TypeScript, Supabase"
            className="input"
          />
        </div>
      </div>

      {/* Featured */}
      <div className="flex items-center gap-3 p-4 rounded-lg bg-surface border border-border">
        <input
          id="featured"
          name="featured"
          type="checkbox"
          defaultChecked={project?.featured ?? false}
          className="w-4 h-4 rounded border-border bg-surface-2 text-accent focus:ring-accent focus:ring-offset-0"
        />
        <label htmlFor="featured" className="text-sm text-foreground cursor-pointer select-none">
          <span className="font-display font-medium">Featured project</span>
          <span className="text-muted block text-xs mt-0.5">
            Featured projects are highlighted at the top of your portfolio
          </span>
        </label>
      </div>

      {/* Submit */}
      <div className="flex items-center gap-3 pt-2">
        <button type="submit" disabled={pending} className="btn-primary">
          {pending ? (
            <>
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Saving...
            </>
          ) : (
            submitLabel
          )}
        </button>
        <a href="/admin" className="btn-secondary">
          Cancel
        </a>
      </div>
    </form>
  );
}
