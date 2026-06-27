'use client';

import { useFormState } from 'react-dom';
import { FormSubmitButton } from '@/components/admin/FormSubmitButton';
import type { Certificate } from '@/types/database';

interface CertificateFormProps {
  certificate?: Certificate;
  action: (
    prevState: { error?: string } | null,
    formData: FormData
  ) => Promise<{ error?: string }>;
  submitLabel: string;
}

export function CertificateForm({ certificate, action, submitLabel }: CertificateFormProps) {
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
          <label htmlFor="title" className="label">
            Title <span className="text-red-400">*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            defaultValue={certificate?.title ?? ''}
            placeholder="Google SEO Certification"
            className="input"
          />
        </div>

        <div>
          <label htmlFor="issuer" className="label">
            Issuer <span className="text-red-400">*</span>
          </label>
          <input
            id="issuer"
            name="issuer"
            type="text"
            required
            defaultValue={certificate?.issuer ?? ''}
            placeholder="Google"
            className="input"
          />
        </div>
      </div>

      <div>
        <label htmlFor="issue_date" className="label">
          Issue date <span className="text-red-400">*</span>
        </label>
        <input
          id="issue_date"
          name="issue_date"
          type="month"
          required
          defaultValue={certificate?.issue_date ?? ''}
          className="input"
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <label htmlFor="credential_url" className="label">
            Credential URL
          </label>
          <input
            id="credential_url"
            name="credential_url"
            type="url"
            defaultValue={certificate?.credential_url ?? ''}
            placeholder="https://..."
            className="input"
          />
        </div>

        <div>
          <label htmlFor="image_url" className="label">
            Image URL
          </label>
          <input
            id="image_url"
            name="image_url"
            type="url"
            defaultValue={certificate?.image_url ?? ''}
            placeholder="https://..."
            className="input"
          />
        </div>
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
