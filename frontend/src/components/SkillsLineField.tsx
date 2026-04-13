import { useEffect, useRef, useState } from "react";

export default function SkillsLineField() {
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
        <linearGradient id="skillsLineA" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: `rgb(var(--ambient-line-color))`, stopOpacity: 0 }} />
          <stop offset="14%" style={{ stopColor: `rgb(var(--ambient-line-color))`, stopOpacity: 0.6 }} />
          <stop offset="52%" style={{ stopColor: `rgb(var(--ambient-line-color))`, stopOpacity: 0.4 }} />
          <stop offset="84%" style={{ stopColor: `rgb(var(--ambient-line-color))`, stopOpacity: 0.7 }} />
          <stop offset="100%" style={{ stopColor: `rgb(var(--ambient-line-color))`, stopOpacity: 0 }} />
        </linearGradient>
        <filter id="skillsLineSoftGlow">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.4" />
        </filter>
      </defs>

      {/* Responsive line flowing through Tech Stacks - enters at 92% from About, exits at 92% to Projects */}
      <path
        className="page-line-trace-2"
        d="M 5 8 Q 35 12 65 20 Q 85 28 95 35 Q 88 50 68 65 Q 48 75 28 82 Q 8 88 5 92"
        stroke="url(#skillsLineA)"
        strokeWidth="0.12"
        fill="none"
        strokeLinecap="round"
        filter="url(#skillsLineSoftGlow)"
      />
    </svg>
  );
}
