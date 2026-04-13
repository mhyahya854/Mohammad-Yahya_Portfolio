import { useEffect, useRef, useState } from "react";

export default function EducationLineField() {
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
        <linearGradient id="educationLineA" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: `rgb(var(--ambient-line-color))`, stopOpacity: 0 }} />
          <stop offset="14%" style={{ stopColor: `rgb(var(--ambient-line-color))`, stopOpacity: 0.6 }} />
          <stop offset="52%" style={{ stopColor: `rgb(var(--ambient-line-color))`, stopOpacity: 0.4 }} />
          <stop offset="84%" style={{ stopColor: `rgb(var(--ambient-line-color))`, stopOpacity: 0.7 }} />
          <stop offset="100%" style={{ stopColor: `rgb(var(--ambient-line-color))`, stopOpacity: 0 }} />
        </linearGradient>
        <filter id="educationLineSoftGlow">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.4" />
        </filter>
      </defs>

      {/* Responsive line enters at 8% from Projects, emphasizes Asia Pacific, exits at 92% */}
      <path
        className="page-line-trace-4"
        d="M 5 8 Q 45 15 85 25 Q 70 42 50 55 Q 38 68 60 80 Q 80 88 95 92"
        stroke="url(#educationLineA)"
        strokeWidth="0.12"
        fill="none"
        strokeLinecap="round"
        filter="url(#educationLineSoftGlow)"
      />
      
      {/* Left-side complementary line for visual balance */}
      <path
        className="page-line-trace-4"
        d="M 5 12 Q 15 25 12 45 Q 10 65 18 88"
        stroke="url(#educationLineA)"
        strokeWidth="0.24"
        fill="none"
        strokeLinecap="round"
        filter="url(#educationLineSoftGlow)"
      />
      
      {/* Larger emphasis orbit specifically around Asia Pacific University location - 50% across, 55% down */}
      <circle cx="50" cy="55" r="14" stroke="url(#educationLineA)" strokeWidth="0.18" fill="none" opacity="0.7" filter="url(#educationLineSoftGlow)" />
      
      {/* Casual smaller loops around Certifications and Leadership sections */}
      <circle cx="60" cy="80" r="9" stroke="url(#educationLineA)" strokeWidth="0.15" fill="none" opacity="0.6" filter="url(#educationLineSoftGlow)" />
      <circle cx="95" cy="92" r="9" stroke="url(#educationLineA)" strokeWidth="0.15" fill="none" opacity="0.6" filter="url(#educationLineSoftGlow)" />
    </svg>
  );
}
