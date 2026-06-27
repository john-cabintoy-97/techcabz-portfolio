'use client';

import { useFormState } from 'react-dom';
import { FormSubmitButton } from '@/components/admin/FormSubmitButton';
import type { Experience } from '@/types/database';

interface ExperienceFormProps {
  experience?: Experience;
  action: (
    prevState: { error?: string } | null,
    formData: FormData
  ) => Promise<{ error?: string }>;
  submitLabel: string;
}

export function ExperienceForm({ experience, action, submitLabel }: ExperienceFormProps) {
  const [state, formAction] = useFormState(action, null);

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {state.error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="role" className="label">
            Role <span className="text-red-400">*</span>
          </label>
          <input
            id="role"
            name="role"
            type="text"
            required
            defaultValue={experience?.role ?? ''}
            placeholder="Senior Frontend Engineer"
            className="input"
          />
        </div>

        <div>
          <label htmlFor="company" className="label">
            Company <span className="text-red-400">*</span>
          </label>
          <input
            id="company"
            name="company"
            type="text"
            required
            defaultValue={experience?.company ?? ''}
            placeholder="Acme Studio"
            className="input"
          />
        </div>
      </div>

      <div>
        <label htmlFor="location" className="label">
          Location
        </label>
        <input
          id="location"
          name="location"
          type="text"
          defaultValue={experience?.location ?? ''}
          placeholder="Remote / New York, US"
          className="input"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="start_date" className="label">
            Start date <span className="text-red-400">*</span>
          </label>
          <input
            id="start_date"
            name="start_date"
            type="month"
            required
            defaultValue={experience?.start_date ?? ''}
            className="input"
          />
        </div>

        <div>
          <label htmlFor="end_date" className="label">
            End date
          </label>
          <input
            id="end_date"
            name="end_date"
            type="month"
            defaultValue={experience?.end_date ?? ''}
            className="input"
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="label">
          Description{' '}
          <span className="text-muted-2 font-normal">(Markdown supported)</span>
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={8}
          defaultValue={experience?.description ?? ''}
          placeholder="## Highlights\n\n- Built ..."
          className="input resize-y font-mono text-xs leading-relaxed"
        />
      </div>

      <div>
        <label htmlFor="technologies" className="label">
          Technologies{' '}
          <span className="text-muted-2 font-normal">(comma-separated)</span>
        </label>
        <input
          id="technologies"
          name="technologies"
          type="text"
          defaultValue={experience?.technologies?.join(', ') ?? ''}
          placeholder="Next.js, TypeScript, Supabase"
          className="input"
        />
      </div>

      <div className="flex items-center gap-3 p-4 rounded-lg bg-surface border border-border">
        <input
          id="is_current"
          name="is_current"
          type="checkbox"
          defaultChecked={experience?.is_current ?? false}
          className="w-4 h-4 rounded border-border bg-surface-2 text-accent focus:ring-accent focus:ring-offset-0"
        />
        <label htmlFor="is_current" className="text-sm text-foreground cursor-pointer select-none">
          <span className="font-display font-medium">Current position</span>
          <span className="text-muted block text-xs mt-0.5">
            Leave this enabled if you still work here.
          </span>
        </label>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <FormSubmitButton label={submitLabel} />
        <a href="/admin" className="btn-secondary">
          Cancel
        </a>
      </div>
    </form>
  );
}
