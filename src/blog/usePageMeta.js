import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getRouteMeta } from "./pageMeta";

export function usePageMeta(title, description) {
  const { pathname } = useLocation();
  useEffect(() => {
    const previousTitle = document.title;
    const fullTitle = `${title} · Vedanth Ramanathan`;
    const { url, type } = getRouteMeta(pathname);
    const updates = [
      ['meta[name="title"]', "content", fullTitle],
      ['meta[name="description"]', "content", description],
      ['link[rel="canonical"]', "href", url],
      ['meta[property="og:title"]', "content", fullTitle],
      ['meta[property="og:description"]', "content", description],
      ['meta[property="og:url"]', "content", url],
      ['meta[property="og:type"]', "content", type],
      ['meta[name="twitter:title"]', "content", fullTitle],
      ['meta[name="twitter:description"]', "content", description],
      ['meta[name="twitter:url"]', "content", url],
    ].map(([selector, attribute, value]) => {
      const element = document.querySelector(selector);
      const previous = element?.getAttribute(attribute);
      if (value) element?.setAttribute(attribute, value);
      return () => { if (previous != null) element?.setAttribute(attribute, previous); };
    });
    document.title = fullTitle;
    return () => { document.title = previousTitle; updates.forEach((restore) => restore()); };
  }, [title, description, pathname]);
}
