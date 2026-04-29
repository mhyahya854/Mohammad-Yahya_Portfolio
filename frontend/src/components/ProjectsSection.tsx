import { useState } from "react";
import { Github, ExternalLink, ArrowUpRight, Lock, Link2 } from "lucide-react";
import SectionReveal from "./SectionReveal";
import SectionHeader from "./SectionHeader";
import ProjectsLineField from "./ProjectsLineField";

interface Project {
  title: string;
  badge: string;
  description: string;
  tags: string[];
  github: string | null;
  deployment: string | null;
  status?: string;
  isSelf?: boolean;
  image?: string;
}

const featuredProject: Project = {
  title: "TRAGOS \u2014 Travel Group Discovery & Coordination Platform",
  badge: "Travel Platform",
  description: "A full stack system for managing group travel coordination.\n\nHandles authentication, group creation, join requests, and filtering within a structured architecture.\n\nDesigned with clear separation between users, groups, and interactions to maintain clean data flow and avoid tight coupling as the system expands.",
  tags: ["PHP", "MySQL", "JavaScript", "HTML", "CSS"],
  github: "https://github.com/mhyahya854/Tragos-Travel-Companion.git",
  deployment: null,
  image: "https://static.prod-images.emergentagent.com/jobs/a4b47073-c05f-42c3-8590-a3fae8cf3b4a/images/3a62ac9934a45bb79beb54a622e0796abb298694de89285d0a3e66345b875d33.png",
};

const otherProjects: Project[] = [
  {
    title: "Muslim Prayer App",
    badge: "Community App",
    description: "A community-focused mobile app concept designed to help users track prayer times, organize related activities, and interact with a more structured spiritual routine.",
    tags: ["Mobile", "Community", "UI/UX"],
    github: "https://github.com/mhyahya854/Prayer-App.git",
    deployment: null,
    status: "In Development",
    image: "https://static.prod-images.emergentagent.com/jobs/a4b47073-c05f-42c3-8590-a3fae8cf3b4a/images/4aa67f8ee02dbe584c1e6b6495d3c1cd4c58d8f5a4e7eaee738332a5be626e5e.png",
  },
  {
    title: "Mohammad Yahya Hussain Portfolio",
    badge: "Personal Brand",
    description: "A personal portfolio built to present my profile, analytical strengths, and project work in a clean, structured, and modern interface. Designed with a strong focus on clarity, hierarchy, and usability.",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/mhyahya854/mohammad-yahya-portfolio",
    deployment: null,
    isSelf: true,
    image: "https://static.prod-images.emergentagent.com/jobs/a4b47073-c05f-42c3-8590-a3fae8cf3b4a/images/1765378a5a95b496af45bda2c7a39382356822985286ab8822877f21daad734f.png",
  },
  {
    title: "Mizaan \u2014 Personal Management System",
    badge: "Personal Management",
    description: "A modular system used to manage notes, tasks, and structured entries in one interface, replacing multiple tools.\n\nSupports linked data across content types, with a shared model for notes, tasks, and entries.\n\nBuilt with a modular architecture so new content types can be added without breaking existing structure.",
    tags: ["Modular", "Notes", "Tasks"],
    github: null,
    deployment: null,
  },
  {
    title: "Stillio \u2014 Productivity Workspace",
    badge: "Productivity Workspace",
    description: "A focused workspace used daily for structured work sessions.\n\nDesigned to reduce context switching and maintain consistent task flow.\n\nBuilt with minimal system surface to keep interactions predictable and distraction-free.",
    tags: ["Productivity", "Focus", "Minimal"],
    github: null,
    deployment: null,
  },
];

function ProjectLinks({ project, onSelfClick }: { project: Project; onSelfClick: () => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {project.github ? (
        <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border/60 px-4 text-xs font-medium text-foreground/80 hover:border-primary/30 hover:text-foreground transition-colors duration-200 hover-premium hover-premium-pill">
          <Github size={14} /> GitHub
        </a>
      ) : (
        <span className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border/30 px-4 text-xs font-medium text-muted-foreground/50 cursor-not-allowed transition-all duration-200 hover-premium-pill" title="GitHub link coming soon">
          <Github size={14} /> GitHub
        </span>
      )}
      {project.isSelf ? (
        <button onClick={onSelfClick} className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border/60 px-4 text-xs font-medium text-foreground/80 hover:border-primary/30 hover:text-foreground transition-colors duration-200 hover-premium hover-premium-pill">
          <ExternalLink size={14} /> Live Site
        </button>
      ) : project.deployment ? (
        <a href={project.deployment} target="_blank" rel="noopener noreferrer" className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border/60 px-4 text-xs font-medium text-foreground/80 hover:border-primary/30 hover:text-foreground transition-colors duration-200 hover-premium hover-premium-pill">
          <ExternalLink size={14} /> Live Site
        </a>
      ) : (
        <span className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border/30 px-4 text-xs font-medium text-muted-foreground/50 cursor-not-allowed transition-all duration-200 hover-premium-pill" title="Deployment link coming soon">
          <Link2 size={14} /> Live Site
        </span>
      )}
      {project.status && (
        <span className="inline-flex h-9 items-center gap-1.5 rounded-full border border-amber-500/25 bg-amber-500/5 px-4 text-xs font-medium text-amber-400/70 transition-all duration-200 hover-premium-pill">
          <Lock size={12} /> {project.status}
        </span>
      )}
    </div>
  );
}

