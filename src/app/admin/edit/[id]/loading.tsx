export default function Loading() {
  return (
    <div>
      <div className="mb-8">
        <div className="h-4 skeleton rounded w-36 mb-4" />
        <div className="h-7 skeleton rounded w-48 mb-2" />
        <div className="h-4 skeleton rounded w-56" />
      </div>
      <div className="max-w-2xl">
        <div className="bg-surface border border-border rounded-xl p-8 space-y-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 skeleton rounded w-24" />
              <div className={`skeleton rounded ${i === 2 ? 'h-20' : i === 3 ? 'h-48' : 'h-10'}`} />
            </div>
          ))}
          <div className="flex gap-3 pt-2">
            <div className="h-10 skeleton rounded w-32" />
            <div className="h-10 skeleton rounded w-24" />
          </div>
        </div>
      </div>
    </div>
  );
}
