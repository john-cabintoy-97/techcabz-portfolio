"use client";

import { motion } from "framer-motion";
import {
  SiReact, SiDotnet, SiSharp, SiPhp, SiLaravel, SiNodedotjs,
  SiPython, SiNextdotjs, SiVuedotjs, SiJavascript, SiTailwindcss,
  SiBootstrap, SiMysql, SiSqlite, SiPhpmyadmin, SiGit,
} from "react-icons/si";

// --- Data Maps ---
const iconMap = {
  "React Native": SiReact,
  React: SiReact,
  ".NET": SiDotnet,
  "C#": SiSharp,
  PHP: SiPhp,
  Laravel: SiLaravel,
  "Node.js": SiNodedotjs,
  Python: SiPython,
  "Next.js": SiNextdotjs,
  "Vue.js": SiVuedotjs,
  JavaScript: SiJavascript,
  "Tailwind CSS": SiTailwindcss,
  Bootstrap: SiBootstrap,
  MySQL: SiMysql,
  "SQL Server": SiSqlite,
  phpMyAdmin: SiPhpmyadmin,
  Git: SiGit,
} as const;

const colorMap: Record<string, string> = {
  "React Native": "#61DAFB",
  React: "#61DAFB",
  ".NET": "#512BD4",
  "C#": "#512BD4",
  PHP: "#777BB4",
  Laravel: "#FF2D20",
  "Node.js": "#339933",
  Python: "#3776AB",
  "Next.js": "#000000",
  "Vue.js": "#4FC08D",
  JavaScript: "#F7DF1E",
  "Tailwind CSS": "#06B6D4",
  Bootstrap: "#7952B3",
  MySQL: "#4479A1",
  "SQL Server": "#CC2927",
  phpMyAdmin: "#777BB4",
  Git: "#F05032",
};

type SkillName = keyof typeof iconMap;

function SkillIcon({ name }: { name: SkillName }) {
  const Icon = iconMap[name];
  const color = colorMap[name] || "#ffffff";
  return Icon ? <Icon size={16} color={color} /> : null;
}

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// --- Main Component ---
export function SkillsTools() {
  const groups: Array<{
    title: string;
    description: string;
    icon: SkillName;
    skills: SkillName[];
  }> = [
    {
      title: "Frontend",
      description: "Responsive interfaces and polished user experiences.",
      icon: "React",
      skills: ["React", "Next.js", "Tailwind CSS", "JavaScript", "Vue.js", "Bootstrap"],
    },
    {
      title: "Backend & APIs",
      description: "Reliable services, integrations, and scalable app logic.",
      icon: "Node.js",
      skills: ["Node.js", "PHP", "Laravel", ".NET", "C#", "Python"],
    },
    {
      title: "Data & Delivery",
      description: "Databases, version control, and product-ready deployment.",
      icon: "Git",
      skills: ["MySQL", "SQL Server", "Git", "phpMyAdmin"],
    },
  ];

  return (
    <section id="skills" className="py-24 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-12">
          <p className="section-label mb-4">Skills & Tools</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Built for product teams and ambitious ideas
          </h2>
          <p className="text-muted leading-relaxed">
            I work across the full stack with a pragmatic mix of modern frameworks, APIs, and delivery tooling.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {groups.map((group) => (
            <motion.div
              key={group.title}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="rounded-2xl border border-border bg-surface p-6 shadow-sm flex flex-col"
            >
              <div className="mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface-2 text-accent mb-4">
                  <SkillIcon name={group.icon} />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{group.title}</h3>
                <p className="text-sm text-muted mb-4">{group.description}</p>
              </div>

              <div className="flex flex-wrap gap-2 mt-auto">
                {group.skills.map((skill) => (
                  <motion.div
                    key={skill}
                    whileHover={{ scale: 1.05 }}
                    className="group flex items-center gap-2 bg-base border border-border px-3 py-1.5 rounded-full text-xs font-medium text-muted transition-all duration-300 hover:border-accent/40 hover:bg-surface hover:text-foreground cursor-default"
                  >
                    <SkillIcon name={skill} />
                    <span>{skill}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}