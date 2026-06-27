// ─── Hero ────────────────────────────────────────────────────

import { BackgroundParticles } from "@/components/public/BackgroundParticles";
import { CodeSnippet } from "@/components/public/CodeSnippet";
import { TextCycler } from "@/components/public/TextCycler";
import { CONTACT_INFO } from '@/app/constants/contact';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <BackgroundParticles />
      </div>
      <CodeSnippet />
      <div className="absolute inset-0 z-0 dot-grid-bg opacity-10" />
      <div className="absolute inset-0 z-0 bg-gradient-radial from-accent/5 via-transparent to-transparent" />
      <div className="relative max-w-6xl mx-auto px-6 py-20 w-full relative z-10">
        <div className="max-w-4xl">
          <p className="section-label mb-6 animate-fade-in">
            Available for freelance work
          </p>

          <h1
            className="font-display text-5xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-[1.05] tracking-tight mb-6 animate-slide-up"
            style={{ animationDelay: "0.1s", animationFillMode: "both" }}
          >
            <TextCycler />
          </h1>

          <p
            className="text-muted text-lg sm:text-xl leading-relaxed mb-10 max-w-xl animate-slide-up"
            style={{ animationDelay: "0.2s", animationFillMode: "both" }}
          >
            Hi! I'm John Rey L. Cabintoy, a Full-Stack Web and Mobile Developer
            and electronics hobbyist based in Agusan del Norte, Philippines. I
            enjoy building modern web and mobile applications while continuously
            expanding my knowledge through hands-on projects and real-world
            experience
          </p>

          <div
            className="flex flex-wrap gap-4 animate-slide-up"
            style={{ animationDelay: "0.3s", animationFillMode: "both" }}
          >
            {/* Priority 1: Download Resume */}
            <a
              href={CONTACT_INFO.resume} 
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary bg-[#F97316] hover:bg-[#f97316]/90"
            >
              View CV
            </a>

            {/* Priority 2: Direct to Contact Section */}
            <a href="#contact" className="btn-secondary">
              Contact me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
