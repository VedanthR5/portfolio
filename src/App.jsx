import { BrowserRouter } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

// Keep critical above-the-fold components loaded immediately - import directly to avoid canvas imports
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import About from "./components/About";
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
    <HelmetProvider>
      <BrowserRouter>
        <Helmet>
          <title>Vedanth Ramanathan</title>
          <meta
            name="description"
            content="Explore Vedanth's web and mobile projects, sustainability work, and equity-focused computer science endeavors- based in Austin, Texas"
          />
          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://vedanthramanathan.com/" />
          <meta property="og:title" content="Vedanth Ramanathan" />
          <meta
            property="og:description"
            content="Explore Vedanth's web and mobile projects, sustainability work, and equity-focused computer science endeavors- based in Austin, Texas"
          />
          <meta property="og:image" content="" />

          {/* Twitter */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta
            property="twitter:url"
            content="https://vedanthramanathan.com/"
          />
          <meta property="twitter:title" content="Vedanth Ramanathan" />
          <meta
            property="twitter:description"
            content="My Portfolio, Projects, and Activities!"
          />
          <meta property="twitter:image" content="" />
        </Helmet>
        <ScrollProgress />
        <div className="relative z-0 bg-primary">
          <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
            <Navbar />
            <Hero />
          </div>

          <About />
          <CurrentWork />

          <Works />
          <div className="relative z-0">
            <Contact />
            <StarsCanvas />
          </div>
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
