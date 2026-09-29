import { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation, useNavigationType, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Home, Blog, Post } from "./routes";

// New pages open at the top. Back and Forward (POP) are left to the browser's
// scroll restoration and to Home, which restores its own reading position;
// forcing the top here would undo both. Hash targets scroll where they render.
function RoutePosition() {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();
  useEffect(() => {
    if (navigationType !== "POP" && !hash) window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash, navigationType]);
  return null;
}

// Only a cold load reaches this (client navigations keep the old page up until
// the new chunk arrives). Hold the space quietly and say something only if
// loading is actually slow.
function RouteFallback() {
  const [slow, setSlow] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setSlow(true), 900);
    return () => clearTimeout(timer);
  }, []);
  return <div className="route-fallback" role="status" aria-live="polite">{slow && "Loading…"}</div>;
}

export default function App() {
  return <BrowserRouter>
    <RoutePosition />
    <a href="#content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary">Skip to content</a>
    <div className="relative z-0 bg-primary min-h-screen">
      <Navbar />
      <main id="content" tabIndex={-1}>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<Post />} />
            <Route path="*" element={<div className="pt-40 px-6 text-white"><h1>Page not found</h1><Link to="/">Return home</Link></div>} />
          </Routes>
        </Suspense>
      </main>
    </div>
  </BrowserRouter>;
}
