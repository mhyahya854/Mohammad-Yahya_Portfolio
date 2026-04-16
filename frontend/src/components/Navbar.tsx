import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useMotionTier } from "@/hooks/use-motion-tier";
import { scrollToSelector } from "@/lib/motion-tier";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Stacks", href: "#stacks" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { tier, scrollBehavior } = useMotionTier();
  const [inHero, setInHero] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const reducesMotion = tier === "reduced";

  useEffect(() => {
    const onScroll = () => {
      // Check if we've scrolled past the hero section
      const hero = document.getElementById("home");
      if (hero) {
        setInHero(window.scrollY < hero.offsetHeight - 64); // 64px is navbar height
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    // Initialize
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0, rootMargin: "-20% 0px -60% 0px" }
    );
    navItems.forEach(({ href }) => {
      const el = document.getElementById(href.slice(1));
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    scrollToSelector(href, scrollBehavior);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        inHero
          ? "bg-transparent backdrop-blur-md border-b border-transparent"
          : "bg-background shadow-lg border-b border-border/40"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <button
          onClick={() => scrollTo("#home")}
          className="relative text-sm font-semibold tracking-tight text-foreground hover:text-primary transition-colors hover-premium-link after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-[220ms] hover:after:w-full"
        >
          Mohammad Yahya Hussain
        </button>

        {/* Desktop nav pill */}
        <div className="hidden md:flex items-center gap-1 rounded-full glass-surface px-2 py-1.5">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className={`rounded-full border border-transparent px-3.5 py-1.5 text-xs font-medium transition-all duration-200 hover-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  isActive
                    ? "bg-primary/15 text-primary font-semibold nav-tab-active"
                    : "text-muted-foreground nav-tab-hover"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/40 hover:glow-sm transition-all hover-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring overflow-hidden"
          >
            {reducesMotion ? (
              <span className="flex items-center justify-center">
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </span>
            ) : (
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ scale: 0.5, opacity: 0, rotate: -30 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  exit={{ scale: 0.5, opacity: 0, rotate: 30 }}
                  transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                  className="flex items-center justify-center"
                >
                  {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                </motion.span>
              </AnimatePresence>
            )}
          </button>
          
          <motion.button
            whileHover={reducesMotion ? undefined : { scale: 1.05, y: -1 }}
            whileTap={reducesMotion ? undefined : { scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            onClick={() => scrollTo("#contact")}
            className="hidden sm:inline-flex h-9 items-center rounded-full cta-luminous-sky px-4 text-xs font-semibold text-primary-foreground transition-all hover:glow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sheen"
          >
            Hire Me
          </motion.button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/40 hover:glow-sm transition-all hover-premium md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {reducesMotion ? (
        mobileOpen ? (
          <div className="glass-surface mx-4 mb-2 mt-1 rounded-2xl border border-border/40 p-4 md:hidden">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <button
                    key={item.href}
                    onClick={() => scrollTo(item.href)}
                    className={`rounded-xl border border-transparent px-4 py-2.5 text-left text-sm font-medium transition-all duration-200 hover-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      isActive
                        ? "bg-primary/14 text-primary font-semibold nav-tab-active"
                        : "text-muted-foreground nav-tab-hover"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}

              <button
                onClick={() => scrollTo("#contact")}
                className="mt-2 flex h-10 items-center justify-center rounded-xl cta-luminous-sky text-sm font-semibold text-primary-foreground transition-all hover:glow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sheen"
              >
                Hire Me
              </button>
            </div>
          </div>
        ) : null
      ) : (
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="glass-surface mx-4 mb-2 mt-1 rounded-2xl border border-border/40 p-4 md:hidden"
            >
              <div className="flex flex-col gap-1">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.href.slice(1);
                  return (
                    <motion.button
                      key={item.href}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.18, delay: index * 0.04, ease: [0.4, 0, 0.2, 1] }}
                      onClick={() => scrollTo(item.href)}
                      className={`rounded-xl border border-transparent px-4 py-2.5 text-left text-sm font-medium transition-all duration-200 hover-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                        isActive
                          ? "bg-primary/14 text-primary font-semibold nav-tab-active"
                          : "text-muted-foreground nav-tab-hover"
                      }`}
                    >
                      {item.label}
                    </motion.button>
                  );
                })}
                
                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => scrollTo("#contact")}
                  className="mt-2 flex h-10 items-center justify-center rounded-xl cta-luminous-sky text-sm font-semibold text-primary-foreground transition-all hover:glow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sheen"
                >
                  Hire Me
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </header>
  );
}
