export default function Loading() {
  return (
    <div className="pt-16">
      <div className="h-80 skeleton" />
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="h-4 skeleton rounded w-32 mb-8" />
        <div className="h-10 skeleton rounded w-3/4 mb-4" />
        <div className="h-5 skeleton rounded w-full mb-2" />
        <div className="h-5 skeleton rounded w-5/6 mb-6" />
        <div className="flex gap-2 mb-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-6 skeleton rounded w-20" />
          ))}
        </div>
        <div className="flex gap-3 mb-10">
          <div className="h-10 skeleton rounded w-28" />
          <div className="h-10 skeleton rounded w-32" />
        </div>
        <hr className="border-border mb-10" />
        <div className="space-y-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className={`h-4 skeleton rounded ${i % 4 === 0 ? 'w-2/3' : 'w-full'}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
