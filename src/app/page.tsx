import { Suspense } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { ProjectGridSkeleton } from "@/components/ui/Skeletons";
import { About } from "@/app/pages/About";
import { Hero } from "@/app/pages/Hero";
import { ProjectsGrid } from "@/app/pages/Projects";
import { SkillsTools } from "@/app/pages/Skills";
import { Contact } from "@/app/pages/Contact";
import { Certificates } from "@/app/pages/Certificates";

// ─── Page ────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div className="relative z-10">
          <Suspense fallback={<ProjectGridSkeleton />}>
            <About />
          </Suspense>
        </div>
        {/* Projects Section */}
        <section
          id="projects"
          className="relative z-10 py-24 border-t border-border"
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="section-label mb-4">Selected work</p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
                  Recent projects
                </h2>
              </div>
            </div>
            <Suspense fallback={<ProjectGridSkeleton />}>
              <ProjectsGrid />
            </Suspense>
          </div>
        </section>

        <div className="relative z-10">
          <SkillsTools />
          <Suspense fallback={null}>
            <Certificates />
          </Suspense>
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  );
}
