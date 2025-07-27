import { BrowserRouter } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Suspense, lazy } from "react";
import Loader from "./components/Loader";
import ErrorBoundary from "./components/ErrorBoundary";

// Lazy load heavy components
const About = lazy(() => import("./components/About"));
const Contact = lazy(() => import("./components/Contact"));
const Experience = lazy(() => import("./components/Experience"));
const Works = lazy(() => import("./components/Works"));
const StarsCanvas = lazy(() => import("./components/canvas/Stars"));

// Keep critical above-the-fold components loaded immediately - import directly to avoid canvas imports
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

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
        <div className="relative z-0 bg-primary">
          <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
            <Navbar />
            <Hero />
          </div>

          <About />

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
