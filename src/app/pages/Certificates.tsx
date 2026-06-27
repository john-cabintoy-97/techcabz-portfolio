import Image from 'next/image';
import { getCertificates } from '@/lib/actions';

export async function Certificates() {
  const certificates = await getCertificates();

  if (!certificates || certificates.length === 0) {
    return null;
  }

  const marqueeItems = [...certificates, ...certificates];

  return (
    <section id="certificates" className="py-16 border-t border-border overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-8">
        <p className="section-label mb-4">Credentials</p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
          Certificates
        </h2>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="flex w-max gap-8 animate-marquee hover:[animation-play-state:paused]">
          {marqueeItems.map((cert, index) => {
            const cardContent = (
              <>
                <Image
                  src={
                    cert.image_url ??
                    'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=800&q=80'
                  }
                  alt={cert.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                  <span className="text-white text-sm font-bold text-center px-2">
                    {cert.credential_url ? 'View Credential' : cert.title}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-slate-950/70 px-3 py-2">
                  <p className="text-white text-sm font-semibold line-clamp-2">{cert.title}</p>
                  <p className="text-slate-300 text-xs">{cert.issuer}</p>
                </div>
              </>
            );

            const containerClass =
              'relative w-64 h-40 flex-shrink-0 rounded-xl overflow-hidden border border-border shadow-lg transition-transform hover:scale-105';

            return cert.credential_url ? (
              <a
                key={`${cert.id}-${index}`}
                href={cert.credential_url}
                target="_blank"
                rel="noreferrer"
                className={containerClass}
              >
                {cardContent}
              </a>
            ) : (
              <div key={`${cert.id}-${index}`} className={containerClass}>
                {cardContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
