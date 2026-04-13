import { useEffect, useRef, useState } from "react";

export default function AboutLineField() {
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
        <linearGradient id="aboutLineA" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: `rgb(var(--ambient-line-color))`, stopOpacity: 0 }} />
          <stop offset="14%" style={{ stopColor: `rgb(var(--ambient-line-color))`, stopOpacity: 0.6 }} />
          <stop offset="52%" style={{ stopColor: `rgb(var(--ambient-line-color))`, stopOpacity: 0.4 }} />
          <stop offset="84%" style={{ stopColor: `rgb(var(--ambient-line-color))`, stopOpacity: 0.7 }} />
          <stop offset="100%" style={{ stopColor: `rgb(var(--ambient-line-color))`, stopOpacity: 0 }} />
        </linearGradient>
        <filter id="aboutLineSoftGlow">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.4" />
        </filter>
      </defs>

      {/* Responsive line flowing through About section - percentages scale across devices */}
      <path
        className="page-line-trace-1"
        d="M 5 18 Q 40 12 80 25 Q 90 35 65 48 Q 55 58 70 70 Q 85 80 95 92"
        stroke="url(#aboutLineA)"
        strokeWidth="0.12"
        fill="none"
        strokeLinecap="round"
        filter="url(#aboutLineSoftGlow)"
      />
    </svg>
  );
}
