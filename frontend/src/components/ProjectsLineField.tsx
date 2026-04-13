import { useEffect, useRef, useState } from "react";

export default function ProjectsLineField() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (svgRef.current) {
      observer.observe(svgRef.current);
    }

    return () => {
      if (svgRef.current) {
        observer.unobserve(svgRef.current);
      }
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className={`page-lines-svg pointer-events-none absolute inset-0 w-full h-full transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="projectsLineA" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: `rgb(var(--ambient-line-color))`, stopOpacity: 0 }} />
          <stop offset="14%" style={{ stopColor: `rgb(var(--ambient-line-color))`, stopOpacity: 0.6 }} />
          <stop offset="52%" style={{ stopColor: `rgb(var(--ambient-line-color))`, stopOpacity: 0.4 }} />
          <stop offset="84%" style={{ stopColor: `rgb(var(--ambient-line-color))`, stopOpacity: 0.7 }} />
          <stop offset="100%" style={{ stopColor: `rgb(var(--ambient-line-color))`, stopOpacity: 0 }} />
        </linearGradient>
        <filter id="projectsLineSoftGlow">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.4" />
        </filter>
      </defs>

      {/* Main line flows through projects section - enters at 5% from Skills, exits at 92% */}
      <path
        className="page-line-trace-3"
        d="M 5 8 Q 50 15 90 22 Q 85 35 65 45 Q 65 58 85 70 Q 70 82 50 92"
        stroke="url(#projectsLineA)"
        strokeWidth="0.12"
        fill="none"
        strokeLinecap="round"
        filter="url(#projectsLineSoftGlow)"
      />
      
      {/* Prominent loop-de-loops around each project - scalable pattern for future projects */}
      {/* Featured Project loop (top-left area - 20% across, 28% down) */}
      <circle cx="20" cy="28" r="9" stroke="url(#projectsLineA)" strokeWidth="0.16" fill="none" opacity="0.65" filter="url(#projectsLineSoftGlow)" />
      
      {/* First other project loop (center area - 65% across, 45% down) */}
      <circle cx="65" cy="45" r="9" stroke="url(#projectsLineA)" strokeWidth="0.16" fill="none" opacity="0.65" filter="url(#projectsLineSoftGlow)" />
      
      {/* Second other project loop (center-right area - 85% across, 70% down) */}
      <circle cx="85" cy="70" r="9" stroke="url(#projectsLineA)" strokeWidth="0.16" fill="none" opacity="0.65" filter="url(#projectsLineSoftGlow)" />
      
      {/* Third other project loop (bottom area - 50% across, 92% down) */}
      <circle cx="50" cy="92" r="9" stroke="url(#projectsLineA)" strokeWidth="0.16" fill="none" opacity="0.65" filter="url(#projectsLineSoftGlow)" />
    </svg>
  );
}
