import { motion } from "framer-motion";
import PropTypes from "prop-types";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { trackProjectClick } from "../utils/analytics";
import { getSecureUrl, secureOpen } from "../utils/secureUrl";
import TypewriterHeading from "./TypewriterHeading";

const ArrowIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path d="M7 17 17 7" />
    <path d="M9 7h8v8" />
  </svg>
);

const ProjectLink = ({ project, href, label, variant = "secondary" }) => {
  const handleClick = () => {
    trackProjectClick(project.name);
    secureOpen(getSecureUrl(project.name, href));
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex min-h-[40px] items-center justify-center gap-2 rounded-full px-4 text-sm font-medium transition-colors duration-200 ${
        variant === "primary"
          ? "bg-white text-primary hover:bg-[#dfd9ff]"
          : "bg-white/[0.06] text-secondary hover:bg-white/[0.1] hover:text-white"
      }`}
    >
      {label}
      {variant === "primary" && <ArrowIcon />}
    </button>
  );
};

ProjectLink.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  href: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(["primary", "secondary"]),
};

const ProjectEntry = ({ index, project }) => {
  const primaryLink = project.demo_link || project.source_code_link;
  const isPrivate = project.private === true;

  return (
    <motion.article
      variants={fadeIn("up", "spring", index * 0.12, 0.75)}
      className="group flex min-h-[300px] flex-col justify-between border-t border-white/10 py-8 sm:min-h-[340px] sm:py-9 lg:border-t lg:border-white/10 lg:px-0"
    >
      <div>
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-secondary">
            {String(index + 1).padStart(2, "0")} / Selected Work
          </p>
          <h3 className="mt-4 text-[24px] font-semibold leading-tight text-white transition-colors duration-200 group-hover:text-[#dfd9ff] sm:text-[30px] lg:text-[34px]">
            {project.name}
          </h3>
          <p
            className="mt-4 text-[15px] leading-7 text-secondary"
            dangerouslySetInnerHTML={{ __html: project.description }}
          />

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={`${project.name}-${tag.name}`}
                className={`rounded-full bg-white/[0.055] px-3 py-1.5 text-[13px] font-medium ${tag.color}`}
              >
                #{tag.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex shrink-0 flex-wrap gap-3">
          {isPrivate ? (
            <span className="inline-flex min-h-[40px] items-center justify-center rounded-full bg-white/[0.06] px-4 text-sm font-medium text-secondary">
              Private repo
            </span>
          ) : (
            primaryLink && (
              <ProjectLink
                project={project}
                href={primaryLink}
                label={project.demo_link ? "Launch" : "Open"}
                variant="primary"
              />
            )
          )}

          {!isPrivate && project.demo_link && project.source_code_link && (
            <ProjectLink project={project} href={project.source_code_link} label="Code" />
          )}
      </div>
    </motion.article>
  );
};

ProjectEntry.propTypes = {
  index: PropTypes.number.isRequired,
  project: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
      })
    ).isRequired,
    source_code_link: PropTypes.string,
    demo_link: PropTypes.string,
    private: PropTypes.bool,
    hidden: PropTypes.bool,
  }).isRequired,
};

const Works = () => {
  const visibleProjects = projects.filter((project) => !project.hidden);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText}`}>Selected Work</p>
        <TypewriterHeading text="Projects." className={styles.sectionHeadText} />
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-5 max-w-3xl text-[16px] leading-8 text-secondary sm:text-[17px] sm:leading-[30px]"
      >
        What I&apos;ve worked on!
      </motion.p>

      <div className="mt-16 grid gap-x-12 gap-y-2 lg:grid-cols-2">
        {visibleProjects.map((project, index) => (
          <ProjectEntry key={project.name} index={index} project={project} />
        ))}
      </div>
    </>
  );
};

const WrappedWorks = SectionWrapper(Works, "projects");
WrappedWorks.displayName = "Works";

export default WrappedWorks;
