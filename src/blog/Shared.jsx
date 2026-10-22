import { motion, useReducedMotion } from "motion/react";
import PropTypes from "prop-types";

export function Reveal({ children, className = "", delay = 0 }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.08 }}
    transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}
Reveal.propTypes = { children: PropTypes.node, className: PropTypes.string, delay: PropTypes.number };

export function ArticleCover({ cover, priority = false, decorative = false }) {
  return <div className="article-cover" data-accent={cover.accent}>
    <img src={cover.src} alt={decorative ? "" : cover.alt} width={cover.width} height={cover.height}
      loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} decoding="async" />
  </div>;
}
ArticleCover.propTypes = { cover: PropTypes.shape({ src: PropTypes.string.isRequired, alt: PropTypes.string.isRequired, width: PropTypes.number.isRequired, height: PropTypes.number.isRequired, accent: PropTypes.string }).isRequired, priority: PropTypes.bool, decorative: PropTypes.bool };

