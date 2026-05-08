import { useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { fadeVariants } from "../utils/motion";

const GithubIcon = () => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const domains = ["systems", "ai", "trading", "security", "ml"];

const useTypingCycle = (words) => {
  const shouldReduceMotion = useReducedMotion();
  const [displayText, setDisplayText] = useState(words[0]);
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const current = words[wordIndex];

    if (!isDeleting && displayText === current) {
      const t = setTimeout(() => setIsDeleting(true), 2200);
      return () => clearTimeout(t);
    }
    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
      return;
    }
    const t = setTimeout(
      () =>
        setDisplayText(
          isDeleting
            ? current.slice(0, displayText.length - 1)
            : current.slice(0, displayText.length + 1),
        ),
      isDeleting ? 50 : 90,
    );
    return () => clearTimeout(t);
  }, [displayText, isDeleting, wordIndex, words, shouldReduceMotion]);

  return shouldReduceMotion ? null : displayText;
};

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const typingText = useTypingCycle(domains);

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Radial gradient glow — dark indigo/purple behind text */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 28% 52%, rgba(99,102,241,0.13) 0%, rgba(88,28,135,0.07) 45%, transparent 70%)",
        }}
      />

      <div className="relative max-w-2xl w-full px-6 sm:px-16">
        <motion.h1
          variants={fadeVariants({ delay: 0.1 })}
          initial="hidden"
          animate="show"
          className="text-4xl font-semibold text-vr-text-primary tracking-tight"
        >
          Vedanth Ramanathan
        </motion.h1>

        <motion.p
          variants={fadeVariants({ delay: 0.2 })}
          initial="hidden"
          animate="show"
          className="mt-4 text-xl font-normal text-vr-text-primary/80"
        >
          Engineering resilient platforms — from finance to civic tech.
        </motion.p>

        <motion.div
          variants={fadeVariants({ delay: 0.3 })}
          initial="hidden"
          animate="show"
          className="mt-3 h-6 flex items-center text-sm"
        >
          {typingText !== null ? (
            <span className="flex items-center gap-0.5 font-mono text-vr-text-muted">
              <span className="text-vr-text-secondary">
                {typingText} @ carnegie mellon
              </span>
              <span className="text-vr-accent motion-safe:animate-pulse select-none">
                |
              </span>
            </span>
          ) : (
            <span className="flex items-center flex-wrap gap-1 text-vr-text-muted">
              {domains.map((d, i) => (
                <span key={d} className="flex items-center gap-1">
                  {d}
                  {i < domains.length - 1 && (
                    <span className="text-vr-accent">/</span>
                  )}
                </span>
              ))}
            </span>
          )}
        </motion.div>

        <motion.div
          variants={fadeVariants({ delay: 0.5 })}
          initial="hidden"
          animate="show"
          className="mt-8 flex gap-3 items-center"
        >
          <a
            href="https://github.com/VedanthR5"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="p-2 text-vr-text-muted hover:text-vr-text-primary transition-colors duration-200"
          >
            <GithubIcon />
          </a>
          <a
            href="https://linkedin.com/in/vedanthramanathan"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="p-2 text-vr-text-muted hover:text-vr-text-primary transition-colors duration-200"
          >
            <LinkedinIcon />
          </a>
        </motion.div>
      </div>

      <motion.div
        aria-hidden="true"
        style={{ opacity: indicatorOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-px h-10 bg-vr-accent"
      />
    </section>
  );
};

export default Hero;
