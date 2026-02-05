import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

/**
 * Stagger: for lists/grids. Wrap container with <Stagger>,
 * and wrap each child card with <Stagger.Item>.
 */
const StaggerRoot = ({ children, className = "", once = true, amount = 0.2 }) => {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
};

const StaggerItem = ({ children, className = "", duration = 0.75 }) => {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={item}
      transition={{ duration, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

const Stagger = Object.assign(StaggerRoot, { Item: StaggerItem });
export default Stagger;

