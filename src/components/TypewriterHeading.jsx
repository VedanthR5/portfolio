import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import PropTypes from "prop-types";

const TypewriterHeading = ({ as: Tag = "h2", text, className = "" }) => {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const [hasStarted, setHasStarted] = useState(false);
  const [visibleChars, setVisibleChars] = useState(shouldReduceMotion ? text.length : 0);

  useEffect(() => {
    if (shouldReduceMotion) {
      setVisibleChars(text.length);
      return undefined;
    }

    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldReduceMotion, text.length]);

  useEffect(() => {
    if (!hasStarted || shouldReduceMotion || visibleChars >= text.length) {
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      setVisibleChars((count) => count + 1);
    }, visibleChars === 0 ? 180 : 46);

    return () => window.clearTimeout(timeout);
  }, [hasStarted, shouldReduceMotion, text.length, visibleChars]);

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">{text.slice(0, visibleChars)}</span>
      <span className="typing-caret" aria-hidden="true" />
    </Tag>
  );
};

TypewriterHeading.propTypes = {
  as: PropTypes.string,
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default TypewriterHeading;
