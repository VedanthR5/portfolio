const origin = "https://vedanthramanathan.com";

// Static pages, client navigation, and the navbar must agree about /blog/.
// Blog routes are generated as directories (dist/blog/<slug>/index.html), so
// the host serves them at a trailing slash and redirects the bare path there;
// the canonical URL is the one that answers 200 without a redirect.
export function getRouteMeta(pathname) {
  const path = pathname.replace(/\/+$/, "") || "/";
  const isBlog = path === "/blog" || path.startsWith("/blog/");
  return {
    path,
    url: `${origin}${path}${isBlog ? "/" : ""}`,
    isBlog,
    type: isBlog && path !== "/blog" ? "article" : "website",
  };
}
