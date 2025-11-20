// src/components/Hero.jsx
import { styles } from "../styles";


const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto overflow-hidden">
      {/* Animated geometric background with floating elements */}
      <div className="absolute inset-0 bg-primary">
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(147, 94, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(147, 94, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
              animation: "gridMove 20s linear infinite",
            }}
          />
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Growing tree/network visualization */}
          <div className="absolute top-1/4 right-1/4 w-64 h-64">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {/* Animated tree branches */}
              <g className="animate-pulse">
                <circle
                  cx="100"
                  cy="100"
                  r="3"
                  fill="#915EFF"
                  className="animate-ping"
                />
                <line
                  x1="100"
                  y1="100"
                  x2="120"
                  y2="80"
                  stroke="#915EFF"
                  strokeWidth="2"
                  className="animate-draw"
                />
                <line
                  x1="100"
                  y1="100"
                  x2="80"
                  y2="80"
                  stroke="#915EFF"
                  strokeWidth="2"
                  className="animate-draw delay-300"
                />
                <line
                  x1="100"
                  y1="100"
                  x2="130"
                  y2="120"
                  stroke="#915EFF"
                  strokeWidth="2"
                  className="animate-draw delay-500"
                />
                <line
                  x1="120"
                  y1="80"
                  x2="140"
                  y2="60"
                  stroke="#915EFF"
                  strokeWidth="1"
                  className="animate-draw delay-700"
                />
                <line
                  x1="80"
                  y1="80"
                  x2="60"
                  y2="60"
                  stroke="#915EFF"
                  strokeWidth="1"
                  className="animate-draw delay-900"
                />
                <circle
                  cx="140"
                  cy="60"
                  r="2"
                  fill="#915EFF"
                  className="animate-ping delay-1000"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="2"
                  fill="#915EFF"
                  className="animate-ping delay-1200"
                />
                <circle
                  cx="130"
                  cy="120"
                  r="2"
                  fill="#915EFF"
                  className="animate-ping delay-800"
                />
              </g>
            </svg>
          </div>

          {/* Floating code symbols */}
          <div className="absolute top-20 right-20 text-[#915EFF] text-2xl animate-bounce delay-1000">
            {"{ }"}
          </div>
          <div className="absolute bottom-40 right-32 text-[#915EFF] text-xl animate-bounce delay-1500">
            {"</>"}
          </div>
          <div className="absolute top-40 right-40 text-[#915EFF] text-lg animate-bounce delay-2000">
            {"[]"}
          </div>

          {/* Glowing orbs */}
          <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-[#915EFF] rounded-full animate-pulse shadow-lg shadow-[#915EFF]/50"></div>
          <div className="absolute bottom-1/3 right-1/2 w-3 h-3 bg-blue-500 rounded-full animate-pulse delay-1000 shadow-lg shadow-blue-500/50"></div>
          <div className="absolute top-1/2 right-20 w-2 h-2 bg-green-500 rounded-full animate-pulse delay-2000 shadow-lg shadow-green-500/50"></div>

          {/* Connecting lines animation */}
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <linearGradient
                id="lineGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#915EFF" stopOpacity="0" />
                <stop offset="50%" stopColor="#915EFF" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#915EFF" stopOpacity="0" />
              </linearGradient>
            </defs>
            <line
              x1="60%"
              y1="30%"
              x2="80%"
              y2="70%"
              stroke="url(#lineGradient)"
              strokeWidth="1"
              className="animate-pulse"
            />
            <line
              x1="70%"
              y1="20%"
              x2="90%"
              y2="50%"
              stroke="url(#lineGradient)"
              strokeWidth="1"
              className="animate-pulse delay-1000"
            />
          </svg>
        </div>

        {/* Gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-900/10 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-900/10 to-transparent"></div>
      </div>

      <div className="relative z-10 h-full flex items-center">
        <div className={`${styles.paddingX} max-w-7xl mx-auto w-full`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
            {/* Left: Text Content */}
            <div className="space-y-8">
              <div className="flex flex-row items-start gap-5">
                <div className="flex flex-col justify-center items-center mt-5">
                  <div className="w-5 h-5 rounded-full bg-[#915EFF] shadow-lg shadow-[#915EFF]/50 animate-pulse" />
                  <div className="w-1 h-32 violet-gradient animate-pulse" />
                </div>
                <div className="flex-1">
                  <h1
                    className={`${styles.heroHeadText} text-white drop-shadow-lg`}
                  >
                    Hi, I&apos;m{" "}
                    <span className="text-[#915EFF] animate-pulse">
                      Vedanth
                    </span>
                  </h1>
                  <p
                    className={`${styles.heroSubText} text-white-100 mt-6 drop-shadow-md`}
                  >
                    A student at{" "}
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
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 mt-6">
                <a
                  href="#about"
                  className="bg-[#915EFF]/80 backdrop-blur-sm hover:bg-[#915EFF] px-6 py-3 rounded-lg text-white font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#915EFF]/30"
                >
                  Explore Work
                </a>
                <a
                  href="https://github.com/VedanthR5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-white/30 backdrop-blur-sm hover:bg-white/10 px-6 py-3 rounded-lg text-white font-medium transition-all duration-300 hover:border-[#915EFF]"
                >
                  GitHub
                </a>
              </div>
            </div>

            {/* Right: Minimal Interactive Visual Element */}
            <div className="hidden lg:flex justify-center items-center">
              <div className="relative w-80 h-80">
                {/* Floating geometric shapes */}
                <div
                  className="absolute top-1/4 left-1/4 w-6 h-6 border-2 border-[#915EFF] rotate-45 animate-spin"
                  style={{ animationDuration: "8s" }}
                ></div>
                <div className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-blue-500/30 rounded-full animate-bounce delay-500"></div>
                <div className="absolute top-1/2 right-1/3 w-2 h-12 bg-gradient-to-b from-[#915EFF] to-transparent animate-pulse delay-1000"></div>

                {/* Hexagon pattern */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div
                      className="w-32 h-32 border border-[#915EFF]/30 transform rotate-12 animate-pulse"
                      style={{
                        clipPath:
                          "polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)",
                      }}
                    ></div>
                    <div
                      className="absolute inset-4 border border-blue-500/20 transform -rotate-12 animate-pulse delay-700"
                      style={{
                        clipPath:
                          "polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)",
                      }}
                    ></div>
                  </div>
                </div>

                {/* Code snippet floating effect */}
                <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2">
                  <div className="text-[#915EFF] text-xs font-mono opacity-60 animate-pulse delay-1500">
                    const impact = code + creativity;
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center z-20">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-white/30 backdrop-blur-sm flex justify-center items-start p-2 hover:border-[#915EFF] transition-colors duration-300">
            <div className="w-3 h-3 rounded-full bg-white mb-1 animate-bounce" />
          </div>
        </a>
      </div>

      {/* Custom CSS animations embedded */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes gridMove {
            0% { transform: translate(0, 0); }
            100% { transform: translate(50px, 50px); }
          }
          
          @keyframes draw {
            0% { stroke-dasharray: 0 100; }
            100% { stroke-dasharray: 100 0; }
          }
          
          .animate-draw {
            stroke-dasharray: 100;
            animation: draw 2s ease-in-out infinite;
          }
        `,
        }}
      />
    </section>
  );
};

export default Hero;
