import { motion, useScroll, useSpring } from "motion/react";
import { useEffect } from "react";

// Keep critical above-the-fold components loaded immediately - import directly to avoid canvas imports
import Hero from "./Hero";
import About from "./About";
import Experience from "./Experience";
import CurrentWork from "./CurrentWork";
import Works from "./Works";
import Contact from "./Contact";
import StarsCanvas from "./canvas/Stars";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-[#2e1065] origin-left z-50"
      style={{ scaleX }}
    />
  );
};

export default function Home() {
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
  }, []);
  return <>
    <ScrollProgress />
          <div className="bg-hero-pattern bg-cover bg-center bg-no-repeat">
            <Hero />
          </div>
          <About />
          <Experience />
          <CurrentWork />
          <Works />
          <div className="relative z-0">
            <Contact />
            <StarsCanvas />
          </div>
  </>;
}
