import { motion, useReducedMotion } from "framer-motion";
import { Github, Linkedin, Mail, Phone, ChevronDown, FileText, FolderOpen, MessageCircle } from "lucide-react";
import SectionReveal from "./SectionReveal";
import { EmailDialog } from "./EmailDialog";
import HeroSpaceBackground from "./HeroSpaceBackground";
import { toast } from "sonner";

const CONTACT_NAME = "Mohammad Yahya Hussain";
const CONTACT_PHONE = "+60179082264";
const CONTACT_EMAIL = "mhyahya04@gmail.com";
const CONTACT_LINKEDIN = "https://www.linkedin.com/in/mohammad-yahya-hussain-99a150289/";
const CONTACT_GITHUB = "https://github.com/mhyahya854";
const CONTACT_SOCIAL_NOTE = `LinkedIn: ${CONTACT_LINKEDIN}\nGitHub: ${CONTACT_GITHUB}`;
const GOOGLE_CONTACTS_NEW_URL = "https://contacts.google.com/new";

const escapeVCardValue = (value: string) =>
  value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");

const buildVCard = (portfolioUrl: string) =>
  [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${escapeVCardValue(CONTACT_NAME)}`,
    "N:Hussain;Mohammad Yahya;;;",
    `TEL;TYPE=CELL:${escapeVCardValue(CONTACT_PHONE)}`,
    `EMAIL;TYPE=INTERNET:${escapeVCardValue(CONTACT_EMAIL)}`,
    `URL;TYPE=LinkedIn:${escapeVCardValue(CONTACT_LINKEDIN)}`,
    `URL;TYPE=GitHub:${escapeVCardValue(CONTACT_GITHUB)}`,
    `NOTE:${escapeVCardValue(CONTACT_SOCIAL_NOTE)}`,
    `URL;TYPE=Portfolio:${escapeVCardValue(portfolioUrl)}`,
    "END:VCARD",
  ].join("\n");

const downloadVCardFallback = () => {
  if (typeof window === "undefined") return;

  const portfolioUrl = window.location.origin;
  const vCardContent = buildVCard(portfolioUrl);
  const blob = new Blob([vCardContent], { type: "text/vcard;charset=utf-8" });
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = "Mohammad-Yahya-Hussain-Contact.vcf";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
};

const codeLines = [
  'const analyst = {',
  '  name: "Mohammad Yahya Hussain",',
  '  role: "Analytics-Focused CS Student",',
  '  focus: [',
  '    "Dashboards",',
  '    "Automation",',
  '    "Forecasting",',
  '    "Storytelling",',
  '  ],',
  '  stack: [',
  '    "Python",',
  '    "SQL",',
  '    "Power BI",',
  '    "Tableau",',
  '  ],',
  '  build: () => "Useful reporting systems"',
  '}',
];

const socials = [
  { icon: Github, href: "https://github.com/mhyahya854", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/mohammad-yahya-hussain-99a150289/", label: "LinkedIn" },
  { icon: Mail, isEmailAction: true, label: "Email" },
  { icon: Phone, isAddContactAction: true, label: "Phone" },
];

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const downloadVCard = () => {
    if (typeof window === "undefined") return;

    const portfolioUrl = window.location.origin;
    const vCardContent = buildVCard(portfolioUrl);
    const blob = new Blob([vCardContent], { type: "text/vcard;charset=utf-8" });
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = "Mohammad-Yahya-Hussain-Contact.vcf";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
  };

  const handlePhoneAction = () => {
    if (typeof window === "undefined" || typeof navigator === "undefined") return;

    const ua = navigator.userAgent.toLowerCase();
    const isMobileDevice = /android|iphone|ipad|ipod/.test(ua);

    if (isMobileDevice) {
      downloadVCard();
      return;
    }

    const params = new URLSearchParams({
      givenname: "Mohammad Yahya",
      familyname: "Hussain",
      email: CONTACT_EMAIL,
      phone: CONTACT_PHONE,
      notes: CONTACT_SOCIAL_NOTE,
      note: CONTACT_SOCIAL_NOTE,
    });
    params.append("website_label", "LinkedIn");
    params.append("website", CONTACT_LINKEDIN);
    params.append("website_label", "GitHub");
    params.append("website", CONTACT_GITHUB);

    const prefilledUrl = `${GOOGLE_CONTACTS_NEW_URL}?${params.toString()}`;
    window.open(prefilledUrl, "_blank", "noopener,noreferrer");
    downloadVCardFallback();
    toast.info("Google Contacts opened. Backup .vcf downloaded. If links are missing, import the file.", {
      duration: 5000,
    });
  };

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative flex min-h-screen items-center pt-16">
      {/* Hero background — clean so stars stay 100% sharp */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true" />

      {/* Dark-mode enhanced space background with orbital lines & glowing node */}
      <HeroSpaceBackground />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-24">
        {/* Left column */}
        <div className="flex flex-col justify-center">
          <SectionReveal animate>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full glass-surface px-4 py-2 text-xs text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Open to internships, analytics roles, freelance work, and practical data collaborations
            </div>
          </SectionReveal>

          <SectionReveal animate delay={0.1}>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              <span className="block text-foreground">Mohammad</span>
              <span className="block text-gradient">Yahya Hussain</span>
            </h1>
          </SectionReveal>

          <SectionReveal animate delay={0.15}>
            <p className="mt-3 text-sm font-medium uppercase tracking-widest text-primary">
              Analytics-Focused Computer Science Student
            </p>
          </SectionReveal>

          <SectionReveal animate delay={0.2}>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
              I turn raw data into clearer decisions, sharper reporting, and practical insight people can actually use.
            </p>
          </SectionReveal>

          <SectionReveal animate delay={0.25}>
            <div className="mt-8 flex flex-wrap gap-3">
              <motion.a
                href="/resume/Mohammad-Yahya-Hussain-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
                className="sheen inline-flex h-11 items-center gap-2 rounded-full cta-subtle-sky px-6 text-sm font-semibold text-primary-foreground transition-all hover-premium hero-cta-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <FileText size={16} />
                View Resume
              </motion.a>
              <button
                onClick={() => scrollTo("#projects")}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-border/60 glass-surface px-6 text-sm font-medium text-foreground hover:border-primary/40 hover:bg-primary/10 hover:glow-sm transition-all duration-200 hover-premium hero-cta-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <FolderOpen size={16} />
                See Projects
              </button>
              <button
                onClick={() => scrollTo("#contact")}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-border/60 glass-surface px-6 text-sm font-medium text-foreground hover:border-primary/40 hover:bg-primary/10 hover:glow-sm transition-all duration-200 hover-premium hero-cta-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <MessageCircle size={16} />
                Let's Work Together
              </button>
            </div>
          </SectionReveal>

          <SectionReveal animate delay={0.3}>
            <div className="mt-8 flex gap-3">
              {socials.map((s) => (
                s.isEmailAction ? (
                  <EmailDialog key={s.label} email="mhyahya04@gmail.com">
                    <button
                      aria-label={s.label}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 text-muted-foreground/60 hover:text-foreground hover:border-primary/40 hover:glow-sm hover:-translate-y-1 transition-all duration-200 hover-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <s.icon size={18} />
                    </button>
                  </EmailDialog>
                ) : s.isAddContactAction ? (
                  <button
                    key={s.label}
                    type="button"
                    onClick={handlePhoneAction}
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 text-muted-foreground/60 hover:text-foreground hover:border-primary/40 hover:glow-sm hover:-translate-y-1 transition-all duration-200 hover-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <s.icon size={18} />
                  </button>
                ) : (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 text-muted-foreground/60 hover:text-foreground hover:border-primary/40 hover:glow-sm hover:-translate-y-1 transition-all duration-200 hover-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <s.icon size={18} />
                  </a>
                )
              ))}
            </div>
          </SectionReveal>
        </div>

        {/* Right column: IDE Panel */}
        <SectionReveal animate delay={0.2} className="flex items-center justify-center">
          <div className="relative w-full max-w-md">
            <div className="absolute -inset-4 rounded-3xl bg-primary/[0.02] blur-xl" aria-hidden="true" />
            <motion.div
              whileHover={prefersReducedMotion ? {} : { y: -4 }}
              transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }}
              className="relative overflow-hidden rounded-xl border shadow-2xl shadow-black/40 hover-premium-card hero-editor-shell"
            >
              {/* Title bar — realistic OS-level chrome */}
              <div className="hero-editor-titlebar flex items-center justify-between px-3.5 py-2">
                <div className="flex items-center gap-2">
                  <span className="hero-editor-dot-red h-[11px] w-[11px] rounded-full" />
                  <span className="hero-editor-dot-yellow h-[11px] w-[11px] rounded-full" />
                  <span className="hero-editor-dot-green h-[11px] w-[11px] rounded-full" />
                </div>
                <span className="hero-editor-text-muted text-[10px] font-mono">analyst.ts — Portfolio</span>
                <div className="w-12" />
              </div>

              {/* File tabs — VS Code style */}
              <div className="hero-editor-tabs flex">
                <div className="hero-editor-tab-active flex items-center gap-1.5 px-3 py-[5px]">
                  <span className="hero-editor-tab-icon-blue h-[10px] w-[10px] rounded-sm" />
                  <span className="hero-editor-tab-text-active text-[10.5px] font-mono">analyst.ts</span>
                  <span className="hero-editor-tab-close ml-1 cursor-pointer text-[9px] hover-premium-link">&times;</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-[5px] border-b-[2px] border-b-transparent">
                  <span className="hero-editor-tab-icon-yellow h-[10px] w-[10px] rounded-sm" />
                  <span className="hero-editor-tab-text-inactive text-[10.5px] font-mono">config.json</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-[5px] border-b-[2px] border-b-transparent">
                  <span className="hero-editor-tab-icon-muted h-[10px] w-[10px] rounded-sm" />
                  <span className="hero-editor-tab-text-inactive text-[10.5px] font-mono">README.md</span>
                </div>
                <div className="hero-editor-divider flex-1 border-b" />
              </div>

              {/* Breadcrumb path */}
              <div className="hero-editor-breadcrumb px-4 py-[3px] text-[9px] font-mono border-b">
                src <span className="hero-editor-breadcrumb-separator">&rsaquo;</span> data <span className="hero-editor-breadcrumb-separator">&rsaquo;</span> <span className="hero-editor-breadcrumb-current">analyst.ts</span>
              </div>

              {/* Code area */}
              <div className="hero-editor-code py-1 font-mono text-[12.5px] leading-[22px] sm:text-[13px] sm:leading-[24px]">
                {codeLines.map((line, i) => {
                  const isActive = i === 15;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.05, duration: 0.25 }}
                      className={`flex border-l-2 border-l-transparent ${isActive ? "hero-editor-line-active" : ""}`}
                    >
                      <span className="hero-editor-line-number w-10 text-right pr-4 select-none shrink-0">
                        {i + 1}
                      </span>
                      <CodeLine line={line} />
                    </motion.div>
                  );
                })}
                {/* Cursor line */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.6 }}
                  className="flex"
                  style={{ borderLeft: '2px solid transparent' }}
                >
                  <span className="hero-editor-line-number w-10 text-right pr-4 select-none shrink-0">
                    {codeLines.length + 1}
                  </span>
                  <span className="hero-editor-cursor inline-block h-[15px] w-[1.5px] mt-[3px] animate-blink" />
                </motion.div>
              </div>

              {/* Status bar — realistic VS Code */}
              <div className="hero-editor-statusbar flex items-center justify-between px-3 py-[3px]">
                <div className="hero-editor-status-primary flex items-center gap-3 text-[9.5px] font-mono">
                  <span className="flex items-center gap-1">
                    <span className="hero-editor-dot-green h-[6px] w-[6px] rounded-full" />
                    TypeScript
                  </span>
                  <span className="hero-editor-status-muted">UTF-8</span>
                  <span className="hero-editor-status-muted">LF</span>
                </div>
                <div className="hero-editor-status-muted flex items-center gap-3 text-[9.5px] font-mono">
                  <span>Ln {codeLines.length + 1}, Col 1</span>
                  <span>Spaces: 2</span>
                </div>
              </div>
            </motion.div>
          </div>
        </SectionReveal>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollTo("#about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground/60 hover:text-muted-foreground transition-colors hover-premium hover-premium-link focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
        aria-label="Scroll down"
      >
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <ChevronDown size={16} className="animate-bounce" />
      </motion.button>
    </section>
  );
}

function CodeLine({ line }: { line: string }) {
  const highlighted = line
    .replace(/(const|return)/g, '<kw>$1</kw>')
    .replace(/(".*?")/g, '<str>$1</str>')
    .replace(/(\(|\)|\{|\}|\[|\]|=>|,|:)/g, '<punc>$1</punc>');

  const parts = highlighted.split(/(<kw>.*?<\/kw>|<str>.*?<\/str>|<punc>.*?<\/punc>)/);

  return (
    <span>
      {parts.map((part, i) => {
        if (part.startsWith("<kw>"))
          return <span key={i} className="hero-editor-token-keyword">{part.replace(/<\/?kw>/g, "")}</span>;
        if (part.startsWith("<str>"))
          return <span key={i} className="hero-editor-token-string">{part.replace(/<\/?str>/g, "")}</span>;
        if (part.startsWith("<punc>"))
          return <span key={i} className="hero-editor-token-punc">{part.replace(/<\/?punc>/g, "")}</span>;
        return <span key={i} className="hero-editor-token-default">{part}</span>;
      })}
    </span>
  );
}

