import { ThemeProvider } from "@/components/ThemeProvider";
import StarField from "@/components/StarField";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import EducationSection from "@/components/EducationSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Index() {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen overflow-x-hidden">
        <ScrollProgress />
        <StarField />
        {/* Subtle background darkening toward the bottom */}
        <div className="pointer-events-none fixed inset-0 z-[1] bg-gradient-to-b from-transparent via-transparent to-black/15 dark:to-black/25" aria-hidden="true" />
        <Navbar />
        <main className="relative z-10">
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <EducationSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
