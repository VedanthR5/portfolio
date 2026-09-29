import { useEffect, useLayoutEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import { usePageMeta } from "../blog/usePageMeta";

import Hero from "./Hero";
import About from "./About";
import Experience from "./Experience";
import Works from "./Works";
import Contact from "./Contact";
import "../home.css";

// Where the reader was on each visited home entry. With an open row the URL
// carries its hash, and on Back the browser jumps to that row instead of
// restoring the reading position, so Home restores it itself.
const readingPosition = new Map();

export default function Home() {
  usePageMeta("Security, Systems & AI", "Vedanth Ramanathan studies artificial intelligence at Carnegie Mellon and builds security, systems and machine-learning software.");
  const { key } = useLocation();
  const navigationType = useNavigationType();

  useLayoutEffect(() => {
    const saved = readingPosition.get(key);
    if (navigationType === "POP" && saved !== undefined) {
      const restore = () => window.scrollTo({ top: saved, behavior: "instant" });
      restore();
      // Again after the route's scroll reset and the browser's fragment jump.
      requestAnimationFrame(() => requestAnimationFrame(restore));
      return;
    }
    // A fresh load or a new visit with a hash: go straight to the target.
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: "instant" }));
  }, [key, navigationType]);

  useEffect(() => {
    // Skip scrolls caused by leaving: while a lazy route loads, Suspense hides
    // this page (display: none) and the browser clamps the scroll to 0.
    const remember = () => {
      if (document.getElementById("experience")?.offsetParent) readingPosition.set(key, window.scrollY);
    };
    window.addEventListener("scroll", remember, { passive: true });
    return () => window.removeEventListener("scroll", remember);
  }, [key]);

  return <>
          <div className="bg-hero-pattern bg-cover bg-center bg-no-repeat">
            <Hero />
          </div>
          <About />
          <Experience />
          <Works />
          {/* The hero's contour lines return once to close the page. */}
          <div className="home-bookend">
            <Contact />
          </div>
  </>;
}
