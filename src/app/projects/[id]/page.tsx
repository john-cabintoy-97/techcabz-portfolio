import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Metadata } from "next";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { getProject, getProjects } from "@/lib/actions";
import { BackgroundParticles } from "@/components/public/BackgroundParticles";

interface Props {
  params: Promise<{ id: string }>;
}
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = await getProject(id);
  if (!project) return { title: "Project Not Found" };
  return {
    title: project.title,
    description: project.description,
  };
}

// export async function generateStaticParams() {
//   const projects = await getProjects();
//   return (projects ?? []).map((p) => ({ id: p.id }));
// }

export default async function ProjectPage({ params }: Props) {
  const { id } = await params;
  const project = await getProject(id);
  if (!project) notFound();

  return (
    <>
      <Navbar />
      <div className="absolute inset-0 z-0">
        <BackgroundParticles />
      </div>
      <main className="pt-16 relative z-10">
        {/* Hero */}
        {project.image_url && (
          <div className="relative h-64 sm:h-80 lg:h-96 bg-surface overflow-hidden">
            <Image
              src={project.image_url}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-base via-base/20 to-transparent" />
          </div>
        )}

        <div className="max-w-3xl mx-auto px-6 py-12">
          {/* Back */}
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-muted hover:text-accent text-sm transition-colors mb-8"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to projects
          </Link>

          {/* Header */}
          <header className="mb-10">
            {project.featured && (
              <span className="tag mb-4 inline-block">Featured</span>
            )}
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {project.title}
            </h1>
            <p className="text-muted text-lg leading-relaxed">
              {project.description}
            </p>

            {/* Tags */}
            {project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Links */}
            <div className="flex gap-3 mt-6">
              {project.project_url && (
                <a
                  href={project.project_url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  Live demo
                </a>
              )}
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Source code
                </a>
              )}
            </div>
          </header>

          {/* Divider */}
          <hr className="border-border mb-10" />

          {/* Content */}
          {project.content ? (
            <article className="prose-portfolio">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {project.content}
              </ReactMarkdown>
            </article>
          ) : (
            <p className="text-muted italic">No case study content yet.</p>
          )}

          {/* Footer CTA */}
          <div className="mt-16 p-8 rounded-xl bg-surface border border-border text-center">
            <p className="text-foreground font-display font-semibold mb-2">
              Interested in working together?
            </p>
            <p className="text-muted text-sm mb-4">
              I&apos;m always open to discussing new projects and opportunities.
            </p>
            <a
              href="mailto:johnreycabintoylapis@gmail.com"
              className="btn-primary"
            >
              Get in touch
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
