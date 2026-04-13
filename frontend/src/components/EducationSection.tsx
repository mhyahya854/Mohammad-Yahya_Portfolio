import { GraduationCap, Award, Users, FileText, Calendar, MapPin } from "lucide-react";
import SectionReveal from "./SectionReveal";
import SectionHeader from "./SectionHeader";
import EducationLineField from "./EducationLineField";

const education = [
  {
    title: "Bachelor of Computer Science, Specialization in Data Analytics",
    org: "Asia Pacific University Malaysia",
    period: "2024 \u2014 Present",
    details: "Undergraduate Computer Science program at Asia Pacific University, with a specialization in Data Analytics.",
  },
  {
    title: "Associate Degree in Computer Science",
    org: "Virtual University of Pakistan",
    period: "2024 \u2014 2026",
    details: "Two-year associate degree focused on computer science fundamentals.",
  },
  {
    title: "SSC and HSSC",
    org: "Pakistan International School Al-Khobar",
    period: "Graduated in 2022",
    details: "Completed SSC and HSSC from Pakistan International School Al-Khobar.",
  },
];

const certifications = [
  { title: "Introduction to Cybersecurity", org: "Cisco Networking Academy", period: "Completed December 24, 2024" },
  { title: "Introduction to Digital Marketing", org: "Google", period: "Issued March 2023" },
];

const leadership = [
  { title: "Game Promotion Volunteer", org: "Alkaline Studios", details: "April 2026", contribution: "Supported event visibility and audience engagement through promotion and coordination." },
  { title: "Trainee Community Manager", org: "Game Development Club Committee", details: "2026", contribution: "Helped support community organization, communication, and activity planning." },
  { title: "Committee Member", org: "Bucket List Club Committee", details: "2025", contribution: "Contributed to club event planning, coordination, and member engagement." },
  { title: "Hajj Volunteer", org: "PHVG \u2014 Pakistan Hajj Volunteer Group", details: "2023", contribution: "Supported logistics and coordination for Hajj pilgrim groups." },
];

function ItemCard({ title, org, period, details }: { title: string; org: string; period?: string; details?: string }) {
  return (
    <div className="rounded-xl border border-border/40 bg-background/30 p-4 hover:border-primary/25 transition-colors duration-200 hover-premium-card">
      <h4 className="text-sm font-semibold text-foreground">{title}</h4>
      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
        <span className="flex items-center gap-1 text-blue-700/80 dark:text-blue-300/85"><MapPin size={10} />{org}</span>
        {period && <span className="flex items-center gap-1"><Calendar size={10} />{period}</span>}
      </div>
      {details && <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{details}</p>}
    </div>
  );
}

function LeadershipCard({ title, org, details, contribution }: { title: string; org: string; details: string; contribution: string }) {
  return (
    <div className="rounded-xl border border-border/40 bg-background/30 p-4 hover:border-primary/25 transition-colors duration-200 hover-premium-card">
      <h4 className="text-sm font-semibold text-foreground">{title}</h4>
      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
        <span className="flex items-center gap-1 text-blue-700/80 dark:text-blue-300/85"><MapPin size={10} />{org}</span>
        <span className="flex items-center gap-1"><Calendar size={10} />{details}</span>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground/80 italic">{contribution}</p>
    </div>
  );
}

export default function EducationSection() {
  return (
    <section id="education" className="relative py-24 sm:py-32 depth-4">
      <EducationLineField />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
        <SectionReveal>
          <SectionHeader
            label="Education & Growth"
            title="Background & Qualifications"
            description="My academic path, certifications, and leadership experience."
          />
        </SectionReveal>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Education with Timeline - Memorable Moment */}
          <SectionReveal>
            <div className="glass-surface rounded-2xl p-6 h-full transition-colors duration-200 hover:border-primary/20 hover-premium-card mini-cursor-hover">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <GraduationCap size={20} />
                </div>
                <h3 className="text-base font-semibold text-foreground">Education</h3>
              </div>
              {/* Timeline */}
              <div className="relative pl-6">
                <div className="absolute left-[7px] top-3 bottom-3 w-px bg-gradient-to-b from-primary/30 via-primary/15 to-transparent" />
                <div className="space-y-3">
                  {education.map((e) => (
                    <div key={e.title} className="relative">
                      <div className="absolute -left-6 top-4 flex h-[15px] w-[15px] items-center justify-center rounded-full border-2 border-primary/30 bg-background">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary/50" />
                      </div>
                      <ItemCard {...e} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SectionReveal>

          {/* Certifications */}
          <SectionReveal>
            <div className="glass-surface rounded-2xl p-6 h-full transition-colors duration-200 hover:border-primary/20 hover-premium-card mini-cursor-hover">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Award size={20} />
                </div>
                <h3 className="text-base font-semibold text-foreground">Certifications</h3>
              </div>
              <div className="space-y-3">
                {certifications.map((c) => (
                  <ItemCard key={c.title} title={c.title} org={c.org} period={c.period} />
                ))}
              </div>
            </div>
          </SectionReveal>

          {/* Leadership */}
          <SectionReveal>
            <div className="glass-surface rounded-2xl p-6 h-full transition-colors duration-200 hover:border-primary/20 hover-premium-card mini-cursor-hover">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Users size={20} />
                </div>
                <h3 className="text-base font-semibold text-foreground">Leadership & Activities</h3>
              </div>
              <div className="space-y-3">
                {leadership.map((l) => (
                  <LeadershipCard key={l.title} {...l} />
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>

        {/* Resume - standalone block */}
        <SectionReveal>
          <div className="mt-8 glass-surface rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors duration-200 hover:border-primary/20 hover-premium-card mini-cursor-hover">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FileText size={20} />
              </div>
              <h3 className="text-base font-semibold text-foreground">Resume</h3>
            </div>
            <a
              href="/resume/Mohammad-Yahya-Hussain-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-full cta-luminous-sky px-6 text-sm font-semibold text-primary-foreground transition-all hover-premium"
            >
              <FileText size={14} />
              View & Download Resume
            </a>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
