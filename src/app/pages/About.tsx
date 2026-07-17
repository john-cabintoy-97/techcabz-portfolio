import { getExperiences, getProjects } from '@/lib/actions';
import type { Experience } from '@/types/database';
import { AboutContent } from '@/app/pages/AboutContent';

function parseMonthDate(dateStr: string): Date {
  const [year, month] = dateStr.split('-').map(Number);
  return new Date(year, (month || 1) - 1);
}

function getYearsOfExperience(experiences: Experience[]): string {
  if (experiences.length === 0) return '0';

  const earliest = Math.min(
    ...experiences.map((entry) => parseMonthDate(entry.start_date).getTime())
  );
  const years = (Date.now() - earliest) / (365.25 * 24 * 60 * 60 * 1000);
  const rounded = Math.max(1, Math.floor(years));

  return `${rounded}+`;
}

function buildStats(experiences: Experience[], projectCount: number) {
  const currentRole = experiences.find((entry) => entry.is_current);

  return [
    { value: '3', label: 'Years Experience' },
    { value: String(projectCount), label: 'Projects Shipped' },
  ];
}

export async function About() {
  const [experiences, projects] = await Promise.all([getExperiences(), getProjects()]);
  const stats = buildStats(experiences, projects.length);

  return (
    <AboutContent experiences={experiences} projects={projects} stats={stats} />
  );
}
