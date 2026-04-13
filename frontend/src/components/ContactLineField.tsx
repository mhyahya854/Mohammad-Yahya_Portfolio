import { useEffect, useRef, useState } from "react";

export default function ContactLineField() {
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
        <linearGradient id="contactLineA" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: `rgb(var(--ambient-line-color))`, stopOpacity: 0 }} />
          <stop offset="14%" style={{ stopColor: `rgb(var(--ambient-line-color))`, stopOpacity: 0.6 }} />
          <stop offset="52%" style={{ stopColor: `rgb(var(--ambient-line-color))`, stopOpacity: 0.4 }} />
          <stop offset="84%" style={{ stopColor: `rgb(var(--ambient-line-color))`, stopOpacity: 0.7 }} />
          <stop offset="100%" style={{ stopColor: `rgb(var(--ambient-line-color))`, stopOpacity: 0 }} />
        </linearGradient>
        <filter id="contactLineSoftGlow">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.4" />
        </filter>
      </defs>

      {/* Solid line enters at 5% from Education */}
      <path
        className="page-line-trace-5"
        d="M 5 8 Q 40 15 75 28 Q 65 45 50 72"
        stroke="url(#contactLineA)"
        strokeWidth="0.12"
        fill="none"
        strokeLinecap="round"
        filter="url(#contactLineSoftGlow)"
      />
      
      {/* Dotted line continues towards follow me section and eventual end */}
      <path
        className="page-line-trace-5"
        d="M 50 72 Q 45 82 50 95"
        stroke="url(#contactLineA)"
        strokeWidth="0.12"
        strokeDasharray="1.5,1.5"
        fill="none"
        strokeLinecap="round"
        filter="url(#contactLineSoftGlow)"
      />
    </svg>
  );
}
