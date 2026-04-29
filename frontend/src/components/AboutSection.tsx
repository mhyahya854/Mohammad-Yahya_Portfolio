import SectionReveal from "./SectionReveal";
import SectionHeader from "./SectionHeader";
import AboutLineField from "./AboutLineField";

const cards = [
  {
    title: "Who I Am",
    content: [
      "I'm a Computer Science student at Asia Pacific University, specializing in Data Analytics. What draws me to this field isn't just the numbers\u2014it's the challenge of turning messy information into something clear, useful, and trusted.",
    ],
  },
  {
    title: "What I Do",
    content: [
      "I build full systems that combine structured data, application logic, and real user workflows.",
      "I focus on how data moves through a system, how users interact with it, and how the structure holds up under real use.",
      "Clean data without a working system is incomplete. A system without clear data is unreliable. I build both together.",
    ],
  },
  {
    title: "My Goal",
    content: [
      "My goal is to grow into an engineer who designs systems that scale, stay consistent, and remain usable under real conditions.",
      "I want to work on real products where system decisions matter, not just isolated features.",
    ],
  },
];

const abilities = [
  "Data cleaning and transformation",
  "Dashboard design and KPI reporting",
  "Exploratory analysis and pattern discovery",
  "Insight communication and storytelling",
  "Spreadsheet and BI workflow improvement",
  "Turning business questions into measurable, trackable metrics",
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 sm:py-32 depth-1">
      <AboutLineField />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
        <SectionReveal>
          <SectionHeader
            label="About Me"
            title="Who I am, what I do, what I want, and what I bring."
          />
        </SectionReveal>

        <div className="grid gap-6 md:grid-cols-2">
          {cards.slice(0, 2).map((card, i) => (
            <SectionReveal key={card.title}>
              <div className="glass-surface rounded-2xl p-6 sm:p-8 h-full transition-colors duration-200 hover:border-primary/20 hover-premium-card mini-cursor-hover">
                <h3 className="mb-4 text-lg font-semibold text-foreground">{card.title}</h3>
                <div className="space-y-3">
                  {card.content.map((p, j) => (
                    <p key={j} className="text-sm leading-relaxed text-muted-foreground">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </SectionReveal>
          ))}

          {/* Philosophy Quote - Memorable Moment */}
          <div className="md:col-span-2 my-4 py-6 px-4">
            <blockquote className="relative text-center max-w-2xl mx-auto">
              <div className="flex items-center gap-4 mb-5">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent to-primary/20" />
                <span className="text-primary/40 text-[10px] font-mono uppercase tracking-[0.2em]">Philosophy</span>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent to-primary/20" />
              </div>
              <p className="text-lg md:text-xl font-light text-foreground/50 leading-relaxed italic">
                &ldquo;A dashboard that confuses people is not a dashboard.<br className="hidden sm:block" />
                A forecast nobody trusts has no value.&rdquo;
              </p>
              <div className="mt-5 flex items-center gap-4">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent to-primary/15" />
                <div className="h-1.5 w-1.5 rounded-full bg-primary/25" />
                <div className="flex-1 h-px bg-gradient-to-l from-transparent to-primary/15" />
              </div>
            </blockquote>
          </div>

          {cards.slice(2).map((card) => (
            <SectionReveal key={card.title}>
              <div className="glass-surface rounded-2xl p-6 sm:p-8 h-full transition-colors duration-200 hover:border-primary/20 hover-premium-card mini-cursor-hover">
                <h3 className="mb-4 text-lg font-semibold text-foreground">{card.title}</h3>
                <div className="space-y-3">
                  {card.content.map((p, j) => (
                    <p key={j} className="text-sm leading-relaxed text-muted-foreground">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </SectionReveal>
          ))}

          <SectionReveal>
            <div className="glass-surface rounded-2xl p-6 sm:p-8 h-full transition-colors duration-200 hover:border-primary/20 hover-premium-card mini-cursor-hover">
              <h3 className="mb-4 text-lg font-semibold text-foreground">My Abilities</h3>
              <div className="flex flex-wrap gap-2">
                {abilities.map((a) => (
                  <span
                    key={a}
                    className="rounded-full border border-border/60 bg-primary/5 px-3 py-1.5 text-xs font-medium text-foreground/80 hover:border-primary/30 transition-colors duration-200 hover-premium-pill"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
