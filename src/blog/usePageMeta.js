import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getSocialMeta } from "./socialMeta";
import { getRouteMeta } from "./pageMeta";

export function usePageMeta(title, description) {
  const { pathname } = useLocation();
  useEffect(() => {
    const previousTitle = document.title;
    const fullTitle = `${title} · Vedanth Ramanathan`;
    const { url, type } = getRouteMeta(pathname);
    const social = getSocialMeta(pathname);
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
      ['meta[property="og:image"]', "content", social.image],
      ['meta[property="og:image:alt"]', "content", social.alt],
      ['meta[property="og:image:secure_url"]', "content", social.image],
      ['meta[property="og:image:type"]', "content", "image/jpeg"],
      ['meta[property="og:image:width"]', "content", String(social.width)],
      ['meta[property="og:image:height"]', "content", String(social.height)],
      ['meta[name="twitter:card"]', "content", "summary_large_image"],
      ['meta[name="twitter:image"]', "content", social.image],
      ['meta[name="twitter:image:alt"]', "content", social.alt],
    ].map(([selector, attribute, value]) => {
      let element = document.querySelector(selector);
      const created = !element;
      if (!element) {
        element = document.createElement("meta");
        const [, key, name] = selector.match(/meta\[(name|property)="([^"]+)"\]/);
        element.setAttribute(key, name);
        document.head.appendChild(element);
      }
      const previous = element?.getAttribute(attribute);
      if (value) element?.setAttribute(attribute, value);
      return () => { if (created) element.remove(); else if (previous != null) element?.setAttribute(attribute, previous); };
    });
    document.title = fullTitle;
    return () => { document.title = previousTitle; updates.forEach((restore) => restore()); };
  }, [title, description, pathname]);
}
