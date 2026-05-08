import { motion, useScroll, useSpring } from "framer-motion";
import PropTypes from "prop-types";
import { useRef } from "react";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import TypewriterHeading from "./TypewriterHeading";

const getInitials = (companyName) =>
  companyName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2);

const LogoSlot = ({ logo, companyName }) => (
  <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] shadow-[0_0_30px_rgba(99,102,241,0.12)] backdrop-blur">
    {logo ? (
      <img
        src={logo}
        alt={`${companyName} logo`}
        className="h-10 w-10 rounded-xl bg-white/95 p-1.5 object-contain shadow-sm"
        loading="lazy"
      />
    ) : (
      <span className="font-mono text-sm font-semibold text-white/80">
        {getInitials(companyName)}
      </span>
    )}
  </div>
);

LogoSlot.propTypes = {
  logo: PropTypes.string,
  companyName: PropTypes.string.isRequired,
};

const ExperienceItem = ({ experience, index }) => {
  const isLeft = index % 2 === 0;

  return (
    <motion.li
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="group relative mb-14 last:mb-0 md:min-h-[170px]"
    >
      <div className="absolute left-[1.7rem] top-7 hidden h-px w-[calc(50%-1.7rem)] bg-gradient-to-l from-white/15 to-transparent md:block" />
      <div className="absolute left-[1.7rem] top-7 h-px w-10 bg-gradient-to-r from-white/20 to-transparent md:left-1/2 md:w-12 md:-translate-x-1/2" />

      <div
        className={`flex gap-5 pl-14 md:w-[calc(50%-3.5rem)] md:pl-0 ${
          isLeft ? "md:mr-auto md:flex-row-reverse md:text-right" : "md:ml-auto md:flex-row md:text-left"
        }`}
      >
        <LogoSlot logo={experience.logo} companyName={experience.company_name} />

        <div className="rounded-3xl px-1 py-1 transition-colors duration-300 group-hover:bg-white/[0.025] md:px-4 md:py-3">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-secondary">
            {experience.date}
          </p>
          <h3 className="mt-3 text-[22px] font-semibold leading-tight text-white">
            {experience.website ? (
              <a
                href={experience.website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 transition-colors duration-200 hover:text-[#dfd9ff]"
              >
                {experience.company_name}
                <svg
                  width={15}
                  height={15}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                  className="text-[#dfd9ff]/80"
                >
                  <path d="M7 17 17 7" />
                  <path d="M9 7h8v8" />
                </svg>
              </a>
            ) : (
              experience.company_name
            )}
          </h3>
          <p className="mt-1 text-sm font-medium text-[#dfd9ff]">{experience.title}</p>
          <p className="mt-4 text-[15px] leading-7 text-secondary">
            {experience.summary}
          </p>
        </div>
      </div>

      <span className="absolute left-6 top-6 z-10 h-3 w-3 rounded-full border border-[#915EFF]/80 bg-primary shadow-[0_0_0_7px_rgba(145,94,255,0.08),0_0_30px_rgba(145,94,255,0.35)] transition-transform duration-300 group-hover:scale-125 md:left-1/2 md:-translate-x-1/2" />
    </motion.li>
  );
};

ExperienceItem.propTypes = {
  experience: PropTypes.shape({
    title: PropTypes.string.isRequired,
    company_name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    logo: PropTypes.string,
    website: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

const Experience = () => {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 35%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <>
      <motion.div>
        <p className={styles.sectionSubText}>Where I&apos;ve built</p>
        <TypewriterHeading text="Experience." className={styles.sectionHeadText} />
      </motion.div>

      <div ref={timelineRef} className="relative mt-20">
        <div className="absolute bottom-6 left-7 top-7 w-px overflow-hidden rounded-full bg-white/10 md:left-1/2 md:-translate-x-1/2">
          <motion.div
            className="h-full w-full origin-top rounded-full bg-gradient-to-b from-[#915EFF] via-white/60 to-[#915EFF]/20"
            style={{ scaleY }}
          />
        </div>

        <ol className="relative">
          {experiences.map((experience, index) => (
            <ExperienceItem
              key={`${experience.company_name}-${experience.title}`}
              experience={experience}
              index={index}
            />
          ))}
        </ol>
      </div>
    </>
  );
};

const WrappedExperience = SectionWrapper(Experience, "experience");
WrappedExperience.displayName = "Experience";

export default WrappedExperience;
