import { useState } from "react";
import { motion } from "framer-motion";
import { Database, Code2, Layout, Lightbulb, BarChart3, FileSpreadsheet, GitBranch, Globe, Smartphone, BrainCircuit, PieChart, Table2, Search, Shield, Settings, Users, Layers, Terminal, Palette, Workflow } from "lucide-react";
import SectionReveal from "./SectionReveal";
import SectionHeader from "./SectionHeader";
import SkillsLineField from "./SkillsLineField";

interface Skill {
  name: string;
  level: number;
  use: string;
  usedIn: string;
  icon: React.ElementType;
}

interface Category {
  title: string;
  icon: React.ElementType;
  skills: Skill[];
}

const categories: Category[] = [
  {
    title: "Core Data Skills",
    icon: Database,
    skills: [
      { name: "SQL querying and data preparation", level: 4, use: "Write joins, aggregations, and filters to answer analytics questions.", usedIn: "TRAGOS, The Vault", icon: Database },
      { name: "Python for data analysis", level: 4, use: "Analyze datasets and prototype reusable notebook workflows.", usedIn: "The Vault, Academic analytics coursework", icon: Terminal },
      { name: "Data cleaning and preprocessing", level: 4, use: "Clean noisy data, standardize fields, and prepare reliable inputs.", usedIn: "The Vault, Academic analytics coursework", icon: Settings },
      { name: "Exploratory data analysis", level: 4, use: "Discover trends, outliers, and KPI drivers before reporting.", usedIn: "The Vault, Academic analytics coursework", icon: Search },
      { name: "Basic statistical analysis", level: 3, use: "Use baseline statistics to compare performance and patterns.", usedIn: "The Vault, Academic analytics coursework", icon: BarChart3 },
      { name: "Data visualization (Matplotlib / Seaborn)", level: 4, use: "Turn analysis results into clear charts for decision making.", usedIn: "The Vault, Academic analytics coursework", icon: PieChart },
      { name: "Dashboard creation and KPI reporting", level: 4, use: "Build KPI dashboards with drilldowns for quick visibility.", usedIn: "The Vault, Academic analytics coursework", icon: Layout },
      { name: "Working with structured datasets", level: 4, use: "Model structured tables so metrics remain consistent and traceable.", usedIn: "TRAGOS, The Vault", icon: Table2 },
    ],
  },
  {
    title: "Technical Stack",
    icon: Code2,
    skills: [
      { name: "Python", level: 4, use: "Automate analysis tasks and create repeatable data workflows.", usedIn: "The Vault, Academic analytics coursework", icon: Terminal },
      { name: "SQL", level: 4, use: "Extract and transform metrics from relational databases.", usedIn: "TRAGOS, The Vault", icon: Database },
      { name: "Excel", level: 4, use: "Run quick checks, ad hoc analysis, and reporting templates.", usedIn: "The Vault, Academic analytics coursework", icon: FileSpreadsheet },
      { name: "Power BI", level: 4, use: "Design interactive dashboards for non-technical stakeholders.", usedIn: "The Vault, Academic analytics coursework", icon: BarChart3 },
      { name: "Jupyter Notebook", level: 4, use: "Iterate on data analysis and visual experiments in notebooks.", usedIn: "The Vault, Academic analytics coursework", icon: Code2 },
      { name: "Git (basic version control)", level: 3, use: "Track changes safely across feature branches and iterations.", usedIn: "Portfolio, TRAGOS", icon: GitBranch },
    ],
  },
  {
    title: "Supporting Development Skills",
    icon: Globe,
    skills: [
      { name: "PHP", level: 3, use: "Implement application logic, endpoints, and session-based features.", usedIn: "TRAGOS", icon: Code2 },
      { name: "MySQL", level: 3, use: "Define relational schemas and query application data reliably.", usedIn: "TRAGOS", icon: Database },
      { name: "JavaScript", level: 3, use: "Build interactive UI behavior and client-side application logic.", usedIn: "TRAGOS, Portfolio", icon: Code2 },
      { name: "HTML", level: 3, use: "Structure accessible page layouts and semantic content blocks.", usedIn: "TRAGOS, Portfolio", icon: Globe },
      { name: "CSS", level: 3, use: "Style responsive interfaces and tune visual polish.", usedIn: "TRAGOS, Portfolio", icon: Palette },
      { name: "Authentication systems", level: 3, use: "Handle sign in, authorization checks, and protected routes.", usedIn: "TRAGOS", icon: Shield },
      { name: "CRUD operations", level: 4, use: "Create, update, and manage records across app modules.", usedIn: "TRAGOS", icon: Layers },
      { name: "Search and filtering systems", level: 3, use: "Help users quickly discover relevant results with filters.", usedIn: "TRAGOS", icon: Search },
      { name: "Basic system design", level: 3, use: "Plan component boundaries, data flow, and service structure.", usedIn: "TRAGOS, The Vault", icon: Workflow },
      { name: "Basic app development", level: 3, use: "Ship core features from setup through release-ready flows.", usedIn: "TRAGOS, Portfolio", icon: Smartphone },
    ],
  },
  {
    title: "Product & Workflow Thinking",
    icon: Lightbulb,
    skills: [
      { name: "Building end to end applications", level: 4, use: "Build complete products from data model to user interface.", usedIn: "TRAGOS, Portfolio", icon: Layers },
      { name: "Designing user flows", level: 3, use: "Design clear user journeys that reduce friction.", usedIn: "TRAGOS, Muslim Prayer App", icon: Workflow },
      { name: "Feature planning", level: 3, use: "Break ideas into milestones and scope practical releases.", usedIn: "The Vault, Muslim Prayer App", icon: BrainCircuit },
      { name: "Managing multi feature systems", level: 3, use: "Coordinate connected modules like chat, notifications, and requests.", usedIn: "TRAGOS", icon: Settings },
      { name: "Understanding user needs", level: 3, use: "Translate user pain points into useful, focused product decisions.", usedIn: "The Vault, Muslim Prayer App, TRAGOS", icon: Users },
    ],
  },
];

