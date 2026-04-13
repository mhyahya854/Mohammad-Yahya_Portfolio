import { useState, FormEvent } from "react";
import { Mail, Phone, MapPin, Github, Linkedin, Send, UserPlus } from "lucide-react";
import SectionReveal from "./SectionReveal";
import SectionHeader from "./SectionHeader";
import { EmailDialog } from "./EmailDialog";
import ContactLineField from "./ContactLineField";
import { toast } from "sonner";

const CONTACT_NAME = "Mohammad Yahya Hussain";
const CONTACT_PHONE = "+60179082264";
const CONTACT_EMAIL = "mhyahya04@gmail.com";
const CONTACT_LINKEDIN = "https://www.linkedin.com/in/mohammad-yahya-hussain-99a150289/";
const CONTACT_GITHUB = "https://github.com/mhyahya854/Mohammad-Yahya_Portfolio";
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

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);

  const socials = [
    { icon: Github, href: CONTACT_GITHUB, label: "GitHub" },
    { icon: Linkedin, href: CONTACT_LINKEDIN, label: "LinkedIn" },
    { icon: Mail, isEmailAction: true, label: "Email" },
    { icon: Phone, isAddContactAction: true, label: "Add Contact" },
  ] as const;

  const openVCard = (download: boolean) => {
    const portfolioUrl = typeof window !== "undefined" ? window.location.origin : "https://portfolio.local";
    const vCardContent = buildVCard(portfolioUrl);
    const blob = new Blob([vCardContent], { type: "text/vcard;charset=utf-8" });
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = objectUrl;

    if (download) {
      link.download = "Mohammad-Yahya-Hussain-Contact.vcf";
    }

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
  };

  const handleAddContact = () => {
    if (typeof window === "undefined" || typeof navigator === "undefined") return;

    const ua = navigator.userAgent.toLowerCase();
    const isMobileDevice = /android|iphone|ipad|ipod/.test(ua);

    if (!isMobileDevice) {
      // Best-effort pre-filling for Google Contacts web
      const params = new URLSearchParams({
        givenname: "Mohammad Yahya Hussain",
        familyname: "",
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
      openVCard(true);

      toast.info("Google Contacts opened. Backup .vcf downloaded. If links are missing, import the file.", {
        duration: 5000,
      });
      return;
    }

    openVCard(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setEmailDialogOpen(true);
  };

  const subject = form.subject || `Portfolio inquiry from ${form.name}`;
  const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;

  return (
    <section id="contact" className="relative py-24 sm:py-32 depth-5">
      <EmailDialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen} subject={subject} body={body} />
      <ContactLineField />
      
      {/* Clean background so stars stay sharp */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 z-10">
        <SectionReveal>
          <SectionHeader
            label="Get In Touch"
            title="Let's connect and build something useful."
            description="For internships, projects, freelance work, or data-related opportunities."
          />
        </SectionReveal>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left: Connect card */}
          <SectionReveal>
            <div className="glass-surface rounded-2xl p-6 sm:p-8 h-full transition-colors duration-200 hover:border-primary/20 hover-premium-card">
              <h3 className="mb-3 text-lg font-semibold text-foreground">Let's Connect</h3>
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
              <div className="space-y-4 mb-8">
                <EmailDialog>
                  <button type="button" className="w-full text-left flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group hover-premium-link contact-link-hover">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 text-primary group-hover:border-primary/40 transition-colors duration-200 hover-premium">
                      <Mail size={16} />
                    </div>
                    {CONTACT_EMAIL}
                  </button>
                </EmailDialog>
                <button
                  type="button"
                  onClick={handleAddContact}
                  className="w-full text-left flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group hover-premium-link contact-link-hover"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 text-primary group-hover:border-primary/40 transition-colors duration-200 hover-premium">
                    <UserPlus size={16} />
                  </div>
                  Add Yahya to Contacts
                </button>
                <a
                  href="https://maps.app.goo.gl/KZwWZiiBXKY5iLKU6"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Kuala Lumpur location in Google Maps"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group hover-premium-link contact-link-hover"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 text-primary group-hover:border-primary/40 transition-colors duration-200 hover-premium">
                    <MapPin size={16} />
                  </div>
                  Kuala Lumpur, Malaysia
                </a>
              </div>
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Follow Me</p>
                <div className="flex gap-3">
                  {socials.map((s) => {
                    const buttonStyles = "flex h-10 w-10 items-center justify-center rounded-full border border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors duration-200 hover-premium contact-social-hover";
                    
                    if ("isEmailAction" in s) {
                      return (
                        <EmailDialog key={s.label}>
                          <button type="button" aria-label={s.label} className={buttonStyles}>
                            <s.icon size={18} />
                          </button>
                        </EmailDialog>
                      );
                    }
                    
                    if ("isAddContactAction" in s) {
                      return (
                        <button
                          key={s.label}
                          type="button"
                          aria-label={s.label}
                          onClick={handleAddContact}
                          className={buttonStyles}
                        >
                          <s.icon size={18} />
                        </button>
                      );
                    }
                    
                    return (
                      <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className={buttonStyles}>
                        <s.icon size={18} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </SectionReveal>

          {/* Right: Form with dramatic glow */}
          <SectionReveal>
            <form onSubmit={handleSubmit} className="glass-surface rounded-2xl p-6 sm:p-8 h-full flex flex-col glow-md transition-colors duration-200 hover:border-primary/25 hover-premium-card">
              <div className="flex-1 space-y-4">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-foreground">Name *</label>
                  <input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="h-10 w-full rounded-xl border border-border/60 bg-background/50 px-4 text-sm text-foreground placeholder:text-muted-foreground/50 hover:border-primary/30 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-ring/30 transition-colors duration-200 hover-premium-input" placeholder="Your full name" />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-foreground">Email *</label>
                  <input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="h-10 w-full rounded-xl border border-border/60 bg-background/50 px-4 text-sm text-foreground placeholder:text-muted-foreground/50 hover:border-primary/30 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-ring/30 transition-colors duration-200 hover-premium-input" placeholder="your@email.com" />
                </div>
                <div>
                  <label htmlFor="subject" className="mb-1.5 block text-xs font-medium text-foreground">Subject</label>
                  <input id="subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="h-10 w-full rounded-xl border border-border/60 bg-background/50 px-4 text-sm text-foreground placeholder:text-muted-foreground/50 hover:border-primary/30 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-ring/30 transition-colors duration-200 hover-premium-input" placeholder="What is this about?" />
                </div>
                <div>
                  <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-foreground">Message *</label>
                  <textarea id="message" required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 hover:border-primary/30 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-ring/30 transition-colors resize-none hover-premium-input" placeholder="Tell me about your project, role, or idea..." />
                </div>
              </div>
              <button type="submit" className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-primary-foreground cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-sm active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                <Send size={16} /> Send Message
              </button>
            </form>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
