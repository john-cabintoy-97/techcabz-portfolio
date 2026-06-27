export default function Loading() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-2">
          <div className="h-7 skeleton rounded w-32" />
          <div className="h-4 skeleton rounded w-24" />
        </div>
        <div className="h-10 skeleton rounded w-36" />
      </div>

      <div className="border border-border rounded-xl overflow-hidden">
        <div className="bg-surface/50 px-6 py-4 border-b border-border">
          <div className="flex gap-16">
            {['Project', 'Tags', 'Status', 'Created', 'Actions'].map((h) => (
              <div key={h} className="h-3.5 skeleton rounded w-16" />
            ))}
          </div>
        </div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="px-6 py-4 border-b border-border last:border-0">
            <div className="flex items-center justify-between">
              <div className="space-y-1.5">
                <div className="h-4 skeleton rounded w-48" />
                <div className="h-3 skeleton rounded w-72" />
              </div>
              <div className="flex gap-2">
                <div className="h-8 skeleton rounded w-12" />
                <div className="h-8 skeleton rounded w-12" />
                <div className="h-8 skeleton rounded w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
