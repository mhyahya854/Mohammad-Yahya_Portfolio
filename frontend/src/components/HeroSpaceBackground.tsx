import { useTheme } from "./ThemeProvider";

/**
 * HeroSpaceBackground
 * ---------------------
 * Layered gradients + thin orbital/trajectory lines + glowing node.
 * Renders in BOTH light and dark mode with appropriate palettes.
 * All overlays are low-opacity so StarField canvas stays crisp.
 *
 * Dark  — navy accents + neon green (#7CFFB2) lines
 * Light — soft blue accents + muted teal-green (#3BA88C) lines
 */
export default function HeroSpaceBackground() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Palette per mode
  const lineColor = isDark ? "#7CFFB2" : "#3BA88C";
  const nodeColor = isDark ? "#7CFFB2" : "#3BA88C";
  const nodeOpacity = isDark ? 0.50 : 0.42;
  const nodeSecondaryOpacity = isDark ? 0.22 : 0.20;

  // Gradient opacities — light mode boosted so lines are clearly visible
  const lo = isDark ? [0, 0.16, 0.14, 0.08, 0] : [0, 0.24, 0.20, 0.12, 0];
  const l1 = isDark ? [0.02, 0.13, 0.15, 0] : [0.02, 0.18, 0.22, 0];
  const l2 = isDark ? [0, 0.11, 0.13, 0.02] : [0, 0.16, 0.20, 0.02];

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
      style={{ zIndex: 1 }}
    >
      {/* ── Soft radial depth accents ── */}
      {isDark ? (
        <>
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 120% 80% at 18% 22%, rgba(18,52,90,0.28) 0%, transparent 55%),
                radial-gradient(ellipse 100% 70% at 82% 68%, rgba(12,37,68,0.22) 0%, transparent 50%),
                radial-gradient(ellipse 130% 85% at 50% 50%, rgba(7,24,45,0.18) 0%, transparent 70%)
              `,
            }}
          />
          <div
            className="absolute"
            style={{
              top: "12%",
              left: "-6%",
              width: "60%",
              height: "76%",
              background:
                "radial-gradient(ellipse at 32% 50%, rgba(5,12,26,0.28) 0%, rgba(5,12,26,0.1) 42%, transparent 72%)",
              filter: "blur(10px)",
            }}
          />
        </>
      ) : (
        <div
          className="absolute"
          style={{
            top: "10%",
            left: "-4%",
            width: "58%",
            height: "72%",
            background:
              "radial-gradient(ellipse at 30% 50%, rgba(210,225,245,0.18) 0%, rgba(210,225,245,0.06) 40%, transparent 70%)",
            filter: "blur(10px)",
          }}
        />
      )}

      {/* ── SVG orbital lines + glowing node — BOTH modes ── */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="nodeGlow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="lineGlowHero">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" />
          </filter>

          <linearGradient id="lineGrad1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={lineColor} stopOpacity={lo[0]} />
            <stop offset="12%" stopColor={lineColor} stopOpacity={lo[1]} />
            <stop offset="55%" stopColor={lineColor} stopOpacity={lo[2]} />
            <stop offset="85%" stopColor={lineColor} stopOpacity={lo[3]} />
            <stop offset="100%" stopColor={lineColor} stopOpacity={lo[4]} />
          </linearGradient>

          <linearGradient id="lineGrad2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={lineColor} stopOpacity={l1[0]} />
            <stop offset="20%" stopColor={lineColor} stopOpacity={l1[1]} />
            <stop offset="65%" stopColor={lineColor} stopOpacity={l1[2]} />
            <stop offset="100%" stopColor={lineColor} stopOpacity={l1[3]} />
          </linearGradient>

          <linearGradient id="lineGrad3" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={lineColor} stopOpacity={l2[0]} />
            <stop offset="18%" stopColor={lineColor} stopOpacity={l2[1]} />
            <stop offset="60%" stopColor={lineColor} stopOpacity={l2[2]} />
            <stop offset="100%" stopColor={lineColor} stopOpacity={l2[3]} />
          </linearGradient>
        </defs>

        {/* Line 1 — large sweeping arc */}
        <path
          d="M 1500 80 Q 1100 250, 850 420 Q 600 590, 200 780"
          stroke="url(#lineGrad1)"
          strokeWidth="1.3"
          strokeLinecap="round"
          filter="url(#lineGlowHero)"
        />

        {/* Line 2 — shorter arc from right */}
        <path
          d="M 1420 350 Q 1150 380, 950 520 Q 780 640, 620 850"
          stroke="url(#lineGrad2)"
          strokeWidth="1.1"
          strokeLinecap="round"
          filter="url(#lineGlowHero)"
        />

        {/* Line 3 — subtle arc from top-center */}
        <path
          d="M 700 -20 Q 580 160, 420 300 Q 280 420, 60 540"
          stroke="url(#lineGrad3)"
          strokeWidth="1.0"
          strokeLinecap="round"
          filter="url(#lineGlowHero)"
        />

        {/* Glowing node at intersection */}
        <g filter="url(#nodeGlow)">
          <circle
            cx="950"
            cy="420"
            r="3.2"
            fill={nodeColor}
            fillOpacity={nodeOpacity}
            className="hero-orbit-node"
          />
        </g>

        {/* Faint secondary node */}
        <circle
          cx="420"
          cy="300"
          r="2"
          fill={nodeColor}
          fillOpacity={nodeSecondaryOpacity}
        />
      </svg>
    </div>
  );
}
