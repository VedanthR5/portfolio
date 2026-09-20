import { motion, useReducedMotion } from "motion/react";
import PropTypes from "prop-types";

export function Reveal({ children, className = "", delay = 0 }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.08 }}
    transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}
Reveal.propTypes = { children: PropTypes.node, className: PropTypes.string, delay: PropTypes.number };

export function FieldArt() {
  return <div className="field-art" aria-hidden="true">
    <div className="field-glow" />
    <div className="field-rings">{Array.from({ length: 12 }, (_, i) => <i key={i} style={{ "--i": i }} />)}</div>
    <span className="field-axis axis-one" /><span className="field-axis axis-two" />
    <span className="field-point" />
    <span className="field-coordinate">FIG. 01 — A SHIFT IN PERSPECTIVE</span>
  </div>;
}

