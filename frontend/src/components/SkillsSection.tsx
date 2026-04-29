import SectionReveal from "./SectionReveal";
import SectionHeader from "./SectionHeader";
import SkillsLineField from "./SkillsLineField";

interface Skill {
  name: string;
  use: string;
}

interface Category {
  title: string;
  skills: Skill[];
}

const categories: Category[] = [
  {
    title: "Programming",
    skills: [
      { name: "TypeScript", use: "Building robust web applications and safer frontends" },
      { name: "Python", use: "Automation, data processing, and backend services" },
      { name: "JavaScript", use: "Interactive UI behavior and client-side logic" },
    ],
  },
  {
    title: "Data and Analytics",
    skills: [
      { name: "SQL", use: "Querying and structuring relational data for real applications" },
      { name: "Data Modeling", use: "Designing schemas that keep metrics consistent and traceable" },
      { name: "ETL & Pipelines", use: "Reliable data movement and transformation for production systems" },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "MySQL", use: "Reliable OLTP schemas and consistent relational storage" },
      { name: "Postgres", use: "Feature-rich relational workloads and migrations" },
      { name: "Caching & Indexing", use: "Keep read performance predictable under load" },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Git", use: "Source control and lightweight collaboration workflows" },
      { name: "Docker", use: "Containerized development and reproducible environments" },
      { name: "CI / CD", use: "Automated builds and deployments for stable releases" },
    ],
  },
  {
    title: "Systems Thinking",
    skills: [
      { name: "System Design", use: "Designing components that scale and remain maintainable" },
      { name: "Authentication & Authorization", use: "Secure user flows and permission boundaries" },
      { name: "Reliability", use: "Design choices that keep systems predictable under real use" },
    ],
  },
];

export default function SkillsSection() {
  return (
    <section id="stacks" className="relative py-24 sm:py-32 depth-2">
      <SkillsLineField />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
        <SectionReveal>
          <SectionHeader
            label="Skills"
            title="Practical categories and short descriptions"
          />
        </SectionReveal>

        <div className="grid gap-6 md:grid-cols-2">
          {categories.map((cat) => (
            <SectionReveal key={cat.title}>
              <div className="glass-surface rounded-2xl p-6 h-full transition-colors duration-200 hover:border-primary/20 hover-premium-card">
                <div className="mb-5">
                  <h3 className="text-base font-semibold text-foreground">{cat.title}</h3>
                </div>
                <div className="space-y-3">
                  {cat.skills.map((skill) => (
                    <div key={skill.name} className="rounded-lg border border-border/60 bg-background/50 p-3">
                      <div className="text-sm font-medium text-foreground">{skill.name}</div>
                      <div className="mt-1 text-xs text-muted-foreground">{skill.use}</div>
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
