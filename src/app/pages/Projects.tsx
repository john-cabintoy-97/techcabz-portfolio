import { ProjectCard } from "@/components/public/ProjectCard";
import { getProjects } from "@/lib/actions";


// ─── Projects Grid ───────────────────────────────────────────
export async function ProjectsGrid() {
  const projects = await getProjects();

  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-muted text-lg">No projects yet. Check back soon.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
