'use client';

import { motion, Variants } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Experience, Project } from '@/types/database';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

interface AboutContentProps {
  experiences: Experience[];
  projects: Project[];
  stats: { value: string; label: string }[];
}

export function AboutContent({ experiences, projects, stats }: AboutContentProps) {
  const featuredCount = projects.filter((p) => p.featured).length;

  return (
    <motion.section
      id="about"
      className="py-24 border-t border-border"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeInUp}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="section-label mb-4 text-[#F97316]">About me</p>
            <h2 className="font-display text-4xl font-bold text-foreground mb-6">
              Building digital solutions <br />
              <span className="text-[#F97316]">from the database up.</span>
            </h2>

            <div className="space-y-6 text-muted leading-relaxed">
              <p>
                I&apos;m <strong>John Rey L. Cabintoy</strong>, a Full-Stack Web and Mobile Developer
                based in Agusan del Norte, Philippines. I bridge the gap between complex backend logic
                and intuitive user interfaces.
              </p>
              <p>
                My core focus is on delivering responsive web applications using{' '}
                <strong>PHP/Laravel, React, Vue.js, and Next.js</strong>, while seamlessly extending
                those solutions into unified cross-platform mobile environments (iOS, Android, and
                Windows).
              </p>
              <div className="p-4 border-l-4 border-[#F97316] bg-surface rounded-r-lg">
                <p className="italic text-foreground">
                  &ldquo;I am committed to accelerating delivery timelines and turning complex workflows
                  into seamless, user-centric products through API integration and AI-assisted
                  workflows.&rdquo;
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="p-6 rounded-xl bg-surface border border-border hover:border-[#F97316]/40 transition-colors"
              >
                <p className="font-display text-4xl font-bold text-[#F97316] mb-1">{stat.value}</p>
                <p className="text-muted text-sm uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {experiences.length > 0 && (
          <div id="experience" className="mt-20">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="section-label mb-4 text-[#F97316]">Career</p>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                  Experience
                </h3>
              </div>
              {projects.length > 0 && (
                <p className="text-muted text-sm hidden sm:block">
                  {projects.length} project{projects.length !== 1 ? 's' : ''} shipped
                  {featuredCount > 0 ? ` · ${featuredCount} featured` : ''}
                </p>
              )}
            </div>

            <div className="space-y-10">
              {experiences.map((job) => (
                <div
                  key={job.id}
                  className="relative pl-8 border-l-2 border-[#F97316]/30"
                >
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#F97316]" />

                  <div className="mb-2">
                    <h4 className="text-lg font-bold text-foreground">{job.role}</h4>
                    <p className="text-[#F97316] font-medium">{job.company}</p>
                    <p className="text-sm text-muted">
                      {job.location ? `${job.location} • ` : ''}
                      {job.start_date}
                      {job.is_current ? ' — Present' : job.end_date ? ` — ${job.end_date}` : ''}
                    </p>
                  </div>

                  <div className="prose-portfolio text-sm mb-4">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{job.description}</ReactMarkdown>
                  </div>

                  {job.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {job.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full bg-surface text-xs font-mono border border-border"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.section>
  );
}
