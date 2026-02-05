import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const variants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
};

/**
 * Page-level wrapper: subtle fade + small y-shift.
 * Keeps layout intact (no position/size changes).
 */
const PageMotion = ({ children, className = "" }) => {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : "initial"}
      animate={reduce ? false : "animate"}
      exit={reduce ? false : "exit"}
      variants={variants}
      transition={{ duration: 0.75, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default PageMotion;

