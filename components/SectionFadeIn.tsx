"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SectionFadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  /** Use on direct children of CSS grid rows where cards should match row height */
  fillCell?: boolean;
  style?: React.CSSProperties;
}

export default function SectionFadeIn({ children, delay = 0, className, fillCell = false, style }: SectionFadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
      style={{
        ...(fillCell ? { height: "100%", minHeight: 0 } : {}),
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}
