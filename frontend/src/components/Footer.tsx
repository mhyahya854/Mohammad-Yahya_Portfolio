import { Github, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { EmailDialog } from "./EmailDialog";
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

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Stacks", href: "#stacks" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const connect = [
  { icon: Github, href: "https://github.com/mhyahya854", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/mohammad-yahya-hussain-99a150289/", label: "LinkedIn" },
  { icon: Mail, isEmailAction: true, label: "Email" },
  { icon: Phone, isAddContactAction: true, label: "Phone" },
];

export default function Footer() {
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

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="depth-5 border-t border-white/[0.04] py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="text-base font-bold text-foreground">Mohammad Yahya Hussain</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Building insight-driven dashboards, reporting systems, and analytical workflows that turn raw data into clear, useful action.
            </p>
            <a
              href="https://maps.app.goo.gl/KZwWZiiBXKY5iLKU6"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Kuala Lumpur location in Google Maps"
              className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 rounded hover-premium hover-premium-link footer-link-hover"
            >
              <MapPin size={12} /> Kuala Lumpur, Malaysia
            </a>
          </div>
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <button key={link.href} onClick={() => scrollTo(link.href)} className="text-left text-sm text-muted-foreground hover:text-primary transition-colors duration-200 rounded hover-premium hover-premium-link footer-link-hover">
                  {link.label}
                </button>
              ))}
            </nav>
          </div>
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Connect</h4>
            <div className="flex flex-col gap-2">
              {connect.map((c) => (
                c.isEmailAction ? (
                  <EmailDialog key={c.label} email="mhyahya04@gmail.com">       
                    <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200 rounded hover-premium hover-premium-link footer-link-hover text-left w-full">
                      <c.icon size={14} /> {c.label}
                    </button>
                  </EmailDialog>
                ) : c.isAddContactAction ? (
                  <button
                    key={c.label}
                    type="button"
                    onClick={handlePhoneAction}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200 rounded hover-premium hover-premium-link footer-link-hover text-left w-full"
                  >
                    <c.icon size={14} /> {c.label}
                  </button>
                ) : (
                  <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200 rounded hover-premium hover-premium-link footer-link-hover">
                    <c.icon size={14} /> {c.label}
                  </a>
                )
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/[0.04] pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            Built by Mohammad Yahya Hussain, with love <span className="inline-block animate-pulse-heart text-red-400">&#10084;&#65039;</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
