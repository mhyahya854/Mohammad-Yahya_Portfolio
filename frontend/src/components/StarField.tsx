import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

interface Star {
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  /** false = static star (no blinking), true = blinks */
  blinks: boolean;
  /** Primary sine speed — varies per star */
  blinkSpeed: number;
  /** Secondary sine speed — creates irregular rhythm */
  blinkSpeed2: number;
  /** Phase offset so not all stars sync */
  phase: number;
  /** Peak brightness multiplier 0.5–1.0 */
  peakBright: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  angle: number;
  life: number;
  maxLife: number;
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let animId: number;
    let stars: Star[] = [];
    const shootingStars: ShootingStar[] = [];

    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const w = window.innerWidth;
      const h = document.documentElement.scrollHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initStars();
    };

    const initStars = () => {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      const heroBottom = window.innerHeight;
      // Sparse star field — fewer stars, more spread
      const count = Math.floor((w * h) / 2800);
      stars = Array.from({ length: count }, () => {
        const y = Math.random() * h;
        const inHero = y < heroBottom;
        return {
          x: Math.random() * w,
          y,
          // Crisp point-like — keep sizes small for sharpness
          size: inHero
            ? Math.random() * 1.35 + 0.55
            : Math.random() * 0.95 + 0.35,
          baseOpacity: inHero
            ? Math.random() * 0.75 + 0.3
            : Math.random() * 0.4 + 0.1,
          // ~65% of stars blink, ~35% stay static
          blinks: Math.random() < 0.65,
          // Varied blink speeds for organic feel
          blinkSpeed: Math.random() * 2.0 + 0.4,
          blinkSpeed2: Math.random() * 0.8 + 0.15,
          phase: Math.random() * Math.PI * 2,
          // Peak brightness varies: some dim twinklers, some bright flashers
          peakBright: Math.random() * 0.5 + 0.5,
        };
      });
    };

    const spawnShootingStar = () => {
      if (shootingStars.length > 6) return;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      const heroHeight = Math.min(window.innerHeight, h * 0.15);
      shootingStars.push({
        x: Math.random() * w * 0.85,
        y: Math.random() * heroHeight * 0.5,
        length: Math.random() * 160 + 70,
        speed: Math.random() * 6 + 3.5,
        opacity: 1,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.35,
        life: 0,
        maxLife: 45 + Math.random() * 35,
      });
    };

    let frame = 0;
    const isDark = theme === "dark";
    const starColor = isDark ? "200, 220, 255" : "55, 95, 165";
    const baseAlpha = 1.0;

    const draw = () => {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);
      const time = frame * 0.04;

      for (const s of stars) {
        let alpha: number;

        if (prefersReduced || !s.blinks) {
          // Static star — constant brightness
          alpha = s.baseOpacity * s.peakBright;
        } else {
          // Blinking star — combine two sine waves for organic irregularity
          const wave1 =
            (Math.sin(time * s.blinkSpeed + s.phase) + 1) * 0.5;
          const wave2 =
            (Math.sin(time * s.blinkSpeed2 + s.phase * 1.7) + 1) * 0.5;
          // Mix: 70% primary wave, 30% secondary for irregularity
          const combined = wave1 * 0.7 + wave2 * 0.3;
          // Apply an ease curve for snappier blinks
          const curved = Math.pow(combined, 1.6);
          alpha =
            (0.06 + curved * 0.94) * s.baseOpacity * s.peakBright;
        }

        // Slow breathing pulse so stars feel alive without becoming blurry.
        const breathWave = prefersReduced
          ? 1
          : 0.88 + ((Math.sin(time * 0.45 + s.phase * 0.8) + 1) * 0.5) * 0.24;
        const starRadius = s.size * breathWave;
        const glowAlpha = Math.min(1, alpha * 0.34);
        const coreAlpha = Math.min(1, alpha * 0.95);

        ctx.fillStyle = `rgba(${starColor}, ${glowAlpha * baseAlpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, starRadius + 0.8, 0, Math.PI * 2);
        ctx.fill();

        // Render tiny stars as pixel-aligned squares for a sharp point core.
        ctx.fillStyle = `rgba(${starColor}, ${coreAlpha * baseAlpha})`;
        if (starRadius <= 1.1) {
          const dotSize = starRadius <= 0.75 ? 1 : 2;
          const px = Math.round(s.x - dotSize / 2);
          const py = Math.round(s.y - dotSize / 2);
          ctx.fillRect(px, py, dotSize, dotSize);
        } else {
          ctx.beginPath();
          ctx.arc(s.x, s.y, starRadius * 0.72, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Shooting stars
      if (!prefersReduced) {
        for (let i = shootingStars.length - 1; i >= 0; i--) {
          const ss = shootingStars[i];
          ss.life++;
          const progress = ss.life / ss.maxLife;
          ss.x += Math.cos(ss.angle) * ss.speed;
          ss.y += Math.sin(ss.angle) * ss.speed;
          ss.opacity = 1 - progress;

          const grad = ctx.createLinearGradient(
            ss.x,
            ss.y,
            ss.x - Math.cos(ss.angle) * ss.length,
            ss.y - Math.sin(ss.angle) * ss.length
          );
          grad.addColorStop(
            0,
            `rgba(${starColor}, ${ss.opacity * baseAlpha * 1.2})`
          );
          grad.addColorStop(
            0.3,
            `rgba(${starColor}, ${ss.opacity * baseAlpha * 0.6})`
          );
          grad.addColorStop(1, `rgba(${starColor}, 0)`);
          ctx.beginPath();
          ctx.moveTo(ss.x, ss.y);
          ctx.lineTo(
            ss.x - Math.cos(ss.angle) * ss.length,
            ss.y - Math.sin(ss.angle) * ss.length
          );
          ctx.strokeStyle = grad;
          ctx.lineWidth = 2;
          ctx.stroke();

          // Bright head glow
          ctx.beginPath();
          ctx.arc(ss.x, ss.y, 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${starColor}, ${ss.opacity * baseAlpha * 0.9})`;
          ctx.fill();

          if (ss.life >= ss.maxLife) shootingStars.splice(i, 1);
        }

        // Meteor spawning
        if (frame % 80 === 0) spawnShootingStar();
        if (frame % 140 === 50) spawnShootingStar();
        if (frame % 220 === 110) spawnShootingStar();
      }

      frame++;
      animId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(document.documentElement);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      resizeObserver.disconnect();
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}
