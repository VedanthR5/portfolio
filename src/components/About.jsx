import { motion } from "framer-motion";
import PropTypes from "prop-types";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import AnnotatedText from "./AnnotatedText";
import TypewriterHeading from "./TypewriterHeading";

const ServiceCard = ({ index, title, icon }) => (
  <div className="w-[220px] sm:w-[240px] lg:w-[260px] shrink-0">
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col hover:bg-[#151030] transition-colors duration-300">
        <img
          src={icon}
          alt="web-development"
          className="w-16 h-16 object-contain hover:scale-110 transition-transform duration-300"
        />

        <h3 className="text-white text-[20px] font-bold text-center hover:text-[#915EFF] transition-colors duration-300">
          {title}
        </h3>
      </div>
    </motion.div>
  </div>
);

ServiceCard.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <TypewriterHeading text="Overview." className={styles.sectionHeadText} />
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 max-w-3xl text-[17px] leading-8 text-secondary sm:text-[20px] sm:leading-[30px]"
      >
        <span className="text-white">
          Hey there! I&apos;m the founder of{" "}
          <AnnotatedText
            annotation="We're building adaptive learning tools that help students with dyslexia, ADHD, and other learning differences succeed in STEM"
            citationNumber={4}
            citationUrl="https://www.computely.org"
          >
            <a
              href="https://www.computely.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#915EFF] underline font-bold hover:text-white transition-colors duration-300"
            >
              Computely
            </a>
          </AnnotatedText>
          , a venture democratizing learning for students with learning
          disabilities through adaptive technology. I&apos;m also a TA for{" "}
          <AnnotatedText
            annotation="16-385, or Computer Vision, is CMU's primary vision offering for undergraduates"
            citationNumber={5}
            citationUrl="https://16385.courses.cs.cmu.edu/"
          >
            Computer Vision (16-385)
          </AnnotatedText>
          .
        </span>
        <br />
        <br />
        Beyond coding, I&apos;m passionate about music (violin), basketball, and writing news for{" "}
        <AnnotatedText
          annotation="The Tartan is Carnegie Mellon's oldest and most widely read student publication, covering campus news, arts, and opinion pieces"
          citationNumber={6}
          citationUrl="https://the-tartan.org/"
        >
          The Tartan
        </AnnotatedText>
        . I&apos;m honored to serve on the{" "}
        <AnnotatedText
          annotation="One of 12 students chosen to advise the Dean on curriculum, student life, and the future of CS education"
          citationNumber={7}
          citationUrl="https://scsbusinessoffice.cs.cmu.edu/advisory-committees/index.html"
        >
          SCS Dean&apos;s Advisory Council
        </AnnotatedText>
        , working to shape the future of computer science education.
        <br />
        <br />
      </motion.p>

      <div className="custom-scroll mt-12 flex flex-nowrap gap-6 overflow-x-auto pb-4 sm:mt-20">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

const WrappedAbout = SectionWrapper(About, "about");
WrappedAbout.displayName = "About";

export default WrappedAbout;
