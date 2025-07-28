import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

import { styles } from "../styles";
import { click } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import AnnotatedText from "./AnnotatedText";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
}) => {
  // Function to add annotations to specific project descriptions
  const renderDescription = (name, description) => {
    switch (name) {
      case "FoodCycle App":
        return (
          <>
            🏆 WINNER of{" "}
            <AnnotatedText
              annotation="Annual contest where students compete to create apps addressing community issues. Recognized by U.S. House of Representatives."
              citationNumber={7}
              citationUrl="https://www.congressionalappchallenge.us/23-tx37/"
            >
              Congressional App Challenge (TX-37)
            </AnnotatedText>{" "}
            - Revolutionary app reducing food waste in supermarkets through
            smart inventory management. Featured by ABC, NBC, and Central Texas
            Food Bank. Full-stack React Native app with AWS backend.
          </>
        );
      case "DDoS Attack Detection using Neural Networks":
        return (
          <>
            Award-winning science fair project detecting{" "}
            <AnnotatedText
              annotation="Distributed Denial of Service attacks - coordinated attempts to overwhelm a network or service by flooding it with traffic"
              citationNumber={8}
            >
              DDoS attacks
            </AnnotatedText>{" "}
            on edge devices using machine learning. Won US Army and Navy
            Excellence Awards, placed 3rd overall. Achieved 97.6% accuracy using
            Python, TensorFlow, and custom neural network architecture.
          </>
        );
      case "DOD Cybersecurity Windows 10 Hardening Scripts":
        return (
          <>
            Professional-grade PowerShell and Batch scripts for{" "}
            <AnnotatedText
              annotation="National youth cybersecurity competition where teams secure Windows/Linux systems against simulated attacks"
              citationNumber={9}
              citationUrl="https://www.uscyberpatriot.org/"
            >
              CyberPatriot XIV competition
            </AnnotatedText>
            , aligned with{" "}
            <AnnotatedText
              annotation="U.S. Department of Defense cybersecurity guidelines for government systems"
              citationNumber={10}
            >
              Department of Defense cybersecurity standards.
            </AnnotatedText>
            Automates Windows 10 security hardening, vulnerability patching, and
            system optimization.
          </>
        );
      case "Neural Network for Skin Cancer Detection":
        return (
          <>
            Advanced deep learning model using Keras and PyTorch on the{" "}
            <AnnotatedText
              annotation="Large collection of 10,015 dermatoscopic images used for training machine learning models to detect skin cancer"
              citationNumber={11}
              citationUrl="https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/DBW86T"
            >
              HAM10000 dataset
            </AnnotatedText>{" "}
            to detect skin cancer with high accuracy. Features custom CNN
            architecture, data augmentation, and comprehensive evaluation
            metrics for melanoma classification.
          </>
        );
      default:
        return description;
    }
  };

  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full hover:shadow-2xl transition-shadow duration-300"
      >
        <div className="relative w-full h-[230px] group">
          <img
            src={image}
            alt="project_image"
            className="w-full h-full object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105"
          />

          <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer hover:scale-110 transition-transform duration-300"
            >
              <img
                src={click}
                alt="source code"
                className="w-1/2 h-1/2 object-contain"
              />
            </div>
          </div>
        </div>

        <div className="mt-5">
          <h3 className="text-white font-bold text-[24px] hover:text-[#915EFF] transition-colors duration-300">
            {name}
          </h3>
          <p className="mt-2 text-secondary text-[14px] leading-relaxed">
            {renderDescription(name, description)}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <p
              key={`${name}-${tag.name}`}
              className={`text-[14px] ${tag.color} font-medium`}
            >
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

ProjectCard.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
  image: PropTypes.string.isRequired,
  source_code_link: PropTypes.string.isRequired,
};

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} `}>My Portfolio</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          These projects showcase my passion for solving real-world problems
          through technology. From{" "}
          <AnnotatedText
            annotation="My neural network for skin cancer detection won awards at science fairs and has real medical applications"
            citationNumber={1}
            citationUrl="https://jumpshare.com/share/ENaTgDliEHGVtNfJuTNk"
          >
            award-winning neural networks
          </AnnotatedText>{" "}
          and{" "}
          <AnnotatedText
            annotation="FoodCycle won the Congressional App Challenge and was featured on major news outlets"
            citationNumber={2}
            citationUrl="https://www.kxan.com/news/local/austin/four-teens-get-u-s-recognition-for-app-development-on-food-waste-and-insecurity/"
          >
            mobile apps
          </AnnotatedText>{" "}
          to cybersecurity research and{" "}
          <AnnotatedText
            annotation="Austin Divided magazine tackled serious urban planning issues through investigative journalism"
            citationNumber={3}
            citationUrl="https://issuu.com/lasaezine/docs/austin_divided"
          >
            social impact journalism
          </AnnotatedText>
          , each project represents my commitment to using computing for
          positive change. Click the icons to explore the code, research papers,
          and live demos.
        </motion.p>
      </div>

      <div className="mt-20 flex flex-wrap gap-7">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

const WrappedWorks = SectionWrapper(Works, "");
WrappedWorks.displayName = "Works";

export default WrappedWorks;
