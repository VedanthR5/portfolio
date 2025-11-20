import { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

//nhI9A00KxsAU273Rr
//template_129z3c4
// service_kz9delta
//
const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    //nhI9A00KxsAU273Rr
    //template_129z3c4
    // service_kz9delta
    emailjs
      .send(
        "service_kz9delta",
        "template_129z3c4",

        {
          from_name: form.name,
          to_name: "Vedanth Ramanathan",
          from_email: form.email,
          to_email: "vedanth.ramanathan@gmail.com",
          message: form.message,
        },
        "nhI9A00KxsAU273Rr"
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you! I will get back to you as soon as possible.");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          alert(
            "Uh oh, something went wrong. Please try again or email me directly at vedanth.ramanathan@gmail.com"
          );
        }
      );
  };

  return (
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name here"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email address?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Message</span>
            <textarea
              rows={7}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What you want to say?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>

          <button
            type="submit"
            className="bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary hover:bg-white hover:text-black active:bg-dark-tertiary transition-colors duration-300"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px] relative overflow-hidden"
      >
        {/* Network Animation Canvas - Cleaner Layout */}
        <div className="absolute inset-0">
          {/* Simplified Grid Background */}
          <div className="absolute inset-0 opacity-8">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(147, 94, 255, 0.06) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(147, 94, 255, 0.06) 1px, transparent 1px)
                `,
                backgroundSize: "80px 80px",
                animation: "networkPulse 35s linear infinite",
              }}
            />
          </div>

          {/* Expanded Network Graph - Professional Spanning Tree Layout */}
          <div className="absolute inset-0">
            {/* Austin, TX - Central Command Hub */}
            <div className="absolute" style={{ top: "50%", left: "50%" }}>
              <div className="relative group cursor-pointer transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-10 h-10 bg-gradient-to-r from-[#915EFF] to-purple-600 rounded-full animate-pulse shadow-xl shadow-[#915EFF]/60 border-3 border-white/25">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-spin-slow"></div>
                </div>
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 text-base font-bold text-[#915EFF] font-mono opacity-90 whitespace-nowrap">
                  Austin
                </div>
                <div className="absolute inset-0 w-10 h-10 bg-[#915EFF]/20 rounded-full animate-ping"></div>
              </div>
            </div>

            {/* CMU, Pittsburgh, PA */}
            <div className="absolute" style={{ top: "23%", left: "72%" }}>
              <div className="relative group cursor-pointer">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full animate-pulse delay-500 shadow-lg shadow-blue-500/50 border-2 border-white/20"></div>
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-sm font-semibold text-blue-400 font-mono opacity-85 whitespace-nowrap">
                  CMU
                </div>
                <div className="absolute inset-0 w-8 h-8 bg-blue-500/20 rounded-full animate-ping delay-500"></div>
              </div>
            </div>

            {/* QUANT Node */}
            <div className="absolute" style={{ top: "23%", left: "23%" }}>
              <div className="relative group cursor-pointer">
                <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 via-teal-500 to-green-600 rounded-full animate-pulse delay-800 shadow-xl shadow-emerald-500/60 border-3 border-white/30">
                  <div className="absolute inset-1 bg-gradient-to-br from-emerald-300/30 to-transparent rounded-full animate-spin-slow"></div>
                </div>
                <div className="absolute -top-11 left-1/2 transform -translate-x-1/2 text-sm font-bold text-emerald-400 font-mono opacity-90 whitespace-nowrap">
                  Quant
                </div>
                <div className="absolute inset-0 w-9 h-9 bg-emerald-500/30 rounded-full animate-ping delay-800"></div>
              </div>
            </div>

            {/* React.js Hub */}
            <div className="absolute" style={{ top: "72%", left: "23%" }}>
              <div className="relative group cursor-pointer">
                <div className="w-7 h-7 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse delay-1000 shadow-lg shadow-cyan-500/50 border-2 border-white/25"></div>
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-sm font-semibold text-cyan-400 font-mono opacity-85 whitespace-nowrap">
                  React
                </div>
                <div className="absolute inset-0 w-7 h-7 bg-cyan-500/20 rounded-full animate-ping delay-1000"></div>
              </div>
            </div>

            {/* AI/ML Interest Node */}
            <div className="absolute" style={{ top: "72%", left: "73%" }}>
              <div className="relative group cursor-pointer">
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 via-lime-500 to-emerald-600 rounded-full animate-pulse delay-700 shadow-lg shadow-green-500/60 border-2 border-white/25"></div>
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-sm font-semibold text-green-400 font-mono opacity-85 whitespace-nowrap">
                  AI/ML
                </div>
                <div className="absolute inset-0 w-8 h-8 bg-green-500/20 rounded-full animate-ping delay-700"></div>
              </div>
            </div>

            {/* Projects Node */}
            <div className="absolute" style={{ top: "88%", left: "50%" }}>
              <div className="relative group cursor-pointer transform -translate-x-1/2">
                <div className="w-7 h-7 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse delay-300 shadow-lg shadow-yellow-500/50 border-2 border-white/20"></div>
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-sm font-semibold text-yellow-400 font-mono opacity-85 whitespace-nowrap">
                  Projects
                </div>
                <div className="absolute inset-0 w-7 h-7 bg-yellow-500/20 rounded-full animate-ping delay-300"></div>
              </div>
            </div>

            {/* Enhanced Network - Spanning Tree + Additional Connections */}
            <svg className="absolute inset-0 w-full h-full">
              <defs>
                <linearGradient
                  id="spanningGradient1"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#915EFF" stopOpacity="0" />
                  <stop offset="50%" stopColor="#915EFF" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#915EFF" stopOpacity="0" />
                </linearGradient>
                <linearGradient
                  id="spanningGradient2"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0" />
                  <stop offset="50%" stopColor="#10B981" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                </linearGradient>
                <linearGradient
                  id="spanningGradient3"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0" />
                  <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                </linearGradient>
                <linearGradient
                  id="spanningGradient4"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#06B6D4" stopOpacity="0" />
                  <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
                </linearGradient>
                <linearGradient
                  id="spanningGradient5"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity="0" />
                  <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
                </linearGradient>
                <linearGradient
                  id="spanningGradient6"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#EC4899" stopOpacity="0" />
                  <stop offset="50%" stopColor="#EC4899" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#EC4899" stopOpacity="0" />
                </linearGradient>
                <linearGradient
                  id="spanningGradient7"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0" />
                  <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Original Spanning Tree Edges */}
              {/* Edge 1: Austin (50%, 50%) -> Pittsburgh (75%, 25%) */}
              <line
                x1="50%"
                y1="50%"
                x2="75%"
                y2="25%"
                stroke="url(#spanningGradient3)"
                strokeWidth="3"
                className="animate-pulse"
                strokeDasharray="8,4"
              />

              {/* Edge 2: Austin (50%, 50%) -> Quant (25%, 25%) */}
              <line
                x1="50%"
                y1="50%"
                x2="25%"
                y2="25%"
                stroke="url(#spanningGradient2)"
                strokeWidth="3"
                className="animate-pulse delay-500"
                strokeDasharray="8,4"
              />

              {/* Edge 3: Austin (50%, 50%) -> Projects (50%, 90%) */}
              <line
                x1="50%"
                y1="50%"
                x2="50%"
                y2="90%"
                stroke="url(#spanningGradient5)"
                strokeWidth="3"
                className="animate-pulse delay-1000"
                strokeDasharray="8,4"
              />

              {/* Edge 4: Quant (25%, 25%) -> React (25%, 75%) */}
              <line
                x1="25%"
                y1="25%"
                x2="25%"
                y2="75%"
                stroke="url(#spanningGradient4)"
                strokeWidth="3"
                className="animate-pulse delay-700"
                strokeDasharray="8,4"
              />

              {/* Edge 5: Pittsburgh (75%, 25%) -> AI/ML (75%, 75%) */}
              <line
                x1="75%"
                y1="25%"
                x2="75%"
                y2="75%"
                stroke="url(#spanningGradient1)"
                strokeWidth="3"
                className="animate-pulse delay-1200"
                strokeDasharray="8,4"
              />

              {/* NEW REQUESTED EDGES */}
              {/* Austin (50%, 50%) -> React (25%, 75%) */}
              <line
                x1="50%"
                y1="50%"
                x2="25%"
                y2="75%"
                stroke="url(#spanningGradient6)"
                strokeWidth="2.5"
                className="animate-pulse delay-300"
                strokeDasharray="6,6"
                opacity="0.8"
              />

              {/* Austin (50%, 50%) -> AI/ML (75%, 75%) */}
              <line
                x1="50%"
                y1="50%"
                x2="75%"
                y2="75%"
                stroke="url(#spanningGradient7)"
                strokeWidth="2.5"
                className="animate-pulse delay-800"
                strokeDasharray="6,6"
                opacity="0.8"
              />

              {/* Projects (50%, 90%) -> AI/ML (75%, 75%) */}
              <line
                x1="50%"
                y1="90%"
                x2="75%"
                y2="75%"
                stroke="url(#spanningGradient6)"
                strokeWidth="2.5"
                className="animate-pulse delay-1400"
                strokeDasharray="6,6"
                opacity="0.8"
              />

              {/* Projects (50%, 90%) -> React (25%, 75%) */}
              <line
                x1="50%"
                y1="90%"
                x2="25%"
                y2="75%"
                stroke="url(#spanningGradient7)"
                strokeWidth="2.5"
                className="animate-pulse delay-600"
                strokeDasharray="6,6"
                opacity="0.8"
              />

              {/* Quant (25%, 25%) -> Pittsburgh (75%, 25%) - Solid Color Styled */}
              <line
                x1="25%"
                y1="25%"
                x2="75%"
                y2="25%"
                stroke="#10B981"
                strokeWidth="3"
                className="animate-pulse delay-900"
                strokeDasharray="8,6"
                opacity="0.8"
              />

              {/* AI/ML (75%, 75%) -> Pittsburgh (75%, 25%) - Solid Color Styled */}
              <line
                x1="75%"
                y1="75%"
                x2="75%"
                y2="25%"
                stroke="#EC4899"
                strokeWidth="3"
                className="animate-pulse delay-1100"
                strokeDasharray="6,8"
                opacity="0.8"
              />
            </svg>

            {/* Enhanced Data Flow Along Spanning Tree */}
            <div className="absolute" style={{ top: "50%", left: "50%" }}>
              <div
                className="absolute w-3 h-3 bg-white rounded-full shadow-lg"
                style={{ animation: "spanningFlow1 6s linear infinite" }}
              ></div>
              <div
                className="absolute w-2.5 h-2.5 bg-emerald-400 rounded-full shadow-lg delay-1000"
                style={{ animation: "spanningFlow2 5s linear infinite" }}
              ></div>
              <div
                className="absolute w-2 h-2 bg-blue-400 rounded-full shadow-lg delay-2000"
                style={{ animation: "spanningFlow3 7s linear infinite" }}
              ></div>
            </div>

            {/* Repositioned Tech Stack Labels */}
            <div className="absolute top-16 right-16 text-[#915EFF]/70 text-lg font-mono font-semibold">
              AI/ML
            </div>
            <div className="absolute bottom-16 left-16 text-emerald-500/70 text-lg font-mono font-semibold">
              Quant
            </div>

            {/* Repositioned Status Indicator */}
            <div className="absolute top-8 right-8 flex items-center space-x-2 text-sm text-[#915EFF]/80 font-mono">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span>ACTIVE</span>
            </div>
          </div>
        </div>

        {/* CSS Animations*/}
        <style
          dangerouslySetInnerHTML={{
            __html: `
            @keyframes networkPulse {
              0%, 100% { transform: scale(1); opacity: 0.08; }
              50% { transform: scale(1.03); opacity: 0.15; }
            }
            
            @keyframes spanningFlow1 {
              0% { transform: translate(0, 0) scale(1); opacity: 1; }
              20% { transform: translate(125px, -125px) scale(1.2); opacity: 0.8; }
              40% { transform: translate(-125px, -125px) scale(0.9); opacity: 0.7; }
              60% { transform: translate(0, 200px) scale(1.1); opacity: 0.6; }
              80% { transform: translate(-125px, 125px) scale(0.8); opacity: 0.8; }
              100% { transform: translate(0, 0) scale(1); opacity: 1; }
            }
            
            @keyframes spanningFlow2 {
              0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
              25% { transform: translate(-125px, -125px) rotate(90deg); opacity: 0.8; }
              50% { transform: translate(-125px, 125px) rotate(180deg); opacity: 0.7; }
              75% { transform: translate(125px, -125px) rotate(270deg); opacity: 0.8; }
              100% { transform: translate(0, 0) rotate(360deg); opacity: 1; }
            }
            
            @keyframes spanningFlow3 {
              0% { transform: translate(0, 0); opacity: 1; }
              33% { transform: translate(125px, 125px); opacity: 0.8; }
              66% { transform: translate(0, 200px); opacity: 0.7; }
              100% { transform: translate(0, 0); opacity: 1; }
            }

            @keyframes spin-slow {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }

            .animate-spin-slow {
              animation: spin-slow 3s linear infinite;
            }

            @keyframes gradient-radial {
              0%, 100% { background: radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%); }
              50% { background: radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 50%); }
            }

            @media (max-width: 768px) {
              .absolute[style*="top:"] {
                font-size: 0.7rem;
              }
              
              .absolute[style*="Austin"], .absolute[style*="Pittsburgh"] {
                transform: scale(0.9);
              }
              
              /* Mobile-optimized animations */
              @keyframes epicDataFlow1 {
                0%, 100% { transform: translate(0, 0) scale(0.8); opacity: 1; }
                50% { transform: translate(40px, 60px) scale(1); opacity: 0.7; }
              }
            }
          `,
          }}
        />
      </motion.div>
    </div>
  );
};

const WrappedContact = SectionWrapper(Contact, "contact");
WrappedContact.displayName = "Contact";

export default WrappedContact;
