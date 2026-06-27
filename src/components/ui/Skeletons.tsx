export function ProjectCardSkeleton() {
  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden">
      <div className="aspect-video skeleton" />
      <div className="p-6 space-y-3">
        <div className="h-5 skeleton rounded-md w-3/4" />
        <div className="space-y-2">
          <div className="h-3.5 skeleton rounded-md w-full" />
          <div className="h-3.5 skeleton rounded-md w-5/6" />
        </div>
        <div className="flex gap-2 pt-1">
          <div className="h-6 skeleton rounded-md w-16" />
          <div className="h-6 skeleton rounded-md w-20" />
          <div className="h-6 skeleton rounded-md w-14" />
        </div>
      </div>
    </div>
  );
}

export function ProjectGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProjectCardSkeleton key={i} />
      ))}
    </div>
  );
}
