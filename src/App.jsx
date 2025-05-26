import { BrowserRouter } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import {
  About,
  Contact,
  Experience,
  Hero,
  Navbar,
  Works,
  StarsCanvas,
  ComputersCanvas,
} from "./components";

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
