import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import AnnotatedText from "./AnnotatedText";

const ServiceCard = ({ index, title, icon }) => (
  <Tilt className="xs:w-[250px] w-full ">
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card hover:shadow-2xl transition-shadow duration-300"
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col hover:bg-[#151030] transition-colors duration-300"
      >
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
  </Tilt>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[20px] max-w-3xl leading-[30px]"
      >
        <span className="text-white">
          Hey there! I'm the founder of{" "}
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
          disabilities through adaptive technology.
        </span>
        <br />
        <br />
        Beyond coding, I'm passionate about music (violin 🎻), basketball 🏀,
        and writing news for{" "}
        <AnnotatedText
          annotation="The Tartan is Carnegie Mellon's oldest and most widely read student publication, covering campus news, arts, and opinion pieces"
          citationNumber={5}
          citationUrl="https://the-tartan.org/"
        >
          The Tartan
        </AnnotatedText>
        . I'm honored to serve on the{" "}
        <AnnotatedText
          annotation="One of 12 students chosen to advise the Dean on curriculum, student life, and the future of CS education"
          citationNumber={6}
          citationUrl="https://scsbusinessoffice.cs.cmu.edu/advisory-committees/index.html"
        >
          Dean's Advisory Council
        </AnnotatedText>
        , working to shape the future of computer science education.
        <br />
        <br />
        Check out my latest work on{" "}
        <a
          href="https://github.com/VedanthR5"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#915EFF] underline font-bold hover:text-white transition-colors duration-300 githubLink"
        >
          GitHub
        </a>{" "}
        where I share everything from neural networks to full-stack
        applications.
      </motion.p>

      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
