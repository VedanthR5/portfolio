import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import { logo } from "../assets";

const GithubIcon = () => (
  <svg
    width={18}
    height={18}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg
    width={18}
    height={18}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const interestNodes = [
  {
    id: "core",
    label: "Logo",
    image: logo,
    x: 50,
    y: 50,
    size: "h-14 w-14 md:h-16 md:w-16",
    hideLabel: true,
    orb: {
      background:
        "linear-gradient(145deg, rgba(255,255,255,0.96), rgba(203,213,255,0.72) 42%, rgba(145,94,255,0.35))",
      boxShadow:
        "0 0 58px rgba(145, 94, 255, 0.58), 0 0 18px rgba(255, 255, 255, 0.18), inset 0 0 18px rgba(255, 255, 255, 0.32)",
      animationDelay: "0s",
    },
  },
  {
    id: "systems",
    label: "Systems",
    x: 23,
    y: 25,
    size: "h-9 w-9 md:h-10 md:w-10",
    labelOffset: "-top-10",
    orb: {
      background:
        "radial-gradient(circle at 35% 30%, #eef2ff 0%, #9caeff 44%, #24305f 100%)",
      boxShadow: "0 0 34px rgba(156, 174, 255, 0.34)",
      animationDelay: "0.2s",
    },
  },
  {
    id: "security",
    label: "Security",
    x: 75,
    y: 27,
    size: "h-10 w-10 md:h-11 md:w-11",
    labelOffset: "-top-10",
    orb: {
      background:
        "radial-gradient(circle at 30% 26%, #ffffff 0%, #b9c4ff 38%, #39407d 100%)",
      boxShadow: "0 0 42px rgba(185, 196, 255, 0.4)",
      animationDelay: "0.45s",
    },
  },
  {
    id: "politics",
    label: "Politics",
    x: 25,
    y: 75,
    size: "h-9 w-9 md:h-10 md:w-10",
    labelOffset: "-top-10",
    orb: {
      background:
        "radial-gradient(circle at 34% 28%, #f8f8ff 0%, #a7b3ff 42%, #252845 100%)",
      boxShadow: "0 0 36px rgba(167, 179, 255, 0.32)",
      animationDelay: "0.7s",
    },
  },
  {
    id: "ai",
    label: "AI",
    x: 74,
    y: 74,
    size: "h-9 w-9 md:h-10 md:w-10",
    labelOffset: "-top-10",
    orb: {
      background:
        "radial-gradient(circle at 35% 30%, #f4f7ff 0%, #8f9eff 42%, #20284d 100%)",
      boxShadow: "0 0 34px rgba(143, 158, 255, 0.32)",
      animationDelay: "0.95s",
    },
  },
  {
    id: "quant",
    label: "Quant",
    x: 50,
    y: 86,
    size: "h-8 w-8 md:h-9 md:w-9",
    labelOffset: "-top-10",
    orb: {
      background:
        "radial-gradient(circle at 35% 30%, #f6f7ff 0%, #aeb8ff 44%, #20233f 100%)",
      boxShadow: "0 0 30px rgba(174, 184, 255, 0.28)",
      animationDelay: "1.15s",
    },
  },
  {
    id: "civic",
    label: "Civic Tech",
    x: 50,
    y: 17,
    size: "h-8 w-8 md:h-9 md:w-9",
    labelOffset: "-top-10",
    orb: {
      background:
        "radial-gradient(circle at 35% 30%, #ffffff 0%, #b8c3ff 42%, #1d2448 100%)",
      boxShadow: "0 0 30px rgba(184, 195, 255, 0.3)",
      animationDelay: "1.35s",
    },
  },
];

const interestEdges = [
  ["core", "systems", "primary"],
  ["core", "security", "primary"],
  ["core", "politics", "primary"],
  ["core", "ai", "primary"],
  ["core", "quant", "secondary"],
  ["core", "civic", "secondary"],
  ["systems", "security", "secondary"],
  ["security", "ai", "secondary"],
  ["politics", "civic", "secondary"],
  ["politics", "systems", "secondary"],
  ["quant", "systems", "secondary"],
  ["civic", "security", "secondary"],
];

const nodeById = Object.fromEntries(interestNodes.map((node) => [node.id, node]));

const graphSignals = [
  { from: "systems", to: "core", delay: 0.1, duration: 4.2, size: 0.5, opacity: 0.96 },
  { from: "core", to: "security", delay: 0.7, duration: 2.8, size: 0.36, opacity: 0.98 },
  { from: "politics", to: "core", delay: 2.1, duration: 8.6, size: 0.42, opacity: 0.74 },
  { from: "core", to: "ai", delay: 0.8, duration: 3.3, size: 0.46, opacity: 0.92 },
  { from: "quant", to: "systems", delay: 3.2, duration: 11.4, size: 0.34, opacity: 0.62 },
  { from: "civic", to: "security", delay: 4.1, duration: 6.9, size: 0.44, opacity: 0.82 },
  { from: "systems", to: "security", delay: 1.4, duration: 2.35, size: 0.3, opacity: 1 },
  { from: "politics", to: "civic", delay: 5.4, duration: 12.2, size: 0.38, opacity: 0.58 },
  { from: "security", to: "ai", delay: 2.6, duration: 3.05, size: 0.28, opacity: 0.95 },
  { from: "core", to: "civic", delay: 1.8, duration: 9.8, size: 0.32, opacity: 0.68 },
];

const emailConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (form.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (honeypot !== "") return;

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    setIsSuccess(false);
    setIsError(false);

    emailjs
      .send(
        emailConfig.serviceId,
        emailConfig.templateId,
        {
          from_name: form.name,
          to_name: "Vedanth Ramanathan",
          from_email: form.email,
          to_email: "vedanth.ramanathan@gmail.com",
          message: form.message,
        },
        emailConfig.publicKey
      )
      .then(
        () => {
          setLoading(false);
          setIsSuccess(true);
          setForm({ name: "", email: "", message: "" });
        },
        (error) => {
          setLoading(false);
          setIsError(true);
          console.error("EmailJS error:", error.status, error.text);
        }
      );
  };

  return (
    <div className="xl:mt-12 flex flex-col gap-8 overflow-hidden xl:flex-row xl:items-stretch">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.76] rounded-[2rem] border border-white/10 bg-[#05060d]/95 p-5 shadow-[0_28px_90px_rgba(0,0,0,0.55)] backdrop-blur sm:p-7 md:p-8"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="thanks"
              role="status"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="mt-12 rounded-[1.6rem] border border-white/10 bg-white/[0.045] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
            >
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#cbd5ff]/75">
                Message sent
              </p>
              <h4 className="mt-4 text-3xl font-semibold leading-tight text-white">
                Thank you.
              </h4>
              <p className="mt-4 text-[15px] leading-7 text-secondary">
                I&apos;ll get back to you soon. In the meantime, explore my site
                or connect with me directly.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#about"
                  className="inline-flex min-h-[42px] items-center justify-center rounded-full border border-white/15 bg-[#eef1ff] px-5 text-sm font-bold text-[#050816] transition duration-300 hover:-translate-y-0.5 hover:bg-white"
                >
                  Explore my site
                </a>
                <a
                  href="https://github.com/VedanthR5"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub profile"
                  className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-5 text-sm font-semibold text-[#e8ebff] transition duration-300 hover:-translate-y-0.5 hover:bg-white/[0.1]"
                >
                  <GithubIcon />
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/vedanthramanathan"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn profile"
                  className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-5 text-sm font-semibold text-[#e8ebff] transition duration-300 hover:-translate-y-0.5 hover:bg-white/[0.1]"
                >
                  <LinkedinIcon />
                  LinkedIn
                </a>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              aria-label="Contact form"
              noValidate
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -12 }}
              className="mt-12 flex flex-col gap-7"
            >
              <input
                type="text"
                name="bot-field"
                aria-hidden="true"
                tabIndex={-1}
                className="hidden"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
              <label className="flex flex-col">
                <span className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#c8cdf7]/80">
                  Your Name
                </span>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name here"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  disabled={loading}
                  className="rounded-2xl border border-white/10 bg-[#090b16]/90 px-5 py-4 font-medium text-white outline-none transition duration-300 placeholder:text-[#737997] focus:border-[#aeb8ff]/60 focus:bg-[#0d1020] focus:shadow-[0_0_0_4px_rgba(145,94,255,0.14)]"
                />
                {errors.name && (
                  <span id="name-error" className="mt-2 text-sm text-[#f2aac4]">
                    {errors.name}
                  </span>
                )}
              </label>
              <label className="flex flex-col">
                <span className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#c8cdf7]/80">
                  Your Email
                </span>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="What's your email address?"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  disabled={loading}
                  className="rounded-2xl border border-white/10 bg-[#090b16]/90 px-5 py-4 font-medium text-white outline-none transition duration-300 placeholder:text-[#737997] focus:border-[#aeb8ff]/60 focus:bg-[#0d1020] focus:shadow-[0_0_0_4px_rgba(145,94,255,0.14)]"
                />
                {errors.email && (
                  <span id="email-error" className="mt-2 text-sm text-[#f2aac4]">
                    {errors.email}
                  </span>
                )}
              </label>
              <label className="flex flex-col">
                <span className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#c8cdf7]/80">
                  Your Message
                </span>
                <textarea
                  id="message"
                  rows={7}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="What do you want to reach out about?"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  disabled={loading}
                  className="resize-none rounded-2xl border border-white/10 bg-[#090b16]/90 px-5 py-4 font-medium text-white outline-none transition duration-300 placeholder:text-[#737997] focus:border-[#aeb8ff]/60 focus:bg-[#0d1020] focus:shadow-[0_0_0_4px_rgba(145,94,255,0.14)]"
                />
                {errors.message && (
                  <span id="message-error" className="mt-2 text-sm text-[#f2aac4]">
                    {errors.message}
                  </span>
                )}
              </label>

              <button
                type="submit"
                disabled={loading}
                className="w-fit rounded-full border border-white/15 bg-[#eef1ff] px-8 py-3.5 font-bold text-[#050816] shadow-[0_18px_50px_rgba(174,184,255,0.24)] outline-none transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_22px_60px_rgba(174,184,255,0.34)]"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

              {isError && (
                <motion.p
                  key="error"
                  role="alert"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="text-sm text-[#f2aac4]"
                >
                  Something went wrong. Try again or email me directly.
                </motion.p>
              )}
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="relative min-h-[340px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#03040a] shadow-[0_32px_110px_rgba(0,0,0,0.68)] sm:min-h-[430px] md:min-h-[560px] xl:flex-1"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 47%, rgba(145, 94, 255, 0.22), transparent 33%), radial-gradient(circle at 80% 18%, rgba(174, 184, 255, 0.13), transparent 28%), linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.015) 38%, rgba(145,94,255,0.08))",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(214,220,255,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(214,220,255,0.09) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage:
              "radial-gradient(circle at 50% 50%, black 0%, transparent 74%)",
          }}
        />
        <div className="absolute inset-0">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="contactGraphLine" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#dce2ff" stopOpacity="0" />
                <stop offset="45%" stopColor="#dce2ff" stopOpacity="0.46" />
                <stop offset="100%" stopColor="#915eff" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="contactGraphHot" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="48%" stopColor="#cbd5ff" stopOpacity="0.78" />
                <stop offset="100%" stopColor="#915eff" stopOpacity="0" />
              </linearGradient>
              <filter id="contactGraphGlow">
                <feGaussianBlur stdDeviation="1.2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {interestEdges.map(([fromId, toId, weight], index) => {
              const from = nodeById[fromId];
              const to = nodeById[toId];

              return (
                <line
                  key={`${fromId}-${toId}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={
                    weight === "primary"
                      ? "url(#contactGraphHot)"
                      : "url(#contactGraphLine)"
                  }
                  strokeWidth={weight === "primary" ? "1.3" : "0.82"}
                  strokeLinecap="round"
                  filter={weight === "primary" ? "url(#contactGraphGlow)" : undefined}
                  className="contact-graph-edge"
                  style={{ animationDelay: `${index * 0.34}s` }}
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}

            {graphSignals.map((signal, index) => {
              const from = nodeById[signal.from];
              const to = nodeById[signal.to];

              return (
                <circle
                  key={`${signal.from}-${signal.to}-${index}`}
                  r={signal.size}
                  fill={index % 3 === 0 ? "#ffffff" : "#cbd5ff"}
                  opacity={signal.opacity}
                  filter="url(#contactGraphGlow)"
                >
                  <animateMotion
                    dur={`${signal.duration}s`}
                    begin={`${signal.delay}s`}
                    repeatCount="indefinite"
                    path={`M ${from.x} ${from.y} L ${to.x} ${to.y}`}
                  />
                </circle>
              );
            })}
          </svg>

          {interestNodes.map((node) => (
            <div
              key={node.id}
              className="group absolute z-10 -translate-x-1/2 -translate-y-1/2"
              style={{ top: `${node.y}%`, left: `${node.x}%` }}
            >
              <div
                className={`${node.size} contact-graph-node relative overflow-hidden rounded-full border border-white/30`}
                style={node.orb}
              >
                {node.image ? (
                  <img
                    src={node.image}
                    alt="Vedanth Ramanathan logo"
                    className="absolute inset-[7px] h-[calc(100%-14px)] w-[calc(100%-14px)] rounded-full object-contain"
                  />
                ) : (
                  <div className="absolute inset-[5px] rounded-full border border-white/15 bg-black/30" />
                )}
                <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 transition duration-300 group-hover:opacity-100" />
              </div>
              {!node.hideLabel && (
                <div
                  className={`absolute ${node.labelOffset} left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-[#060815]/80 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#e8ebff] shadow-[0_12px_34px_rgba(0,0,0,0.42)] backdrop-blur md:text-sm`}
                >
                  {node.label}
                </div>
              )}
            </div>
          ))}
        </div>

        <style
          dangerouslySetInnerHTML={{
            __html: `
              @keyframes contactEdgeFlow {
                from { stroke-dashoffset: 0; opacity: 0.32; }
                50% { opacity: 0.92; }
                to { stroke-dashoffset: -42; opacity: 0.32; }
              }

              @keyframes contactNodeBreathe {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.055); }
              }

              .contact-graph-edge {
                stroke-dasharray: 1 7;
                animation: contactEdgeFlow 15s linear infinite;
              }

              .contact-graph-node {
                animation: contactNodeBreathe 5.8s ease-in-out infinite;
              }

              @media (prefers-reduced-motion: reduce) {
                .contact-graph-edge,
                .contact-graph-node {
                  animation: none;
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
