import Link from 'next/link';
import { getProjects, getExperiences, getCertificates } from '@/lib/actions';
import { DeleteButton } from '@/components/admin/DeleteButton';
import { DeleteEntityButton } from '@/components/admin/DeleteEntityButton';
import { deleteExperience, deleteCertificate } from '@/lib/actions';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
};

export default async function AdminPage() {
  const [projects, experiences, certificates] = await Promise.all([
    getProjects(),
    getExperiences(),
    getCertificates(),
  ]);

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Dashboard
          </h1>
          <p className="text-muted text-sm mt-1">
            Manage your portfolio content from one place.
          </p>
        </div>
      </div>

      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">Projects</h2>
            <p className="text-muted text-sm mt-1">{projects?.length ?? 0} total projects</p>
          </div>
          <Link href="/admin/new" className="btn-primary">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New project
          </Link>
        </div>

      {/* Table */}
      {!projects || projects.length === 0 ? (
        <div className="text-center py-20 border border-border rounded-xl border-dashed">
          <div className="text-4xl mb-4">🗂️</div>
          <p className="text-foreground font-display font-medium mb-2">
            No projects yet
          </p>
          <p className="text-muted text-sm mb-6">
            Create your first project to get started.
          </p>
          <Link href="/admin/new" className="btn-primary">
            Create project
          </Link>
        </div>
      ) : (
        <div className="border border-border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-surface/50">
                <th className="text-left px-6 py-4 text-xs font-display font-semibold text-muted uppercase tracking-wider">
                  Project
                </th>
                <th className="text-left px-6 py-4 text-xs font-display font-semibold text-muted uppercase tracking-wider hidden md:table-cell">
                  Tags
                </th>
                <th className="text-left px-6 py-4 text-xs font-display font-semibold text-muted uppercase tracking-wider hidden sm:table-cell">
                  Status
                </th>
                <th className="text-left px-6 py-4 text-xs font-display font-semibold text-muted uppercase tracking-wider hidden lg:table-cell">
                  Created
                </th>
                <th className="text-right px-6 py-4 text-xs font-display font-semibold text-muted uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {projects.map((project) => (
                <tr
                  key={project.id}
                  className="hover:bg-surface/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-display font-medium text-foreground text-sm">
                        {project.title}
                      </p>
                      <p className="text-muted text-xs mt-0.5 line-clamp-1 max-w-xs">
                        {project.description}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="tag text-xs">
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="tag text-xs">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    {project.featured ? (
                      <span className="inline-flex items-center gap-1 text-xs font-display font-medium text-accent">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        Featured
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-display text-muted">
                        <span className="w-1.5 h-1.5 rounded-full bg-muted-2" />
                        Standard
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <time
                      dateTime={project.created_at}
                      className="text-muted text-xs"
                    >
                      {new Date(project.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </time>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/projects/${project.id}`}
                        target="_blank"
                        className="btn-ghost text-xs px-3 py-1.5"
                      >
                        View
                      </Link>
                      <Link
                        href={`/admin/edit/${project.id}`}
                        className="btn-secondary text-xs px-3 py-1.5"
                      >
                        Edit
                      </Link>
                      <DeleteButton
                        projectId={project.id}
                        projectTitle={project.title}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">Experience</h2>
            <p className="text-muted text-sm mt-1">{experiences?.length ?? 0} roles published</p>
          </div>
          <Link href="/admin/experience/new" className="btn-primary">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New experience
          </Link>
        </div>

        {!experiences || experiences.length === 0 ? (
          <div className="text-center py-16 border border-border rounded-xl border-dashed">
            <p className="text-foreground font-display font-medium mb-2">No experience entries yet</p>
            <p className="text-muted text-sm mb-6">Add your career timeline here.</p>
            <Link href="/admin/experience/new" className="btn-primary">Create experience</Link>
          </div>
        ) : (
          <div className="border border-border rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-surface/50">
                  <th className="text-left px-6 py-4 text-xs font-display font-semibold text-muted uppercase tracking-wider">Role</th>
                  <th className="text-left px-6 py-4 text-xs font-display font-semibold text-muted uppercase tracking-wider hidden md:table-cell">Company</th>
                  <th className="text-right px-6 py-4 text-xs font-display font-semibold text-muted uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {experiences.map((experience) => (
                  <tr key={experience.id} className="hover:bg-surface/30 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-display font-medium text-foreground text-sm">{experience.role}</p>
                      <p className="text-muted text-xs mt-0.5">{experience.start_date} {experience.is_current ? '— Present' : experience.end_date ? `— ${experience.end_date}` : ''}</p>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell text-sm text-muted">{experience.company}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/experience/edit/${experience.id}`} className="btn-secondary text-xs px-3 py-1.5">Edit</Link>
                        <DeleteEntityButton id={experience.id} label={experience.role} deleteAction={deleteExperience} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">Certificates</h2>
            <p className="text-muted text-sm mt-1">{certificates?.length ?? 0} credentials listed</p>
          </div>
          <Link href="/admin/certificates/new" className="btn-primary">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New certificate
          </Link>
        </div>

        {!certificates || certificates.length === 0 ? (
          <div className="text-center py-16 border border-border rounded-xl border-dashed">
            <p className="text-foreground font-display font-medium mb-2">No certificates yet</p>
            <p className="text-muted text-sm mb-6">Add achievements and credentials here.</p>
            <Link href="/admin/certificates/new" className="btn-primary">Create certificate</Link>
          </div>
        ) : (
          <div className="border border-border rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-surface/50">
                  <th className="text-left px-6 py-4 text-xs font-display font-semibold text-muted uppercase tracking-wider">Certificate</th>
                  <th className="text-left px-6 py-4 text-xs font-display font-semibold text-muted uppercase tracking-wider hidden md:table-cell">Issuer</th>
                  <th className="text-right px-6 py-4 text-xs font-display font-semibold text-muted uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {certificates.map((certificate) => (
                  <tr key={certificate.id} className="hover:bg-surface/30 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-display font-medium text-foreground text-sm">{certificate.title}</p>
                      <p className="text-muted text-xs mt-0.5">Issued {certificate.issue_date}</p>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell text-sm text-muted">{certificate.issuer}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/certificates/edit/${certificate.id}`} className="btn-secondary text-xs px-3 py-1.5">Edit</Link>
                        <DeleteEntityButton id={certificate.id} label={certificate.title} deleteAction={deleteCertificate} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