const totalSkills = categories.reduce((acc, cat) => acc + cat.skills.length, 0);

function SkillIndicator({ level }: { level: number }) {
  const color = level >= 4
    ? "bg-emerald-400 shadow-emerald-400/40"
    : level >= 3
    ? "bg-amber-400 shadow-amber-400/40"
    : "bg-red-400 shadow-red-400/40";
  const label = level >= 4 ? "Strong" : level >= 3 ? "Competent" : "Learning";
  return (
    <span
      className={`inline-block h-2.5 w-2.5 rounded-full ${color} shadow-[0_0_6px] shrink-0`}
      title={`${label} (${level}/5)`}
    />
  );
}

export default function SkillsSection() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section id="stacks" className="relative py-24 sm:py-32 depth-2">
      <SkillsLineField />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
        <SectionReveal>
          <SectionHeader
            label="Tech Stacks"
            title="The tools and platforms I know and use in my workflow."
          />
        </SectionReveal>

        {/* Proficiency Legend - Memorable Moment */}
        <SectionReveal>
          <div className="mb-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_6px] shadow-emerald-400/40" /> Strong (4-5)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400 shadow-[0_0_6px] shadow-amber-400/40" /> Competent (3)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400 shadow-[0_0_6px] shadow-red-400/40" /> Learning (1-2)
            </span>
            <span className="text-border">|</span>
            <span className="font-medium text-foreground/60">{totalSkills} skills across {categories.length} disciplines</span>
          </div>
        </SectionReveal>

        <div className="grid gap-6 md:grid-cols-2">
          {categories.map((cat) => (
            <SectionReveal key={cat.title}>
              <div className="group glass-surface rounded-2xl p-6 h-full transition-colors duration-200 hover:border-primary/20 hover-premium-card">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <cat.icon size={20} />
                  </div>
                  <h3 className="text-base font-semibold text-foreground">{cat.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <div key={skill.name} className="relative">
                      <button
                        onMouseEnter={() => setHoveredSkill(skill.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        className="flex items-center gap-2 rounded-lg border border-border/60 bg-background/50 px-3 py-2 text-xs font-medium text-foreground/80 hover:border-primary/30 transition-colors duration-200 hover-premium hover-premium-pill mini-cursor-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <skill.icon size={13} className="text-primary/70 shrink-0" />
                        <span className="text-left leading-snug">{skill.name}</span>
                        <SkillIndicator level={skill.level} />
                      </button>
                      {hoveredSkill === skill.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute bottom-full left-1/2 z-50 mb-2 w-64 -translate-x-1/2 rounded-xl glass-surface border border-border/60 p-3 shadow-xl"
                        >
                          <p className="text-xs font-semibold text-foreground mb-1">{skill.name}</p>
                          <p className="text-[11px] text-muted-foreground"><span className="font-medium text-foreground/70">Use:</span> {skill.use}</p>
                          <p className="text-[11px] text-muted-foreground mt-1"><span className="font-medium text-foreground/70">Used in:</span> {skill.usedIn}</p>
                          <div className="mt-2 flex items-center gap-1.5">
                            <SkillIndicator level={skill.level} />
                            <span className="text-[10px] text-muted-foreground">
                              {skill.level}/5 &mdash; {skill.level >= 4 ? "Strong" : skill.level >= 3 ? "Competent" : "Learning"}
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
