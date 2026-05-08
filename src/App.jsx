import { BrowserRouter } from "react-router-dom";

// Keep critical above-the-fold components loaded immediately - import directly to avoid canvas imports
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Experience from "./components/Experience";
import CurrentWork from "./components/CurrentWork";
import Works from "./components/Works";
import Contact from "./components/Contact";
import StarsCanvas from "./components/canvas/Stars";
import { motion, useScroll, useSpring } from "framer-motion";

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

const App = () => {
  return (
    <BrowserRouter>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <div className="relative z-0 bg-primary">
        <Navbar />

        <main id="content">
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
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
