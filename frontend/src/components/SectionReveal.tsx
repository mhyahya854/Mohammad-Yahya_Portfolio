import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useMotionTier } from "@/hooks/use-motion-tier";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  animate?: boolean;
}

export default function SectionReveal({ children, className = "", delay = 0, animate = false }: Props) {
  const { tier } = useMotionTier();
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = animate && tier === "full" && !prefersReducedMotion;

  if (!shouldAnimate) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: prefersReducedMotion ? 0.01 : 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