export default function ProjectsSection() {
  const [selfDialogOpen, setSelfDialogOpen] = useState(false);

  return (
    <section id="projects" className="relative py-24 sm:py-32 depth-3">
      <ProjectsLineField />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
        <SectionReveal>
          <SectionHeader label="Projects" title="Projects I Have Made" />
        </SectionReveal>

        {/* Featured Project - Memorable Moment */}
        <SectionReveal>
          <div className="group glass-surface rounded-2xl overflow-hidden mb-6 border-l-4 border-l-primary/40 transition-colors duration-200 hover:border-primary/20 hover:border-l-primary/50 hover-premium-card">
            {featuredProject.image && (
              <div className="relative w-full overflow-hidden bg-background/40">
                <img
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  className="w-full h-56 sm:h-64 object-cover object-top opacity-85 hover:opacity-100 transition-all duration-300 group-hover:brightness-110"
                  loading="lazy"
                  data-testid="featured-project-image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
              </div>
            )}
            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary hover-premium-pill">
                    {featuredProject.badge}
                  </span>
                  <span className="text-[10px] font-mono text-primary/40 uppercase tracking-widest">Featured</span>
                </div>
                <ArrowUpRight size={16} className="text-muted-foreground/30 transition-colors duration-200 group-hover:text-primary/80" />
              </div>
              <h3 className="mb-3 text-lg font-semibold text-foreground leading-snug">{featuredProject.title}</h3>
              <p className="mb-5 text-sm leading-relaxed text-muted-foreground max-w-3xl">{featuredProject.description}</p>
              <div className="mb-4 flex flex-wrap gap-1.5">
                {featuredProject.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-border/40 bg-muted/15 px-2.5 py-1 text-[10px] font-medium text-muted-foreground hover-premium-pill">{tag}</span>
                ))}
              </div>
              <ProjectLinks project={featuredProject} onSelfClick={() => setSelfDialogOpen(true)} />
            </div>
          </div>
        </SectionReveal>

        {/* Other Projects */}
        <div className="grid gap-6 md:grid-cols-3">
          {otherProjects.map((project) => (
            <SectionReveal key={project.title}>
              <div className="group glass-surface rounded-2xl overflow-hidden h-full flex flex-col transition-colors duration-200 hover:border-primary/20 hover-premium-card">
                {project.image ? (
                  <div className="relative w-full overflow-hidden bg-background/40">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-40 object-cover object-top opacity-80 hover:opacity-100 transition-all duration-300 group-hover:brightness-110"
                      loading="lazy"
                      data-testid={`project-image-${project.badge.toLowerCase().replace(/\s+/g, '-')}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
                  </div>
                  ) : (
                  <div className="relative h-40 w-full overflow-hidden bg-gradient-to-br from-primary/8 via-muted/25 to-background/50 transition-all duration-300 group-hover:brightness-110">
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary hover-premium-pill">
                      {project.badge}
                    </span>
                    <ArrowUpRight size={16} className="text-muted-foreground/30 transition-colors duration-200 group-hover:text-primary/80" />
                  </div>
                  <h3 className="mb-3 text-sm font-semibold text-foreground leading-snug">{project.title}</h3>
                  <p className="mb-4 flex-1 text-xs leading-relaxed text-muted-foreground">{project.description}</p>
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-border/40 bg-muted/15 px-2 py-0.5 text-[10px] font-medium text-muted-foreground hover-premium-pill">{tag}</span>
                    ))}
                  </div>
                  <ProjectLinks project={project} onSelfClick={() => setSelfDialogOpen(true)} />
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>

      {selfDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-sm" onClick={() => setSelfDialogOpen(false)}>
          <div className="glass-surface mx-4 max-w-sm rounded-2xl border border-border/60 p-8 text-center glow-md hover-premium-card" onClick={(e) => e.stopPropagation()}>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <ExternalLink size={22} />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-foreground">You're Already Here</h3>
            <p className="mb-6 text-sm text-muted-foreground">This opened portfolio is the deployed website.</p>
            <button onClick={() => setSelfDialogOpen(false)} className="inline-flex h-10 items-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground cta-glow transition-all hover-premium">Got it</button>
          </div>
        </div>
      )}
    </section>
  );
}
