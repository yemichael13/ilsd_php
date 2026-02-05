import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const baseVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

/**
 * Scroll reveal wrapper for sections/cards.
 * Uses transform+opacity only (no layout disruption).
 */
const Reveal = ({
  children,
  className = "",
  delay = 0,
  duration = 0.75,
  amount = 0.2,
  once = true,
}) => {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={baseVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      transition={{ duration, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;

