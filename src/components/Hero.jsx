// src/components/Hero.jsx
import React from "react";
import { styles } from "../styles";
import ComputersCanvas from "./canvas/Computers";

const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto overflow-hidden">
      {/* Full-screen Computer Background - positioned to the right */}
      <div className="absolute inset-0">
        <ComputersCanvas />
      </div>

      {/* Left-aligned glassmorphism text container */}
      <div
        className="relative z-10 h-full flex items-center pt-20"
        style={{ isolation: "isolate" }}
      >
        <div className={`${styles.paddingX} max-w-7xl mx-auto w-full`}>
          <div
            className="max-w-xl backdrop-blur-md bg-black/30 p-8 rounded-2xl border border-white/20 shadow-2xl mt-16 relative z-10"
            style={{ isolation: "isolate" }}
          >
            <div className="flex flex-row items-start gap-5">
              {/* Violet dot + line */}
              <div className="flex flex-col justify-center items-center mt-5">
                <div className="w-5 h-5 rounded-full bg-[#915EFF] shadow-lg shadow-[#915EFF]/50" />
                <div className="w-1 h-32 violet-gradient" />
              </div>

              {/* Your intro text */}
              <div className="flex-1">
                <h1
                  className={`${styles.heroHeadText} text-white drop-shadow-lg`}
                >
                  Hi, I'm <span className="text-[#915EFF]">Vedanth</span>
                </h1>
                <p
                  className={`${styles.heroSubText} text-white-100 mt-6 drop-shadow-md`}
                >
                  A sophomore at{" "}
                  <a
                    href="https://www.cs.cmu.edu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#915EFF] underline hover:text-white transition-colors duration-300"
                  >
                    Carnegie Mellon
                  </a>
                  <br className="sm:block hidden" />
                  interested in{" "}
                  <span className="text-[#915EFF]">education</span>,{" "}
                  <span className="text-[#915EFF]">sustainability</span>, and{" "}
                  <span className="text-[#915EFF]">equity</span> through
                  computing and markets.
                </p>

                {/* Action buttons */}
                <div className="flex gap-3 mt-6 relative z-30 isolate">
                  <a
                    href="#about"
                    className="bg-[#915EFF]/80 backdrop-blur-sm hover:bg-[#915EFF] px-4 py-2 rounded-lg text-white text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-lg relative z-30 block cursor-pointer"
                    style={{
                      pointerEvents: "auto",
                      position: "relative",
                      display: "inline-block",
                      minHeight: "36px",
                      minWidth: "60px",
                    }}
                  >
                    Explore
                  </a>
                  <a
                    href="https://github.com/VedanthR5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-white/30 backdrop-blur-sm hover:bg-white/10 px-4 py-2 rounded-lg text-white text-sm font-medium transition-all duration-300 relative z-30 block cursor-pointer"
                    style={{
                      pointerEvents: "auto",
                      position: "relative",
                      display: "inline-block",
                      minHeight: "36px",
                      minWidth: "60px",
                    }}
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center z-20">
        <a href="#about" className="relative z-20">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-white/30 backdrop-blur-sm flex justify-center items-start p-2 hover:border-[#915EFF] transition-colors duration-300">
            <div className="w-3 h-3 rounded-full bg-white mb-1 animate-bounce" />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
