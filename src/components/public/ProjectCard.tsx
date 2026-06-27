"use client";
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Project } from '@/types/database';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      layout
      className="card group block h-full overflow-hidden rounded-xl border border-border bg-surface shadow-sm"
    >
      <Link href={`/projects/${project.id}`}>
        <div className="relative aspect-video bg-surface-2 overflow-hidden">
          {project.image_url ? (
            <Image
              src={project.image_url}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 dot-grid-bg opacity-50 flex items-center justify-center">
              <span className="text-4xl font-display font-bold text-border">
                {project.title[0]}
              </span>
            </div>
          )}
          {project.featured && (
            <span className="absolute top-3 right-3 text-xs font-display font-semibold px-2 py-1 rounded-full bg-accent/90 text-white backdrop-blur-sm">
              Featured
            </span>
          )}
        </div>

        <div className="p-6">
          <h3 className="font-display font-semibold text-lg text-foreground mb-2 group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          <p className="text-muted text-sm leading-relaxed mb-4 line-clamp-2">
            {project.description}
          </p>
          {project.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {project.tags.slice(0, 4).map((tag) => (
                <span key={tag} className="tag text-xs bg-surface-2 px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}