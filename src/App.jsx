import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, Link } from "react-router-dom";
import Navbar from "./components/Navbar";

const Home = lazy(() => import("./components/Home"));
const Blog = lazy(() => import("./blog/Blog"));
const Post = lazy(() => import("./blog/Post"));

function RoutePosition() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return <BrowserRouter>
    <RoutePosition />
    <a href="#content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary">Skip to content</a>
    <div className="relative z-0 bg-primary min-h-screen">
      <Navbar />
      <main id="content" tabIndex={-1}>
        <Suspense fallback={<div className="pt-40 px-6 text-secondary" role="status">Loading…</div>}>
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
