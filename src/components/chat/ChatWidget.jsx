// ChatWidget.jsx (clean)
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import chatLogo from "../../assets/portfolioChatLogo-rB.png";

gsap.registerPlugin(MotionPathPlugin);

const BABY_BLUE = "#89CFF0";

function BirdFlyInGSAP({ onArrive }) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const launcherMargin = 24;
    const launcherSize = 56;
    const landing = {
      x: window.innerWidth - (launcherMargin + launcherSize / 2),
      y: window.innerHeight - (launcherMargin + launcherSize / 2),
    };
    const takeoff = { x: landing.x - 140, y: -60 };
    const mid = { x: landing.x - 60, y: landing.y - 220 };
    const el = ref.current;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: onArrive,
        defaults: { ease: "power2.inOut" },
      });
      tl.set(el, { xPercent: -50, yPercent: -50, x: takeoff.x, y: takeoff.y });
      tl.to(el, {
        duration: 1.8,
        motionPath: { path: [takeoff, mid, landing], autoRotate: true },
      });
      tl.to(
        el,
        {
          scale: 1.06,
          duration: 0.12,
          yoyo: true,
          repeat: 1,
          ease: "power1.out",
        },
        "-=0.05"
      );
    });
    return () => ctx.revert();
  }, [onArrive]);
  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 z-[60] w-10 h-10 pointer-events-none"
      aria-hidden
    >
      <img
        src={chatLogo}
        alt="Chat logo"
        className="w-10 h-10 object-contain"
        style={{ filter: "drop-shadow(0 0 6px rgba(137,207,240,0.6))" }}
        draggable={false}
      />
    </div>
  );
}
BirdFlyInGSAP.propTypes = { onArrive: PropTypes.func.isRequired };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [arrived, setArrived] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content:
        "Hi! I'm Vedanth's assistant. Ask me about any project, background, or tech choices.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current)
      listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, open]);

  const glowingShadow = useMemo(
    () => ({
      boxShadow:
        "0 0 0 2px rgba(137,207,240,0.25), 0 0 16px 4px rgba(137,207,240,0.45)",
    }),
    []
  );

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { id: Date.now(), role: "user", content: input.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const urls = (
        userMsg.content
          .split(/\r?\n/)
          .map((l) => l.trim())
          .filter((l) => l.toLowerCase().startsWith("#url:"))
          .map((l) => l.substring(5).trim()) || []
      ).slice(0, 3);
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content:
                "You are Vedanth's portfolio assistant. Keep replies concise and helpful. If asked about projects, reference the portfolio content and typical tech stacks (React, Three.js, Tailwind, EmailJS, etc.).",
            },
            ...messages.map(({ role, content }) => ({ role, content })),
            { role: "user", content: userMsg.content },
          ],
          urls,
          includeKnowledge: true,
        }),
      });
      const data = await res.json();
      const reply =
        data.reply || "Sorry, I could not generate a reply right now.";
      setMessages((m) => [
        ...m,
        { id: Date.now() + 1, role: "assistant", content: reply },
      ]);
    } catch (e) {
      setMessages((m) => [
        ...m,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: "Network error. Please try again shortly.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <AnimatePresence>
        {!open && !arrived && (
          <BirdFlyInGSAP onArrive={() => setArrived(true)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!open && arrived && (
          <motion.button
            aria-label="Open chat"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-[55] rounded-full w-14 h-14 flex items-center justify-center bg-[#0E0A17] text-white"
            style={glowingShadow}
          >
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: [-10, 4, -4, 0], scale: [1, 1.08, 1] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              className="w-8 h-8"
            >
              <img
                src={chatLogo}
                alt="Open chat"
                className="w-8 h-8 object-contain"
                draggable={false}
              />
            </motion.div>
            <motion.span
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(137,207,240,0.0)",
                  "0 0 0 6px rgba(137,207,240,0.12)",
                  "0 0 0 0 rgba(137,207,240,0.0)",
                ],
              }}
              transition={{ duration: 2.2, repeat: Infinity }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-[65] w-[360px] max-w-[calc(100vw-2rem)] rounded-2xl bg-[#0E0A17]/95 backdrop-blur-md border border-white/10 shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full overflow-hidden bg-white/5">
                  <img
                    src={chatLogo}
                    alt="Chat"
                    className="w-6 h-6 object-cover"
                    draggable={false}
                  />
                </div>
                <div className="text-sm text-white font-semibold">
                  Ask Vedanth
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-secondary hover:text-white transition-colors"
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>

            <div
              ref={listRef}
              className="p-3 space-y-3 overflow-y-auto max-h-[50vh] custom-scroll"
            >
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`${
                      m.role === "user"
                        ? "bg-[#141022] text-white"
                        : "bg-[#151027] text-white/90"
                    } px-3 py-2 rounded-2xl max-w-[80%] whitespace-pre-line`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="text-secondary text-sm">Thinking…</div>
              )}
            </div>

            <div className="p-3 border-t border-white/10">
              <div className="flex items-end gap-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Ask about a project…"
                  rows={1}
                  className="flex-1 resize-none bg-[#160F28] text-white placeholder:text-secondary rounded-xl px-3 py-2 focus:outline-none focus:ring-2"
                  style={{ boxShadow: "none" }}
                />
                <button
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                  className="bg-[--baby] hover:brightness-110 disabled:opacity-50 text-black px-3 py-2 rounded-xl font-medium"
                  style={{ ["--baby"]: BABY_BLUE }}
                >
                  Send
                </button>
              </div>
              <div className="text-[11px] text-secondary mt-1">
                Tip: include lines like “#url: https://example.com/page” in your
                question to add context.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
