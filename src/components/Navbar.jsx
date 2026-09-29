import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getRouteMeta } from "../blog/pageMeta";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";
import ResumeLink from "./ResumeLink";
import { preload, preloadOn } from "../routes";

const linkClass = "nav-link text-secondary transition-colors duration-150 hover:text-white";

// The home section whose top has passed the upper third of the viewport.
const currentSection = () => {
  let current = null;
  for (const { id } of navLinks) {
    const section = document.getElementById(id);
    if (section && section.getBoundingClientRect().top <= window.innerHeight * 0.33) current = id;
  }
  return current;
};

const Navbar = () => {
  const { pathname } = useLocation();
  const { isBlog } = getRouteMeta(pathname);
  const isHome = pathname === "/";
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [section, setSection] = useState(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    let frame = 0;
    const handleScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setScrolled(window.scrollY > 100);
        setSection(isHome ? currentSection() : null);
      });
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isHome]);

  // While the phone menu is open it behaves like a sheet: the page behind it
  // is inert, Escape or a tap outside closes it, and any navigation does too.
  useEffect(() => {
    if (!toggle) return undefined;
    const main = document.getElementById("content");
    main?.setAttribute("inert", "");
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    document.querySelector("#mobile-nav a")?.focus();
    const closeOnEscape = (event) => {
      if (event.key !== "Escape") return;
      setToggle(false);
      toggleRef.current?.focus();
    };
    const closeOnNavigate = () => setToggle(false);
    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("hashchange", closeOnNavigate);
    window.addEventListener("popstate", closeOnNavigate);
    return () => {
      main?.removeAttribute("inert");
      root.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("hashchange", closeOnNavigate);
      window.removeEventListener("popstate", closeOnNavigate);
    };
  }, [toggle]);

  // Close the menu whenever the route changes.
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setToggle(false);
  }

  // Section links are router links from every route: a plain "/#about" on the
  // blog would reload the whole document. Home scrolls to the hash itself.
  const sectionTo = (id) => ({ pathname: "/", hash: `#${id}` });
  const homeIntent = preloadOn(preload.home);
  const blogIntent = preloadOn(preload.blog);
  const closeMenu = () => setToggle(false);

  return (
    <nav
      aria-label="Primary navigation"
      className={`${
        styles.paddingX
      } w-full flex items-center py-4 fixed top-0 z-20 transition-colors duration-200 ${
        // No backdrop-filter while the menu is open: it would make the nav the
        // containing block for the fixed backdrop below.
        toggle ? "bg-primary" : (scrolled || isBlog) ? "bg-primary/95 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          {...homeIntent}
          aria-label="Vedanth Ramanathan, home"
          className="flex items-center gap-2"
          onClick={() => {
            closeMenu();
            window.scrollTo({ top: 0, behavior: "instant" });
          }}
        >
          <img
            src={logo}
            alt=""
            className="w-9 h-9 object-contain"
          />
          <span className="text-white text-[17px] font-semibold flex">
            Vedanth<span className="sm:block hidden ml-1">Ramanathan</span>
          </span>
        </Link>

        <ul className="list-none hidden lg:flex flex-row items-center gap-8 text-[15px]">
          {navLinks.map((nav) => (
            <li key={nav.id}>
              <Link
                to={sectionTo(nav.id)}
                {...homeIntent}
                aria-current={section === nav.id ? "location" : undefined}
                className={linkClass}
              >
                {nav.title}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/blog" {...blogIntent} aria-current={isBlog ? "page" : undefined} className={linkClass}>
              Blog
            </Link>
          </li>
          <li>
            <ResumeLink className={linkClass} />
          </li>
        </ul>

        <div className="lg:hidden flex flex-1 justify-end items-center">
          <button
            ref={toggleRef}
            type="button"
            aria-label={toggle ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={toggle}
            aria-controls="mobile-nav"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/20"
            onClick={() => setToggle(!toggle)}
          >
            <img
              src={toggle ? close : menu}
              alt=""
              className="h-[22px] w-[22px] object-contain"
              aria-hidden="true"
            />
          </button>

          {toggle && (
            <button
              type="button"
              tabIndex={-1}
              aria-hidden="true"
              className="fixed inset-0 top-[76px] z-0 cursor-default bg-[#03040c]/70"
              onClick={closeMenu}
            />
          )}
          <div
            id="mobile-nav"
            className={`${
              !toggle ? "hidden" : "block"
            } absolute top-[76px] left-4 right-4 z-10 rounded-2xl border border-white/10 bg-[#0a0c1f] p-2 shadow-[0_24px_60px_rgba(0,0,0,0.5)]`}
          >
            <ul className="list-none flex flex-col text-[16px]">
              {navLinks.map((nav) => (
                <li key={nav.id}>
                  <Link
                    to={sectionTo(nav.id)}
                    {...homeIntent}
                    onClick={closeMenu}
                    className="block rounded-xl px-4 py-3 text-[#d9d6e8] hover:bg-white/5"
                  >
                    {nav.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/blog"
                  {...blogIntent}
                  aria-current={isBlog ? "page" : undefined}
                  onClick={closeMenu}
                  className="block rounded-xl px-4 py-3 text-[#d9d6e8] hover:bg-white/5"
                >
                  Blog
                </Link>
              </li>
              <li>
                <ResumeLink onClick={closeMenu} className="block rounded-xl px-4 py-3 text-[#d9d6e8] hover:bg-white/5" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
