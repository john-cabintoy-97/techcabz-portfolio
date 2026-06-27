'use client';

import { useState, useTransition } from 'react';
import { deleteProject } from '@/lib/actions';

interface DeleteButtonProps {
  projectId: string;
  projectTitle: string;
}

export function DeleteButton({ projectId, projectTitle }: DeleteButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleDelete() {
    startTransition(async () => {
      const result = await deleteProject(projectId);
      if (result.error) {
        setError(result.error);
        setShowConfirm(false);
      }
    });
  }

  if (showConfirm) {
    return (
      <div className="flex items-center gap-2">
        {error && <span className="text-xs text-red-400">{error}</span>}
        <span className="text-xs text-muted">Delete &ldquo;{projectTitle}&rdquo;?</span>
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="text-xs font-display font-medium text-red-400 hover:text-red-300 disabled:opacity-50"
        >
          {isPending ? 'Deleting...' : 'Confirm'}
        </button>
        <button
          onClick={() => setShowConfirm(false)}
          className="text-xs text-muted hover:text-foreground"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="btn-danger text-xs px-3 py-1.5"
    >
      Delete
    </button>
  );
}
