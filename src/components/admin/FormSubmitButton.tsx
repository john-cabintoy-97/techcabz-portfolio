'use client';

import { useFormStatus } from 'react-dom';

interface FormSubmitButtonProps {
  label: string;
}

export function FormSubmitButton({ label }: FormSubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className="btn-primary">
      {pending ? 'Saving...' : label}
    </button>
  );
}
